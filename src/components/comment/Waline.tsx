import { useEffect, useRef } from 'react'
import { init } from '@waline/client'
import '@waline/client/style'

export function Waline({ serverURL }: { serverURL: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const walineInst = init({
      el: ref.current,
      serverURL,
      dark: "[data-theme='dark']",
      login: 'force', 
      imageUploader: false,
      search: false,
      reaction: [
          "https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_heart_eyes.png",
          "https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_thumbsup.png",
          "https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_zhoumei.png",
          "https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_grievance.png",
          "https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_dizzy_face.png",
          "https://npm.elemecdn.com/@waline/emojis@1.1.0/bilibili/bb_slap.png",
      ],
      locale: {
          placeholder: "发条友善的评论吧（支持 Markdown 语法）…",
          reaction0: "非常有用",
          reaction1: "有帮助",
          reaction2: "帮助不大",
          reaction3: "无帮助",
          reaction4: "看不懂",
          reaction5: "有错误",
          reactionTitle: "这篇内容对你有帮助吗？",
          sofa: "还没有人留言哦！快来抢沙发吧~",
          comment: "留言",
      },
      emoji: [
        'https://unpkg.com/@waline/emojis@1.2.0/alus',
        'https://unpkg.com/@waline/emojis@1.2.0/bilibili',
        'https://unpkg.com/@waline/emojis@1.2.0/bmoji',
        'https://unpkg.com/@waline/emojis@1.2.0/qq',
        'https://unpkg.com/@waline/emojis@1.2.0/tieba',
        'https://unpkg.com/@waline/emojis@1.2.0/tw-emoji',
        'https://unpkg.com/@waline/emojis@1.2.0/weibo',
      ],
    })

    return () => {
      if (ref.current) {
        walineInst?.destroy()
      }
    }
  }, [serverURL])

  return <div ref={ref}></div>
}