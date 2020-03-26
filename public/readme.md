# badge

生成徽章服务

## 使用

#### 自定义

```
https://badge.wtto00.now.sh/api/badge/:subject/:status/:color?icon=github
                                      --------|-------|------|-----------
                                          |       |       |        |
                                          |       |       |      图标
                                          |       |      颜色
                                          |      状态
                                         主题
```

- **可选颜色**

  - `blue` ![blue](https://badge.wtto00.now.sh/api/badge/color/blue/blue)
  - `cyan` ![cyan](https://badge.wtto00.now.sh/api/badge/color/cyan/cyan)
  - `green` ![green](https://badge.wtto00.now.sh/api/badge/color/green/green)
  - `yellow` ![yellow](https://badge.wtto00.now.sh/api/badge/color/yellow/yellow)
  - `orange` ![orange](https://badge.wtto00.now.sh/api/badge/color/orange/orange)
  - `red` ![red](https://badge.wtto00.now.sh/api/badge/color/red/red)
  - `pink` ![pink](https://badge.wtto00.now.sh/api/badge/color/pink/pink)
  - `purple` ![purple](https://badge.wtto00.now.sh/api/badge/color/purple/purple)
  - `grey` ![grey](https://badge.wtto00.now.sh/api/badge/color/grey/grey)
  - `black` ![black](https://badge.wtto00.now.sh/api/badge/color/black/black)

  > 其他参数将显示默认颜色 `blue`

- **示例**
  - ![black](https://badge.wtto00.now.sh/api/badge/release/v1.0.2/cyan) `https://badge.wtto00.now.sh/api/badge/release/v1.0.2/cyan`
  - ![black](https://badge.wtto00.now.sh/api/badge/license/MIT/green) `https://badge.wtto00.now.sh/api/badge/license/MIT/green`
