---
title: 基于Lisa的Zephyr快速开发入门
sidebar_position: 2
---

查阅该章节前，请确定你已经成功安装了Lisa Zephyr扩展~可查看该[文档](./installation)进行安装。

:::info 通过本章节你可以

- 获取并设置Zephyr sdk
- 设置编译环境
- 编译、烧录示例应用程序

:::

## 设置Zephyr sdk

```shell
lisa zep use-sdk ./my-zephyr-project --from-git https://github.com/zephyrproject-rtos/zephyr.git#main
```

__注意__

该命令由于内置执行整个sdk设置的链路，设置时间较久，请耐心等待。

__解释__

该命令基于当前执行的路径，创建__my-zephyr-project__文件夹，并基于__from-git__的git代码仓（示例中为Zephyr官方的代码仓，可以替换为聆思的sdk代码仓），初始化拉取代码，然后进行update和设置sdk，一条命令解决繁琐的配置工作。


## 设置编译环境

```shell
lisa zep use-env [env]
```

__示例__

若选用了csk6为你的编译环境，执行

```shell
lisa zep use-env csk6
```

__解释__

该命令会根据使用的env，安装该env所需要的编译链，以及设置对应的环境变量。

#### 当前已支持的env：

[__csk6__](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fcsk6)

[__csk6-dsp__](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fcsk6-dsp)

[__esp32-c3__](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fesp32-c3)

[__nucleo-l552ze-q__](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fnucleo-l552ze-q)

:::success

可敲命令__lisa info zephyr__查看，__env__为你刚设置的编译环境env。

恭喜你，你已经成功完成编译环境的设置。

:::

## 编译、烧录

### 1、编译

```shell
lisa zep build [project_path] -b [board] --clean
```

__参数解析__

| 参数 | 解析 | 必填 |
| -- | -- | -- |
| project_path | 项目相对或绝对目录，若不带该参，默认为执行命令当前目录 | 否 |
| board | 板型 | 是 |
| clean | 清除编译产物 | 否 |

__示例__

```shell
lisa zep build .\samples\hello_world -b esp32c3_devkitm --clean
```

__解释__

该命令行为，在应用编译的行为与west build保持一致。

### 2、烧录

```shell
lisa zep flash
```

打开串口工具查看输出hello_world。

:::success

恭喜你，你已经成功进行编译、烧录示例应用程序。

:::

下一步，继续其余文档探索Lisa Zephyr扩展的更多使用功能吧~