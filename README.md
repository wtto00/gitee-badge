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

例如：`https://badge.wtto00.now.sh/api/badge/release/v1.0.2/cyan`  
[![release](https://github.com/wtto00/badge/blob/master/docs/images/subject-release.png?raw=true "subject release")](https://badge.wtto00.now.sh/api/badge/release/v1.0.2/cyan)  
`release` 即为 `subject` 的参数值  
`v1.0.2` 即为 `status` 的参数值  
`cyan` 即为 `color` 的参数值

- **可选颜色**  
  [![blue](https://github.com/wtto00/badge/blob/master/docs/images/color-blue.png?raw=true "color blue")](https://badge.wtto00.now.sh/api/badge/color/blue/blue) [![cyan](https://github.com/wtto00/badge/blob/master/docs/images/color-cyan.png?raw=true "color cyan")](https://badge.wtto00.now.sh/api/badge/color/cyan/cyan) [![green](https://github.com/wtto00/badge/blob/master/docs/images/color-green.png?raw=true "color green")](https://badge.wtto00.now.sh/api/badge/color/green/green) [![yellow](https://github.com/wtto00/badge/blob/master/docs/images/color-yellow.png?raw=true "color yellow")](https://badge.wtto00.now.sh/api/badge/color/yellow/yellow) [![orange](https://github.com/wtto00/badge/blob/master/docs/images/color-orange.png?raw=true "color orange")](https://badge.wtto00.now.sh/api/badge/color/orange/orange) [![red](https://github.com/wtto00/badge/blob/master/docs/images/color-red.png?raw=true "color red")](https://badge.wtto00.now.sh/api/badge/color/red/red) [![pink](https://github.com/wtto00/badge/blob/master/docs/images/color-pink.png?raw=true "color pink")](https://badge.wtto00.now.sh/api/badge/color/pink/pink) [![purple](https://github.com/wtto00/badge/blob/master/docs/images/color-purple.png?raw=true "color purple")](https://badge.wtto00.now.sh/api/badge/color/purple/purple) [![grey](https://github.com/wtto00/badge/blob/master/docs/images/color-grey.png?raw=true "color grey")](https://badge.wtto00.now.sh/api/badge/color/grey/grey) [![black](https://github.com/wtto00/badge/blob/master/docs/images/color-black.png?raw=true "color black")](https://badge.wtto00.now.sh/api/badge/color/black/black)

  > 其他参数将显示默认颜色 `blue`

## 计划

1. [x] `readme` `svg` → `png`
1. [x] color list not use ul>li, just list
1. [x] 首页使用 `getStaticPaths` & `getStaticProps` 预加载
1. [ ] `icon` 渲染
1. [ ] 访问 `https://badge.wtto00.now.sh/api/badge/:subject/:status` 默认蓝色，不报错
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
