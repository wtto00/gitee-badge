<h1 align="center">badge</h1>
<p align="center">
  <a href="https://github.com/wtto00/badge" target="_blank"><img src="https://badg.now.sh/api/badge/release/GitHub/black?icon=github&label&scale=1.2" /></a> <a href="https://gitee.com/wtto00/badge" target="_black"><img src="https://badg.now.sh/api/badge/release/Gitee/orange?icon=gitee&label&scale=1.2" /></a> <a href="https://badg.now.sh" target="_blank"><img src="https://badg.now.sh/api/badge/icon/My Site/cyan?icon=badg&label&scale=1.2" /></a>
</p>

生成徽章服务。  
使用 [Next.js](https://nextjs.org/) 框架开发，[ZEIT Now](https://zeit.co/) 自动化部署.

## 使用

#### 自定义徽章

```
https://badg.now.sh/api/badge/:subject/:status/:color?icon=github
                       ------|--------|-------|------|-----------
                              |           |       |       |        |
                              |           |       |       |       选项(icon,color,label,list,labelColor,scale)
                              |           |       |      颜色
                              |           |      状态
                              |          主题
                          自定义Badge
```

- **可选颜色**  
  [![blue](https://badg.now.sh/api/badge/color/blue/blue "color blue")](https://badg.now.sh/api/badge/color/blue/blue) [![cyan](https://badg.now.sh/api/badge/color/cyan/cyan "color cyan")](https://badg.now.sh/api/badge/color/cyan/cyan) [![green](https://badg.now.sh/api/badge/color/green/green "color green")](https://badg.now.sh/api/badge/color/green/green) [![yellow](https://badg.now.sh/api/badge/color/yellow/yellow "color yellow")](https://badg.now.sh/api/badge/color/yellow/yellow) [![orange](https://badg.now.sh/api/badge/color/orange/orange "color orange")](https://badg.now.sh/api/badge/color/orange/orange) [![red](https://badg.now.sh/api/badge/color/red/red "color red")](https://badg.now.sh/api/badge/color/red/red) [![pink](https://badg.now.sh/api/badge/color/pink/pink "color pink")](https://badg.now.sh/api/badge/color/pink/pink) [![purple](https://badg.now.sh/api/badge/color/purple/purple "color purple")](https://badg.now.sh/api/badge/color/purple/purple) [![grey](https://badg.now.sh/api/badge/color/grey/grey "color grey")](https://badg.now.sh/api/badge/color/grey/grey) [![black](https://badg.now.sh/api/badge/color/black/black "color black")](https://badg.now.sh/api/badge/color/black/black)
  > 其他颜色参数或无颜色参数将显示默认颜色 `blue`
- **可选图标**  
  [![icon airbnb](https://badg.now.sh/api/badge/icon/airbnb?icon=airbnb&label "icon airbnb")](https://badg.now.sh/api/badge/icon/airbnb?icon=airbnb&label) [![icon apple](https://badg.now.sh/api/badge/icon/apple?icon=apple&label "icon apple")](https://badg.now.sh/api/badge/icon/apple?icon=apple&label) [![icon appveyor](https://badg.now.sh/api/badge/icon/appveyor?icon=appveyor&label "icon appveyor")](https://badg.now.sh/api/badge/icon/appveyor?icon=appveyor&label) [![icon atom](https://badg.now.sh/api/badge/icon/atom?icon=atom&label "icon atom")](https://badg.now.sh/api/badge/icon/atom?icon=atom&label) [![icon awesome](https://badg.now.sh/api/badge/icon/awesome?icon=awesome&label "icon awesome")](https://badg.now.sh/api/badge/icon/awesome?icon=awesome&label) [![icon badg](https://badg.now.sh/api/badge/icon/badg?icon=badg&label "icon badg")](https://badg.now.sh/api/badge/icon/badg?icon=badg&label) [![icon bitcoin-lightning](https://badg.now.sh/api/badge/icon/bitcoin-lightning?icon=bitcoin-lightning&label "icon bitcoin-lightning")](https://badg.now.sh/api/badge/icon/bitcoin-lightning?icon=bitcoin-lightning&label) [![icon bitcoin](https://badg.now.sh/api/badge/icon/bitcoin?icon=bitcoin&label "icon bitcoin")](https://badg.now.sh/api/badge/icon/bitcoin?icon=bitcoin&label) [![icon chrome](https://badg.now.sh/api/badge/icon/chrome?icon=chrome&label "icon chrome")](https://badg.now.sh/api/badge/icon/chrome?icon=chrome&label) [![icon circleci](https://badg.now.sh/api/badge/icon/circleci?icon=circleci&label "icon circleci")](https://badg.now.sh/api/badge/icon/circleci?icon=circleci&label) [![icon codebeat](https://badg.now.sh/api/badge/icon/codebeat?icon=codebeat&label "icon codebeat")](https://badg.now.sh/api/badge/icon/codebeat?icon=codebeat&label) [![icon codeclimate](https://badg.now.sh/api/badge/icon/codeclimate?icon=codeclimate&label "icon codeclimate")](https://badg.now.sh/api/badge/icon/codeclimate?icon=codeclimate&label) [![icon codecov](https://badg.now.sh/api/badge/icon/codecov?icon=codecov&label "icon codecov")](https://badg.now.sh/api/badge/icon/codecov?icon=codecov&label) [![icon codeship](https://badg.now.sh/api/badge/icon/codeship?icon=codeship&label "icon codeship")](https://badg.now.sh/api/badge/icon/codeship?icon=codeship&label) [![icon commonwl](https://badg.now.sh/api/badge/icon/commonwl?icon=commonwl&label "icon commonwl")](https://badg.now.sh/api/badge/icon/commonwl?icon=commonwl&label) [![icon deepscan](https://badg.now.sh/api/badge/icon/deepscan?icon=deepscan&label "icon deepscan")](https://badg.now.sh/api/badge/icon/deepscan?icon=deepscan&label) [![icon dependabot](https://badg.now.sh/api/badge/icon/dependabot?icon=dependabot&label "icon dependabot")](https://badg.now.sh/api/badge/icon/dependabot?icon=dependabot&label) [![icon discord](https://badg.now.sh/api/badge/icon/discord?icon=discord&label "icon discord")](https://badg.now.sh/api/badge/icon/discord?icon=discord&label) [![icon dockbit](https://badg.now.sh/api/badge/icon/dockbit?icon=dockbit&label "icon dockbit")](https://badg.now.sh/api/badge/icon/dockbit?icon=dockbit&label) [![icon docker](https://badg.now.sh/api/badge/icon/docker?icon=docker&label "icon docker")](https://badg.now.sh/api/badge/icon/docker?icon=docker&label) [![icon eclipse](https://badg.now.sh/api/badge/icon/eclipse?icon=eclipse&label "icon eclipse")](https://badg.now.sh/api/badge/icon/eclipse?icon=eclipse&label) [![icon firefox](https://badg.now.sh/api/badge/icon/firefox?icon=firefox&label "icon firefox")](https://badg.now.sh/api/badge/icon/firefox?icon=firefox&label) [![icon flow](https://badg.now.sh/api/badge/icon/flow?icon=flow&label "icon flow")](https://badg.now.sh/api/badge/icon/flow?icon=flow&label) [![icon git](https://badg.now.sh/api/badge/icon/git?icon=git&label "icon git")](https://badg.now.sh/api/badge/icon/git?icon=git&label) [![icon gitee](https://badg.now.sh/api/badge/icon/gitee?icon=gitee&label "icon gitee")](https://badg.now.sh/api/badge/icon/gitee?icon=gitee&label) [![icon github](https://badg.now.sh/api/badge/icon/github?icon=github&label "icon github")](https://badg.now.sh/api/badge/icon/github?icon=github&label) [![icon gitlab](https://badg.now.sh/api/badge/icon/gitlab?icon=gitlab&label "icon gitlab")](https://badg.now.sh/api/badge/icon/gitlab?icon=gitlab&label) [![icon gitter](https://badg.now.sh/api/badge/icon/gitter?icon=gitter&label "icon gitter")](https://badg.now.sh/api/badge/icon/gitter?icon=gitter&label) [![icon googleplay](https://badg.now.sh/api/badge/icon/googleplay?icon=googleplay&label "icon googleplay")](https://badg.now.sh/api/badge/icon/googleplay?icon=googleplay&label) [![icon graphql](https://badg.now.sh/api/badge/icon/graphql?icon=graphql&label "icon graphql")](https://badg.now.sh/api/badge/icon/graphql?icon=graphql&label) [![icon haskell](https://badg.now.sh/api/badge/icon/haskell?icon=haskell&label "icon haskell")](https://badg.now.sh/api/badge/icon/haskell?icon=haskell&label) [![icon kofi](https://badg.now.sh/api/badge/icon/kofi?icon=kofi&label "icon kofi")](https://badg.now.sh/api/badge/icon/kofi?icon=kofi&label) [![icon lgtm](https://badg.now.sh/api/badge/icon/lgtm?icon=lgtm&label "icon lgtm")](https://badg.now.sh/api/badge/icon/lgtm?icon=lgtm&label) [![icon libraries](https://badg.now.sh/api/badge/icon/libraries?icon=libraries&label "icon libraries")](https://badg.now.sh/api/badge/icon/libraries?icon=libraries&label) [![icon now](https://badg.now.sh/api/badge/icon/now?icon=now&label "icon now")](https://badg.now.sh/api/badge/icon/now?icon=now&label) [![icon npm](https://badg.now.sh/api/badge/icon/npm?icon=npm&label "icon npm")](https://badg.now.sh/api/badge/icon/npm?icon=npm&label) [![icon nuget](https://badg.now.sh/api/badge/icon/nuget?icon=nuget&label "icon nuget")](https://badg.now.sh/api/badge/icon/nuget?icon=nuget&label) [![icon patreon](https://badg.now.sh/api/badge/icon/patreon?icon=patreon&label "icon patreon")](https://badg.now.sh/api/badge/icon/patreon?icon=patreon&label) [![icon postgresql](https://badg.now.sh/api/badge/icon/postgresql?icon=postgresql&label "icon postgresql")](https://badg.now.sh/api/badge/icon/postgresql?icon=postgresql&label) [![icon rss](https://badg.now.sh/api/badge/icon/rss?icon=rss&label "icon rss")](https://badg.now.sh/api/badge/icon/rss?icon=rss&label) [![icon ruby](https://badg.now.sh/api/badge/icon/ruby?icon=ruby&label "icon ruby")](https://badg.now.sh/api/badge/icon/ruby?icon=ruby&label) [![icon scrutinizer](https://badg.now.sh/api/badge/icon/scrutinizer?icon=scrutinizer&label "icon scrutinizer")](https://badg.now.sh/api/badge/icon/scrutinizer?icon=scrutinizer&label) [![icon slack](https://badg.now.sh/api/badge/icon/slack?icon=slack&label "icon slack")](https://badg.now.sh/api/badge/icon/slack?icon=slack&label) [![icon sourcegraph](https://badg.now.sh/api/badge/icon/sourcegraph?icon=sourcegraph&label "icon sourcegraph")](https://badg.now.sh/api/badge/icon/sourcegraph?icon=sourcegraph&label) [![icon telegram](https://badg.now.sh/api/badge/icon/telegram?icon=telegram&label "icon telegram")](https://badg.now.sh/api/badge/icon/telegram?icon=telegram&label) [![icon terminal](https://badg.now.sh/api/badge/icon/terminal?icon=terminal&label "icon terminal")](https://badg.now.sh/api/badge/icon/terminal?icon=terminal&label) [![icon terraform](https://badg.now.sh/api/badge/icon/terraform?icon=terraform&label "icon terraform")](https://badg.now.sh/api/badge/icon/terraform?icon=terraform&label) [![icon travis](https://badg.now.sh/api/badge/icon/travis?icon=travis&label "icon travis")](https://badg.now.sh/api/badge/icon/travis?icon=travis&label) [![icon twitter](https://badg.now.sh/api/badge/icon/twitter?icon=twitter&label "icon twitter")](https://badg.now.sh/api/badge/icon/twitter?icon=twitter&label) [![icon typescript](https://badg.now.sh/api/badge/icon/typescript?icon=typescript&label "icon typescript")](https://badg.now.sh/api/badge/icon/typescript?icon=typescript&label) [![icon windows](https://badg.now.sh/api/badge/icon/windows?icon=windows&label "icon windows")](https://badg.now.sh/api/badge/icon/windows?icon=windows&label) [![icon zeit](https://badg.now.sh/api/badge/icon/zeit?icon=zeit&label "icon zeit")](https://badg.now.sh/api/badge/icon/zeit?icon=zeit&label)
- **选项**
  - `color` 覆盖默认的徽章颜色  
    例如：`https://badg.now.sh/api/badge/release/v1.0.2/cyan?color=black`  
    [![options color](https://badg.now.sh/api/badge/release/v1.0.2/cyan?color=black "options color")](https://badg.now.sh/api/badge/release/v1.0.2/cyan?color=black)
  - `icon` 在主题 `subject` 中添加图标  
    例如：`https://badg.now.sh/api/badge/release/v1.0.2/cyan?color=black&icon=github`  
    [![options icon](https://badg.now.sh/api/badge/release/v1.0.2/cyan?color=black&icon=github "options icon")](https://badg.now.sh/api/badge/release/v1.0.2/cyan?color=black&icon=github)
  - `list` 设置 `list=|`， 将会用 `|` 代替状态 `status` 中的 `,`  
    例如：`https://badg.now.sh/api/badge/platform/ios,macos,tvos?list=|`  
    [![options list](https://badg.now.sh/api/badge/platform/ios,macos,tvos?list=| "options label")](https://badg.now.sh/api/badge/platform/ios,macos,tvos?list=|)
  - `label` 覆盖主题 `subject` 中的文本  
    例如：`https://badg.now.sh/api/badge/release/GitHub/cyan?color=black&icon=github&label`  
    [![options label](https://badg.now.sh/api/badge/release/GitHub/cyan?color=black&icon=github&label "options label")](https://badg.now.sh/api/badge/icon/GitHub/black?icon=github&label)
  - `labelColor` 覆盖主题 `subject` 的背景色  
    例如：`https://badg.now.sh/api/badge/release/GitHub/cyan?labelColor=pink`  
    [![options labelColor](https://badg.now.sh/api/badge/release/GitHub/cyan?labelColor=pink "options labelColor")](https://badg.now.sh/api/badge/release/GitHub/cyan?labelColor=pink)
  - `scale` 自定义缩放大小  
    例如：`https://badg.now.sh/api/badge/docker/v1.2.3/blue?icon=docker&scale=2`  
    [![options scale](https://badg.now.sh/api/badge/docker/v1.2.3/blue?icon=docker&scale=2 "options scale")](https://badg.now.sh/api/badge/docker/v1.2.3/blue?icon=docker&scale=2)

#### Gitee Api

```
https://badg.now.sh/api/gitee/:subject/:owner/:repo
                               ------|--------|------|-----
                                  |       |       |     |
                                  |       |       |  仓库名称
                                  |       |   仓库所有者
                                  |      主题
                              Gitee Api
```

- **用法**  
  如下表所列出所有的用法。地址前缀：`https://badg.now.sh/api`  
  |说明|地址|效果|
  |---:|:---|:---|
  |latest release|[/gitee/release/wtto00/badge](https://badg.now.sh/api/gitee/release/wtto00/badge)|![latest release](https://badg.now.sh/api/gitee/release/wtto00/badge "latest release")|
  |latest tag|[/gitee/tag/wtto00/Aliyun-oss-storage](https://badg.now.sh/api/gitee/tag/wtto00/Aliyun-oss-storage)|![latest tag](https://badg.now.sh/api/gitee/tag/wtto00/Aliyun-oss-storage "latest tag")
  |watchers|[/gitee/watchers/wtto00/dt-read](https://badg.now.sh/api/gitee/watchers/wtto00/dt-read)|![watchers](https://badg.now.sh/api/gitee/watchers/wtto00/dt-read "watchers")|
  |stars|[/gitee/stars/wtto00/dt-read](https://badg.now.sh/api/gitee/stars/wtto00/dt-read)|![stars](https://badg.now.sh/api/gitee/stars/wtto00/dt-read "stars")|
  |forks|[/gitee/forks/wtto00/dt-read](https://badg.now.sh/api/gitee/forks/wtto00/dt-read)|![forks](https://badg.now.sh/api/gitee/forks/wtto00/dt-read "forks")|

## 计划

1. [ ] `gitee` `api`
1. [ ] `github` `api`
1. [ ] `npm` `api`
1. [ ] `packagist` `api`
1. [ ] `pypi` `api`
1. [ ] ...

## 问题

1. `nodejs` 获取字体宽度的问题
   - 使用 [canvas](https://www.npmjs.com/package/canvas#quick-example) 中的 `measureText` 方法测量字符串显示宽度。  
     **但是** 在不同系统得到的结果是不同的，[查看 issues #782](https://github.com/Automattic/node-canvas/issues/782)
   - 使用 [text-to-svg](https://www.npmjs.com/package/text-to-svg#texttosvggetmetricstext-option--) 中的 `getMetrics` 方法测量字符串显示宽度。  
     **但是** 在这个插件中，每个字符的宽度是相等的，实际上 `a` 和 `b` 的显示宽度是不相等的。这就导致一些稍宽的字符，在测量出来的宽度中显示的很挤。
