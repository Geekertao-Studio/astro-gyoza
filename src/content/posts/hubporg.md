---
title: HUBP
date: 2026-10-31
lastMod: 2026-10-31T17:55:29.000Z
cover: /hubp-wide.png
tags: [GitHub, 经历, 开源项目, HUBP]
category: HUBP
aiAssisted: true
summary: 这篇文章介绍了 HUBP 组织的诞生及发展历程。
---

这篇文章讲的是 HUBP 怎么从一个人折腾 GitHub 下载加速，慢慢变成一个几个人的小组织。全程走一步看一步：域名被 hold 过，请求被刷过，服务挂过，最后稀里糊涂地有了官网和浏览器扩展。

## 背景

2025 年初（具体哪个月记不清了），那阵子用 GitHub 比较频繁，手头又没什么代理，就在搜索引擎里搜怎么让 GitHub 下载更快。翻着翻着找到一个下载站——就是现在和我关系颇深的 [GitHub Proxy - GitHub 文件下载加速代理](https://github.akams.cn)。不过那都是后话了。

后来在刷别人的代理站点时，发现那个站点挂着 [GitHub 仓库链接](https://github.com/hunshcn/gh-proxy)，点进去看了看。2025.2.21 用它的代码搭了 ~~[ghfile.geekertao.us.kg](https://ghfile.geekertao.us.kg/)~~（该链接已不可访问），又提交到了 [GitHub Proxy - GitHub 文件下载加速代理](https://github.akams.cn) 的节点列表里。

天有不测风云。就在提交完的第二天，2025.2.22，免费的 us.kg 域名被滥用，整个域名被 serverhold、无法解析，我也被网站管理员移除了 ~~（虽然现在我也是了哈哈哈）~~。随即在 2025.2.23 于阿里云买下了用到现在这个域名 geekertao.top，重新在 Cloudflare Workers 上绑好[新域名](https://ghfile.geekertao.top/)，服务至今。

同一天，在个人账户下建了仓库 Geekertao/CF-GitHub-Proxy，把文件搬了进去，一直维护到现在（这个仓库后来整个转到了组织名下，就是现在的 [hubporg/CF-GitHub-Proxy](https://github.com/hubporg/CF-GitHub-Proxy)）。期间一直在按自己以及别人的建议修改，~~虽然现在也没啥可改的了，但至少没归档不是吗？~~

2025.4.12，和 Tbedu（FeltSquirrel727）一起被刷 Workers 请求，导致服务不可用。

<div class="my-5 grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
  <img src="https://pic.imagurl.cn/imagurl/2025/04/11/67f91dd08c50a.png" alt="当时的 Worker 请求面板" loading="lazy" />
  <img src="https://pic.imagurl.cn/imagurl/2025/04/11/67f91dd09fdb8.png" alt="当天请求量直接被刷爆" loading="lazy" />
</div>

2025.6.12，在 B 站[二叉树树](https://space.bilibili.com/325903362)视频的帮助下优选了节点。下面是当时在 [GitHub Proxy - GitHub 文件下载加速代理](https://github.akams.cn) 的评论截图：

![评论截图](https://img.geekertao.com/uploads/2026/10/31/paste-1793468647345_f2553634-7511-4019-b36b-65c42a005b54.png)

2025.6.24，又买下了一台和 [gh.llkk.cc](https://gh.llkk.cc)（该服务已被 DNS 干扰）同款的服务器 [gh.dpik.top](https://gh.dpik.top)，也算成功拥有了自己的服务器版 GHProxy，哈哈。

2025.8.21，建了个仓库 [cloudflare-monitor](https://github.com/Geekertao/cloudflare-monitor)，就是“项目”页里的那个 Cloudflare Analytics，后来改了名（其实也有想过做 Workers 额度监控之类的，写不出来，项目就荒废了）。当时目标也很简单——看见 [gh-proxy.com/analytics](https://gh-proxy.com/analytics) 觉得非常炫酷，就照着模仿了一个。

再往后，我一直想搞个啥组织玩玩。

## 成立

HUBP 这个名字来自一次很简单的聊天。[GitHub Proxy - GitHub 文件下载加速代理](https://github.akams.cn) 的站长 oopsunix 2025.7.9 在我们自己的小群里发了下面这张图：

![站长编写的 HUBP 概念网页](https://img.geekertao.com/uploads/2026/10/31/Cache_55049a0563cf6cc1_50dc4942-a534-48b3-a011-da5e89face7e.png)

当时看，这个图确实野心挺大，从 GitHub 出发，一直想做到镜像全世界（并非，这是我胡诌的）。

2025 年 12 月 12 日，买下了 hubp.org 这个域名（到期日也是 12.12），但一直闲置着没用，算是抢注吧。紧接着在 2025.12.13，oopsunix 在他个人账户下开了 ghproxy-next 仓库——说白了就是他那套 github.akams.cn 的重构版，想把 Web 端的加速控制台重写一遍。

2026.4.7，创建了 GitHub 组织 [hubporg](https://github.com/hubporg)——hubp 被人占用了。当天在组织名下开了个新仓库，也就是 [ghproxy-extension](https://github.com/hubporg/ghproxy-extension)（GitHub 文件加速浏览器扩展），开始开发；我在组织中的重心也一直放在这个扩展上。

<div class="my-5 grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
  <img src="https://img.geekertao.com/uploads/2026/10/31/ChatGPTImage2026年6月28日20_48_42_edit_9635480401_9ba1253c-1592-4fc7-9421-ecd304f80364.png" alt="ghproxy-extension 概念图" loading="lazy" />
  <img src="https://img.geekertao.com/uploads/2026/10/31/Cache_16d58be1892948b3_4a4399b7-0642-4376-8cf8-b17d9bd0051c.png" alt="扩展开发版截图" loading="lazy" />
</div>

组织建好了，除了刚开的扩展仓库，我还把个人账户下养了一年多的 CF-GitHub-Proxy 转了进去——说好听点叫资源整合，说难听点就是为了给组织撑门面、堆几个仓库和 stars。GitHub 转移仓库会保留全部提交历史，所以它的创建时间是 2025.2.23，比组织本身早一年多，翻时间线的时候别被这个日期骗了。

2026.4.26，创建了官网仓库 [hubporg/site](https://github.com/hubporg/site)，开始做官网。

组织创建之后，成员陆陆续续凑齐了：除了我，还有 Tbedu（FeltSquirrel727）和 [GitHub Proxy - GitHub 文件下载加速代理](https://github.akams.cn) 的站长 oopsunix。站长在 2026.4.10 把 ghproxy-next 从他个人账户转到了组织名下，算是正式入伙。

分工也没那么正经，按仓库看大致是这样：

- **我**：CF-GitHub-Proxy、ghproxy-extension、官网 site，提交基本都是我出的。
- **oopsunix**：ghproxy-next（Web 端的加速链接转换控制台和节点列表）主要他在弄，仓库里大半提交是他的；节点列表还接了机器人，有人提 issue 就自动加节点。
- **Tbedu（FeltSquirrel727）**：挂名，偶尔冒个泡，实际没怎么参与。

也没搞什么协作机制，没有贡献指南，没有 PR 流程，有事就在小群里喊一声，或者直接不说。四个仓库的 license 各是各的（MIT、GPL-3.0 都有），没统一过，大概都是按照维护者习惯来的吧。官网写的“3+ 核心维护者”，把挂名的也算上了，别太当真。

顺带一提，HUBP 也不是孤立冒出来的：起点就是 github.akams.cn 的节点列表，官网写的“50+ 社区贡献节点”，说的也是这个生态里的一圈人。

然后就是好多琐碎的事了，这里就不一一列举了。但是我仍然记得当时扩展用户破百的那种兴奋幸福的感受——Edge 扩展商店显示 104 个用户，五天后我在群里发截图说“时隔五天，多了 140 个”，当时确实挺开心。

![Edge 扩展商店页面](https://img.geekertao.com/uploads/2026/10/31/11451_7d89eb9a-3cd6-4eca-b486-e4afa942febe.png)

![当时群里的聊天记录](https://img.geekertao.com/uploads/2026/10/31/paste-1793474522030_24e0e273-b8db-41af-bb26-03281df8355c.png)

## 现状

现在 [hubp.org](https://www.hubp.org) 官网已经上线（部署在 Vercel 上），定位是“让开源资源触手可及”，还是围绕 GitHub 的开源资源的访问加速展开。首页现在的口号是“让开源资源在每一次请求中自由流动”，页面底部写着“已有 3+ 核心维护者与 50+ 社区贡献节点”。

<div class="my-5 grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
  <img src="https://img.geekertao.com/uploads/2026/10/31/paste-1793473861137_3f9eeed6-8ccf-42e1-86f0-631aa7182bc1.png" alt="hubp 官网首页" loading="lazy" />
  <img src="https://img.geekertao.com/uploads/2026/10/31/ChatGPTImage2026年6月28日20_31_08_5580c322-9d70-4324-b4b8-4d938868ab84.png" alt="GitHub 下载加速理念图" loading="lazy" />
</div>

目前组织下的公开仓库主要有：

- [CF-GitHub-Proxy](https://github.com/hubporg/CF-GitHub-Proxy)：基于 Cloudflare Workers 的 GitHub 镜像代理（MIT），也就是最早那套 GHProxy，一直维护到现在，线上地址是 [gh-proxy.geekertao.top](https://gh-proxy.geekertao.top)。
- [ghproxy-next](https://github.com/hubporg/ghproxy-next)：github.akams.cn 的重构版，Web 端的加速链接转换控制台（TypeScript / GPL-3.0）。
- [ghproxy-extension](https://github.com/hubporg/ghproxy-extension)：浏览器扩展，拦截下载后自动选择最优节点加速（MIT），兼容 IDM，覆盖 Chrome / Edge / Firefox，安装入口在官网的[扩展页](https://www.hubp.org/projects/extension)。
- [site](https://github.com/hubporg/site)：hubp 官网的源码（Vue）。

![扩展累计加速与安装统计](https://img.geekertao.com/uploads/2026/10/31/paste-1793476160165_259a3676-0a4e-42b2-9426-42f7bc0a9563.png)

到现在，扩展的累计加速跳转已经到 63.6 万次，累计安装/更新 3.4 万（Chromium 3.3 万、Firefox 595），近 60 天新增安装三万多。跳转统计的接口被人刷过，数字里有水分，但按安装量倒推，真实用户保底也在 1 万以上。

从一张临时域名、一个 Workers 起步，到后来有域名、有服务器、有组织、有官网，这个“玩”出来的项目，慢慢也算固定下来了。

## 时间线

| 时间       | 事件                                                                              |
| ---------- | --------------------------------------------------------------------------------- |
| 2025 年初  | 开始频繁用 GitHub，找到 github.akams.cn 下载站                                    |
| 2025.2.21  | 用 gh-proxy 搭出 ghfile.geekertao.us.kg，提交到节点列表                           |
| 2025.2.22  | us.kg 域名被滥用、serverhold，被移出节点列表                                      |
| 2025.2.23  | 购入 geekertao.top，重绑 Workers；文件迁到 Geekertao/CF-GitHub-Proxy (后转入组织) |
| 2025.4.12  | 与 Tbedu 一起被刷 Workers 请求，服务不可用                                        |
| 2025.6.12  | 在 B 站二叉树树视频的帮助下优选节点                                               |
| 2025.6.24  | 购入 gh.dpik.top 服务器，部署服务器版 GHProxy                                     |
| 2025.7.9   | 站长在小群放出 HUBP 概念网页                                                      |
| 2025.8.21  | 创建 cloudflare-monitor，后改名 Cloudflare Analytics                              |
| 2025.12.12 | 注册 hubp.org 域名（到期日也是 12.12）                                            |
| 2025.12.13 | oopsunix 创建 ghproxy-next 仓库，重构 github.akams.cn                             |
| 2026.4.7   | 创建 hubporg 组织，开始开发 ghproxy-extension，把 CF-GitHub-Proxy 转入组织        |
| 2026.4.10  | 站长把 ghproxy-next 转入组织                                                      |
| 2026.4.26  | 创建 hubporg/site，开始做官网                                                     |
| 至今       | 一起无限进步！想开新坑！但是哇不知道做啥，有人可以在评论区给点建议嘛              |

## 边界和麻烦

写到这里，有几件事得说在前面。

**免费额度是有限的。** 2025.4.12 那次就是被人刷爆了 Workers 的免费请求数，服务直接躺平。后来加了点限制、换了节点，但这种事防不住，只能挨着。

**统计数字别全信。** 跳转接口被刷过好几轮，63.6 万里有多少是真人不好说，相对靠谱的参考是安装量。

**不保证一直可用。** 免费服务，随时可能因为额度、域名、平台政策，或者单纯因为我打游戏没空而中断。拿它干正经活的话，自己留个后手。

**这是业余项目。** 几个人用下班时间维护，没有商业化，也没有谁给发工资，所以更新节奏全看心情。

## 写在最后

回头看，起点其实很偶然：只是想找个能让 GitHub 快一点的地方。后来一路折腾域名、服务器、Workers、浏览器扩展和官网，不知不觉把一件小事做成了一个小小的组织。

HUBP 现在的 slogan 是“让开源资源触手可及”。说得大也大，说得小也小——能让自己和别人的下载顺一点，大概也就够了。

后面的琐碎的事，以后慢慢再写。
