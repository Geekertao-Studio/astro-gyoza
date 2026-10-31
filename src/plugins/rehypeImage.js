import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

const RAW_IMG = /<img\b[^>]*>/gi

export function rehypeImage() {
  return function (tree) {
    // 手写 HTML（并排图那种 grid）里的 img 不经过 mdast，只能按 raw 节点处理，
    // 这样它们也能自动拿到 alt 图注，和 markdown 图片保持一致
    visit(tree, 'raw', (node) => {
      if (!/<img\b/i.test(node.value)) return
      node.value = node.value.replace(RAW_IMG, (tag) => {
        const alt = /alt="([^"]*)"/i.exec(tag)?.[1]?.trim()
        if (!alt) return tag
        const caption = alt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        return `<figure class="m-0">${tag}<figcaption>${caption}</figcaption></figure>`
      })
    })

    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'p' && node.children.length === 1) {
        const child = node.children[0]
        if (child.tagName === 'img') {
          parent.children[index] = buildFigure(child)
        }
      } else if (node.tagName === 'img') {
        parent.children[index] = buildImage(node)
      }
    })
  }
}

function buildImage(node) {
  const imgProps = node.properties

  return h('img', { ...imgProps, loading: 'lazy' })
}

function buildFigure(node) {
  const imgProps = node.properties
  const title = String(imgProps.title ?? '').trim()
  const alt = String(imgProps.alt ?? '').trim()
  // 优先用 markdown 的 title 当图注，没有就退回 alt，两者都没有就不渲染
  const caption = title || alt

  return h(
    'figure',
    null,
    caption ? [buildImage(node), h('figcaption', caption)] : [buildImage(node)],
  )
}
