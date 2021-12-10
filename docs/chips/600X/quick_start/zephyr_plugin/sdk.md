---
title: sdk 设置
sidebar_position: 2
---

## 命令

```shell
lisa zep use-sdk
```

__选项__

|  参数   | 描述  |
|  ----   | ----  |
| -h | 打印帮助 |
|  <path\>   | 路径 |
| --clear  | 清除设置 |
| --install | 安装 sdk 中的组件 |
| --from-git <url#ref\> | 从指定仓库及分支初始化 sdk |

## 示例

### 查看当前设置的 sdk

__命令__

```shell
lisa zep use-sdk
```
__解释__

该命令会输出当前已设置的 sdk 路径。

### 清除 sdk 设置

__命令__

```shell
lisa zep use-sdk --clear
```

__解释__

该命令会清除已经设置好的 sdk 。

### 指定仓库设置 sdk

__示例命令__

```shell
lisa zep use-sdk ./my-zephyr-sdk --from-git https://github.com/zephyrproject-rtos/zephyr.git#main
```

__解释__

该命令会在当前执行的目录下，创建`my-zephyr-sdk`文件夹，并基于 `https://github.com/zephyrproject-rtos/zephyr.git` 仓库的 `main` 分支，进行sdk的获取和初始化，设置 sdk 。

:::tip tips
你可以修改你想创建的文件夹名，以及 sdk 的仓库地址。
:::

### 设置已存在的 sdk

__示例命令__

```shell
lisa zep use-sdk ./my-else-zephyr-sdk/zephyr
```

__解释__

该命令会将当前执行的目录下，将`./my-else-zephyr-sdk/zephyr`路径设置为 sdk 。注意，请确保所填的路径，是一个 sdk 路径。
