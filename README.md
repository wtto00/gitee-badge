# badge

生成徽章服务

## 使用

#### 自定义

```text
https://badge.wtto00.now.sh/api/badge/:subject/:status/:color?icon=github
                                      --------|-------|------|-----------
                                          |       |       |        |
                                          |       |       |      图标
                                          |       |      颜色
                                          |      状态
                                         主题
```

- **subject**
  文本 在徽章的左边显示。通常为所要展示的项目名称
- **status**
  文本 在徽章的右边显示。通常为所要展示的项目状态数据
- **可选颜色**
  ![blue](https://badge.wtto00.now.sh/api/badge/color/blue/blue) ![cyan](https://badge.wtto00.now.sh/api/badge/color/cyan/cyan) ![green](https://badge.wtto00.now.sh/api/badge/color/green/green) ![yellow](https://badge.wtto00.now.sh/api/badge/color/yellow/yellow) ![orange](https://badge.wtto00.now.sh/api/badge/color/orange/orange) ![red](https://badge.wtto00.now.sh/api/badge/color/red/red) ![pink](https://badge.wtto00.now.sh/api/badge/color/pink/pink) ![purple](https://badge.wtto00.now.sh/api/badge/color/purple/purple) ![grey](https://badge.wtto00.now.sh/api/badge/color/grey/grey) ![black](https://badge.wtto00.now.sh/api/badge/color/black/black)

  > 其他参数将显示默认颜色 `blue`

- **示例**
  - ![black](https://badge.wtto00.now.sh/api/badge/release/v1.0.2/cyan) `https://badge.wtto00.now.sh/api/badge/release/v1.0.2/cyan`
  - ![black](https://badge.wtto00.now.sh/api/badge/license/MIT/green) `https://badge.wtto00.now.sh/api/badge/license/MIT/green`

## 计划

1. `readme` `svg` → `png`
1. ~~color list not use ul>li, just list~~
1. 使用 `getStaticPaths` & `getStaticProps` 预加载
1. `icon` 渲染
1. 访问 `https://badge.wtto00.now.sh/api/badge/:subject/:status` 默认蓝色，不报错
1. `gitee` `api`
1. `github` `api`
1. `npm` `api`
1. `packagist` `api`
1. `pypi` `api`
1. ...

## 问题

1. `nodejs` 获取字体宽度的问题
   - 使用 [canvas](https://www.npmjs.com/package/canvas#quick-example) 中的 `measureText` 方法测量字符串显示宽度。
     但是在不同系统得到的结果是不同的，[issues](https://github.com/Automattic/node-canvas/issues/782)
   - 使用 [text-to-svg](https://www.npmjs.com/package/text-to-svg#texttosvggetmetricstext-option--) 中的 `getMetrics` 方法测量字符串显示宽度。
     但是在这个插件中，每个字符的宽度是相等的，实际上 `a` 和 `b` 的显示宽度是不相等的。这就导致一些稍宽的字符，在测量出来的宽度中显示的很挤。
