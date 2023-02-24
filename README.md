# Gitee-Badge

[![GitHub](https://img.shields.io/static/v1?label=&message=GitHub&logo=github&color=black&labelColor=555)](https://github.com/wtto00/gitee-badge) [![Gitee](https://img.shields.io/static/v1?label=&message=Gitee&logo=gitee&color=orange&labelColor=555)](https://gitee.com/wtto00/gitee-badge)

使用 [Next.js](https://nextjs.org/) 框架开发，[vercel](https://vercel.com/) 自动化云部署。

## Json Data

返回 json 数据结构，用于在 [shields.io](https://shields.io/endpoint) 平台生成徽章。

例如：https://gitee-badge.vercel.app/json/release/wtto00/badge-test  
返回数据：

```json
{
  "schemaVersion": 1,
  "label": "release",
  "message": "0.0.2-beta",
  "color": "blue"
}
```

`query`参数可参见 [shields.io](https://shields.io/endpoint)  
例如：https://gitee-badge.vercel.app/json/release/wtto00/badge-test?style=flat-square  
返回数据：

```json
{
  "schemaVersion": 1,
  "label": "release",
  "message": "0.0.2-beta",
  "color": "blue",
  "style": "flat-square"
}
```

## Svg Image

直接返回 svg 图像。

例如：https://gitee-badge.vercel.app/svg/release/wtto00/badge-test  
返回![release](https://gitee-badge.vercel.app/svg/release/wtto00/badge-test)

`query`参数可参见 [badgen](https://github.com/badgen/badgen#usage)  
例如：https://gitee-badge.vercel.app/svg/release/wtto00/badge-test?style=flat  
返回![release](https://gitee-badge.vercel.app/svg/release/wtto00/badge-test?style=flat)

## shields.io

使用返回的`JSON`格式数据，使用 [shields.io](https://shields.io/endpoint)生成徽章。

例如：

1. `https://gitee-badge.vercel.app/json/release/wtto00/badge-test` 使用`encodeURIComponent`后得到 `https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Frelease%2Fwtto00%2Fbadge-test`
2. 然后把得到的编码后的字符串替换`<URL>` https://img.shields.io/endpoint?url=&lt;URL&gt;  
   得到 https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Frelease%2Fwtto00%2Fbadge-test  
   即![release](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Frelease%2Fwtto00%2Fbadge-test)

`query`参数可参见 [shields.io](https://shields.io/endpoint)

## All Api

地址前缀：`https://gitee-badge.vercel.app/json`或`https://gitee-badge.vercel.app/svg`
|说明|地址|效果|shields.io|
|---:|:---|:----|:--|
| latest release | [/release/wtto00/badge-test](https://gitee-badge.vercel.app/svg/release/wtto00/badge-test) | ![latest release](https://gitee-badge.vercel.app/svg/release/wtto00/badge-test 'latest release') |![latest release](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Frelease%2Fwtto00%2Fbadge-test 'latest release')|
| latest tag | [/tag/wtto00/badge-test](https://gitee-badge.vercel.app/svg/tag/wtto00/badge-test) | ![latest tag](https://gitee-badge.vercel.app/svg/tag/wtto00/badge-test 'latest tag') |![latest tag](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Ftag%2Fwtto00%2Fbadge-test 'latest tag')|
| watchers | [/watchers/wtto00/badge-test](https://gitee-badge.vercel.app/svg/watchers/wtto00/badge-test) | ![watchers](https://gitee-badge.vercel.app/svg/watchers/wtto00/badge-test 'watchers') |![watchers](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fwatchers%2Fwtto00%2Fbadge-test 'watchers')|
| stars | [/stars/wtto00/badge-test](https://gitee-badge.vercel.app/svg/stars/wtto00/badge-test) | ![stars](https://gitee-badge.vercel.app/svg/stars/wtto00/badge-test 'stars') |![stars](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fstars%2Fwtto00%2Fbadge-test 'stars')|
| forks | [/forks/wtto00/badge-test](https://gitee-badge.vercel.app/svg/forks/wtto00/badge-test) | ![forks](https://gitee-badge.vercel.app/svg/forks/wtto00/badge-test 'forks') |![forks](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fforks%2Fwtto00%2Fbadge-test 'forks')|
| issues | [/issues/wtto00/badge-test](https://gitee-badge.vercel.app/svg/issues/wtto00/badge-test) | ![issues](https://gitee-badge.vercel.app/svg/issues/wtto00/badge-test 'issues') |![issues](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fissues%2Fwtto00%2Fbadge-test 'issues')|
| open issues | [/open-issues/wtto00/badge-test](https://gitee-badge.vercel.app/svg/open-issues/wtto00/badge-test) | ![open issues](https://gitee-badge.vercel.app/svg/open-issues/wtto00/badge-test 'open issues') |![open issues](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fopen-issues%2Fwtto00%2Fbadge-test 'open issues')|
| progressing issues | [/progressing-issues/wtto00/badge-test](https://gitee-badge.vercel.app/svg/progressing-issues/wtto00/badge-test) | ![progressing issues](https://gitee-badge.vercel.app/svg/progressing-issues/wtto00/badge-test 'progressing issues') |![progressing issues](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fprogressing-issues%2Fwtto00%2Fbadge-test 'progressing issues')|
| closed issues | [/closed-issues/wtto00/badge-test](https://gitee-badge.vercel.app/svg/closed-issues/wtto00/badge-test) | ![closed issues](https://gitee-badge.vercel.app/svg/closed-issues/wtto00/badge-test 'closed issues') |![closed issues](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fclosed-issues%2Fwtto00%2Fbadge-test 'closed issues')|
| rejected issues | [/rejected-issues/wtto00/badge-test](https://gitee-badge.vercel.app/svg/rejected-issues/wtto00/badge-test) | ![rejected issues](https://gitee-badge.vercel.app/svg/rejected-issues/wtto00/badge-test 'rejected issues') |![rejected issues](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Frejected-issues%2Fwtto00%2Fbadge-test 'rejected issues')|
| issues by label | [/label-issues/wtto00/badge-test/154513805](https://gitee-badge.vercel.app/svg/label-issues/wtto00/badge-test/154513805) | ![issues by label](https://gitee-badge.vercel.app/svg/label-issues/wtto00/badge-test/154513805 'issues by label') |![issues by label](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Flabel-issues%2Fwtto00%2Fbadge-test%2F154513805 'issues by label')|
| open issues by label | [/open-label-issues/wtto00/badge-test/154513810](https://gitee-badge.vercel.app/svg/open-label-issues/wtto00/badge-test/154513810) | ![open issues by label](https://gitee-badge.vercel.app/svg/open-label-issues/wtto00/badge-test/154513810 'open issues by label') |![open issues by label](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fopen-label-issues%2Fwtto00%2Fbadge-test%2F154513810 'open issues by label')|
| progressing issues by label | [/progressing-label-issues/wtto00/badge-test/154513805](https://gitee-badge.vercel.app/svg/progressing-label-issues/wtto00/badge-test/154513805) | ![progressing issues  by label](https://gitee-badge.vercel.app/svg/progressing-label-issues/wtto00/badge-test/154513805 'progressing issues by label') |![progressing issues by label](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fprogressing-label-issues%2Fwtto00%2Fbadge-test%2F154513805 'progressing issues by label')|
| closed issues by label | [/closed-label-issues/wtto00/badge-test/154513805](https://gitee-badge.vercel.app/svg/closed-label-issues/wtto00/badge-test/154513805) | ![closed issues by label](https://gitee-badge.vercel.app/svg/closed-label-issues/wtto00/badge-test/154513805 'closed issues by label') |![closed issues by label](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fclosed-label-issues%2Fwtto00%2Fbadge-test%2F154513805 'closed issues by label')|
| rejected issues by label | [/rejected-label-issues/wtto00/badge-test/154513805](https://gitee-badge.vercel.app/svg/rejected-label-issues/wtto00/badge-test/154513805) | ![rejected issues by label](https://gitee-badge.vercel.app/svg/rejected-label-issues/wtto00/badge-test/154513805 'rejected issues by label') |![rejected issues by label](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Frejected-label-issues%2Fwtto00%2Fbadge-test%2F154513805 'rejected issues by label')|
| PRs | [/prs/sentsin/layui](https://gitee-badge.vercel.app/svg/prs/sentsin/layui) | ![PRs](https://gitee-badge.vercel.app/svg/prs/sentsin/layui 'PRs') |![PRs](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fprs%2Fsentsin%2Flayui 'PRs')|
| open PRs | [/open-prs/sentsin/layui](https://gitee-badge.vercel.app/svg/open-prs/sentsin/layui) | ![open PRs](https://gitee-badge.vercel.app/svg/open-prs/sentsin/layui 'open PRs') |![open PRs](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fopen-prs%2Fsentsin%2Flayui 'open PRs')|
| closed PRs | [/closed-prs/sentsin/layui](https://gitee-badge.vercel.app/svg/closed-prs/sentsin/layui) | ![closed PRs](https://gitee-badge.vercel.app/svg/closed-prs/sentsin/layui 'closed PRs') |![closed PRs](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fclosed-prs%2Fsentsin%2Flayui 'closed PRs')|
| merged PRs | [/merged-prs/sentsin/layui](https://gitee-badge.vercel.app/svg/merged-prs/sentsin/layui) | ![merged PRs](https://gitee-badge.vercel.app/svg/merged-prs/sentsin/layui 'merged PRs') |![merged PRs](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fmerged-prs%2Fsentsin%2Flayui 'merged PRs')|
| commits count | [/commits/wtto00/badge-test](https://gitee-badge.vercel.app/svg/commits/wtto00/badge-test) | ![commits count](https://gitee-badge.vercel.app/svg/commits/wtto00/badge-test 'commits count') |![commits count](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fcommits%2Fwtto00%2Fbadge-test 'commits count')|
| commits count (branch ref) | [/commits/wtto00/badge-test/develop](https://gitee-badge.vercel.app/svg/commits/wtto00/badge-test/develop) | ![commits count (branch ref)](https://gitee-badge.vercel.app/svg/commits/wtto00/badge-test/develop 'commits count (branch ref)') |![commits count (branch ref)](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fcommits%2Fwtto00%2Fbadge-test%2Fdevelop 'commits count (branch ref)')|
| commits count (tag ref) | [/commits/wtto00/badge-test/0.0.1](https://gitee-badge.vercel.app/svg/commits/wtto00/badge-test/0.0.1) | ![commits count (tag ref)](https://gitee-badge.vercel.app/svg/commits/wtto00/badge-test/0.0.1 'commits count (tag ref)') |![commits count (tag ref)](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fcommits%2Fwtto00%2Fbadge-test%2F0.0.1 'commits count (tag ref)')|
| last commit | [/last-commit/wtto00/badge-test](https://gitee-badge.vercel.app/svg/last-commit/wtto00/badge-test) | ![last commit](https://gitee-badge.vercel.app/svg/last-commit/wtto00/badge-test 'last commit') |![last commit](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Flast-commit%2Fwtto00%2Fbadge-test 'last commit')|
| last commit (branch ref) | [/last-commit/wtto00/badge-test/develop](https://gitee-badge.vercel.app/svg/last-commit/wtto00/badge-test/develop) | ![last commit (branch ref)](https://gitee-badge.vercel.app/svg/last-commit/wtto00/badge-test/develop 'last commit (branch ref)') |![last commit (branch ref)](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Flast-commit%2Fwtto00%2Fbadge-test%2Fdevelop 'last commit (branch ref)')|
| last commit (tag ref) | [/last-commit/wtto00/badge-test/0.0.1](https://gitee-badge.vercel.app/svg/last-commit/wtto00/badge-test/0.0.1) | ![last commit (tag ref)](https://gitee-badge.vercel.app/svg/last-commit/wtto00/badge-test/0.0.1 'last commit (tag ref)') |![last commit (tag ref)](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Flast-commit%2Fwtto00%2Fbadge-test%2F0.0.1 'last commit (tag ref)')|
| branches | [/branches/wtto00/badge-test](https://gitee-badge.vercel.app/svg/branches/wtto00/badge-test) | ![branches](https://gitee-badge.vercel.app/svg/branches/wtto00/badge-test 'branches') |![branches](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fbranches%2Fwtto00%2Fbadge-test 'branches')|
| releases | [/releases/wtto00/badge-test](https://gitee-badge.vercel.app/svg/releases/wtto00/badge-test) | ![releases](https://gitee-badge.vercel.app/svg/releases/wtto00/badge-test 'releases') |![releases](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Freleases%2Fwtto00%2Fbadge-test 'releases')|
| tags | [/tags/wtto00/badge-test](https://gitee-badge.vercel.app/svg/tags/wtto00/badge-test) | ![tags](https://gitee-badge.vercel.app/svg/tags/wtto00/badge-test 'tags') |![tags](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Ftags%2Fwtto00%2Fbadge-test 'tags')|
| license | [/license/wtto00/badge-test](https://gitee-badge.vercel.app/svg/license/wtto00/badge-test) | ![license](https://gitee-badge.vercel.app/svg/license/wtto00/badge-test 'license') |![license](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Flicense%2Fwtto00%2Fbadge-test 'license')|
| contributors | [/contributors/wtto00/badge-test](https://gitee-badge.vercel.app/svg/contributors/wtto00/badge-test) | ![contributors](https://gitee-badge.vercel.app/svg/contributors/wtto00/badge-test 'contributors') |![contributors](https://img.shields.io/endpoint?url=https%3A%2F%2Fgitee-badge.vercel.app%2Fjson%2Fcontributors%2Fwtto00%2Fbadge-test 'contributors')|

## Q&A

1. 为什么不使用 [Gitee OpenAPI](https://gitee.com/api/v5/swagger) ,而是使用爬虫的方式获取数据?

   > 禁止滥用 API，请求频率过快将导致请求终止。

   [Gitee OpenAPI](https://gitee.com/api/v5/swagger) 上面有说明，请求频率过快将导致请求终止，所以最终决定使用爬虫的方式。
