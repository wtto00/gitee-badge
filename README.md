<h1 align="center">badge</h1>
<p align="center">[![my github](https://github.com/wtto00/badge/blob/master/docs/images/options/options-label.png?raw=true "my github")](https://github.com/wtto00/badge)</p>

生成徽章服务

## 使用

#### 自定义徽章

```
https://badge.wtto00.now.sh/api/badge/:subject/:status/:color?icon=github
                                      --------|-------|------|-----------
                                          |       |       |        |
                                          |       |       |       选项(icon,color,label,list,labelColor,scale)
                                          |       |      颜色
                                          |      状态
                                         主题
```

- **可选颜色**  
  [![blue](https://github.com/wtto00/badge/blob/master/docs/images/colors/color-blue.png?raw=true "color blue")](https://badge.wtto00.now.sh/api/badge/color/blue/blue) [![cyan](https://github.com/wtto00/badge/blob/master/docs/images/colors/color-cyan.png?raw=true "color cyan")](https://badge.wtto00.now.sh/api/badge/color/cyan/cyan) [![green](https://github.com/wtto00/badge/blob/master/docs/images/colors/color-green.png?raw=true "color green")](https://badge.wtto00.now.sh/api/badge/color/green/green) [![yellow](https://github.com/wtto00/badge/blob/master/docs/images/colors/color-yellow.png?raw=true "color yellow")](https://badge.wtto00.now.sh/api/badge/color/yellow/yellow) [![orange](https://github.com/wtto00/badge/blob/master/docs/images/colors/color-orange.png?raw=true "color orange")](https://badge.wtto00.now.sh/api/badge/color/orange/orange) [![red](https://github.com/wtto00/badge/blob/master/docs/images/colors/color-red.png?raw=true "color red")](https://badge.wtto00.now.sh/api/badge/color/red/red) [![pink](https://github.com/wtto00/badge/blob/master/docs/images/colors/color-pink.png?raw=true "color pink")](https://badge.wtto00.now.sh/api/badge/color/pink/pink) [![purple](https://github.com/wtto00/badge/blob/master/docs/images/colors/color-purple.png?raw=true "color purple")](https://badge.wtto00.now.sh/api/badge/color/purple/purple) [![grey](https://github.com/wtto00/badge/blob/master/docs/images/colors/color-grey.png?raw=true "color grey")](https://badge.wtto00.now.sh/api/badge/color/grey/grey) [![black](https://github.com/wtto00/badge/blob/master/docs/images/colors/color-black.png?raw=true "color black")](https://badge.wtto00.now.sh/api/badge/color/black/black)
  > 其他颜色参数或无颜色参数将显示默认颜色 `blue`
- **可选图标**  
  ![]()
- **选项**
  1. `color` 覆盖默认的徽章颜色  
     例如：`https://badge.wtto00.now.sh/api/badge/release/v1.0.2/cyan?color=black`  
     [![options color](https://github.com/wtto00/badge/blob/master/docs/images/options/options-color.png?raw=true "options color")](https://badge.wtto00.now.sh/api/badge/release/v1.0.2/cyan?color=black)
  2. `icon` 在主题 `subject` 中添加图标  
     例如：`https://badge.wtto00.now.sh/api/badge/release/v1.0.2/cyan?color=black&icon=github`  
     [![options icon](https://github.com/wtto00/badge/blob/master/docs/images/options/options-icon.png?raw=true "options icon")](https://badge.wtto00.now.sh/api/badge/release/v1.0.2/cyan?color=black&icon=github)
  3. `label` 覆盖主题 `subject` 中的文本  
     例如：`https://badge.wtto00.now.sh/api/badge/release/GitHub/cyan?color=black&icon=github&label`  
     [![options label](https://github.com/wtto00/badge/blob/master/docs/images/options/options-label.png?raw=true "options label")](https://badge.wtto00.now.sh/api/badge/icon/GitHub/black?icon=github&label)

## 计划

1. [x] `readme` `svg` → `png`
1. [x] color list not use ul>li, just list
1. [x] 首页使用 `getStaticPaths` & `getStaticProps` 预加载
1. [x] 访问 `https://badge.wtto00.now.sh/api/badge/:subject/:status` 默认蓝色，不报错
1. [x] `icon` 渲染
1. [ ] 单独的 icon 描述渲染，`subject` 参数值为 `icon`
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
