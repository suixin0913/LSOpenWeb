---
title: 基于Lisa的Zephyr开发
sidebar_position: 2
---

### 设置sdk

```shell
> lisa zep use-sdk [sdk_path]
```

__解析__

__sdk_path__: ZEPHYR_BASE，需要自行从github拉取 或 拉取聆思的sdk

```shell
// 官方zephyr github地址: https://github.com/zephyrproject-rtos/zephyr/tree/main

> mkdir my-zephyr-sdk
> git clone https://github.com/zephyrproject-rtos/zephyr.git ./my-zephyr-sdk
> lisa zep use-sdk ./my-zephyr-sdk
```

![](../files/2.png)

:::caution 注意

若该sdk是首次use，use-sdk后需要执行初始化

:::

```shell
// 初始化sdk

> lisa zep west init
```

### 设置编译环境

```shell
lisa zep use-env [env]
```

#### 当前已支持的env：

__csk6__ [@lisa-env/csk6](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fcsk6)

```shell
lisa zep use-env csk6
```

__esp32-c3__ [@lisa-env/esp32-c3](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fesp32-c3)

```shell
lisa zep use-env esp32-c3
```

![](../files/3.png)

:::caution 注意

部分环境在首次use-env后，需要进行west update

:::

### 固件编译

#### 命令:
```shell
lisa zep build [project_path] -b [board] --clean
```

#### 参数解析

| 参数 | 解析 | 必填 |
| -- | -- | -- |
| project_path | 项目相对或绝对目录，若不带该参，默认为执行命令当前目录 | 否 |
| board | 板型 | 是 |
| clean | 清除编译产物 | 否 |

其余参数与__west__保持一致

#### demo：
```shell
lisa zep build .\samples\hello_world -b esp32c3_devkitm
```

### 固件烧录

#### 命令
```shell
lisa zep flash [project_path]
```

#### 参数解析

| 参数 | 解析 | 必填 |
| -- | -- | -- |
| project_path | 项目相对或绝对目录，若不带该参，默认为执行命令当前目录 | 否 |

#### demo：
```shell
lisa zep flash .\samples\hello_world
```
