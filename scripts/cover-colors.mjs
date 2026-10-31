// 构建期从文章封面提取主色，作为该文章页的 accent 主题色。
// 产出的结构对齐 src/config.json 的 color.accent 项（light/dark 一对），
// 运行时由 AccentColorInjector 优先读取，从而保留主题自己的配色生成逻辑。
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import chroma from 'chroma-js'

const root = process.cwd()
const postsDir = path.join(root, 'src/content/posts')
const outFile = path.join(root, 'src/data/cover-colors.json')

function findSharp() {
  const store = path.join(root, 'node_modules/.pnpm')
  if (!existsSync(store)) return null
  for (const dir of readdirSync(store)) {
    if (!dir.startsWith('sharp@')) continue
    const entry = path.join(store, dir, 'node_modules/sharp/lib/index.js')
    if (existsSync(entry)) return entry
  }
  return null
}

async function loadSharp() {
  const entry = findSharp()
  if (!entry) throw new Error('未找到 sharp，无法取色')
  const mod = await import(pathToFileURL(entry).href)
  return mod.default ?? mod
}

/** 按色相分桶、饱和度加权，取出现最多的主色 */
function dominantColor(data, info, channels = 3) {
  const buckets = new Map()
  const total = info.width * info.height

  for (let i = 0; i < total; i++) {
    const offset = i * channels
    const r = data[offset]
    const g = data[offset + 1]
    const b = data[offset + 2]
    const alpha = channels === 4 ? data[offset + 3] : 255
    if (alpha < 128) continue

    const [h, s, l] = chroma(r, g, b).get('hsl')
    if (Number.isNaN(h)) continue
    if (s < 0.08 || l > 0.92 || l < 0.08) continue

    const bucket = Math.round(h / 30) % 12
    const weight = s * (1 - Math.min(1, Math.abs(l - 0.55) * 2))
    const cur = buckets.get(bucket) ?? { weight: 0, r: 0, g: 0, b: 0 }
    cur.weight += weight
    cur.r += r * weight
    cur.g += g * weight
    cur.b += b * weight
    buckets.set(bucket, cur)
  }

  let best = null
  for (const bucket of buckets.values()) {
    if (!best || bucket.weight > best.weight) best = bucket
  }
  if (!best || best.weight === 0) return null

  return chroma(best.r / best.weight, best.g / best.weight, best.b / best.weight, 'rgb')
}

/** 生成 light/dark 一对 accent 色：亮色保持鲜艳，暗色提亮降饱和 */
function buildAccent(base) {
  const [hue, sat, lum] = base.get('hsl')

  // 太暗或太灰的封面主色，抬到可读的 accent 区间
  const lightL = Math.min(0.62, Math.max(0.42, lum))
  const lightS = Math.min(0.85, Math.max(0.5, sat))

  const light = chroma.hsl(hue, lightS, lightL).hex()
  const dark = chroma.hsl(hue, Math.min(0.7, lightS * 0.75), 0.82).hex()

  return { light, dark }
}

async function readCover(mdFile) {
  const text = await readFile(mdFile, 'utf8')
  const match = text.match(/^---[\s\S]*?^cover:\s*['"]?(.+?)['"]?\s*$/m)
  return match?.[1]?.trim()
}

async function loadImage(src) {
  if (src.startsWith('/')) {
    return readFile(path.join(root, 'public', src.slice(1)))
  }
  const cacheDir = path.join(root, 'node_modules/.cache/cover-colors')
  await mkdir(cacheDir, { recursive: true })
  const hash = Buffer.from(src).toString('hex').slice(0, 40)
  const cacheFile = path.join(cacheDir, hash)
  if (existsSync(cacheFile)) return readFile(cacheFile)

  const res = await fetch(src)
  if (!res.ok) throw new Error(`下载封面失败 ${res.status}: ${src}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(cacheFile, buf)
  return buf
}

async function main() {
  const sharp = await loadSharp()
  const files = (await readdir(postsDir)).filter((f) => f.endsWith('.md'))

  const result = {}

  for (const file of files) {
    const cover = await readCover(path.join(postsDir, file))
    if (!cover) continue
    if (result[cover]) continue

    try {
      const buf = await loadImage(cover)
      const { data, info } = await sharp(buf)
        .resize(72, 72, { fit: 'inside' })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })

      const base = dominantColor(data, info, info.channels)
      if (!base) {
        console.warn(`[cover-colors] ${cover} 没取到有效主色，跳过`)
        continue
      }
      result[cover] = buildAccent(base)
      console.log(`[cover-colors] ${cover} -> ${result[cover].light} / ${result[cover].dark}`)
    } catch (error) {
      console.warn(`[cover-colors] ${cover} 处理失败：${error.message}`)
    }
  }

  await mkdir(path.dirname(outFile), { recursive: true })
  await writeFile(outFile, JSON.stringify(result, null, 2) + '\n')
  console.log(
    `[cover-colors] 写入 ${path.relative(root, outFile)}（${Object.keys(result).length} 条）`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
