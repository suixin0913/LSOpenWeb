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

## 获取并设置Zephyr sdk

### 1、获取Zephyr sdk

#### 1.1 初始化

```shell
lisa zep init ./my-zephyr
```

__解释__

该命令基于当前执行的路径，创建__my-zephyr__文件夹，并初始化拉取Zephyr官方源代码。

__注意__

若过程中，提示你已经初始化过，在环境变量中已经设置了__ZEPHYR_BASE__，可执行如下命令后，再重新获取Zephyr源代码。

```shell
lisa zep use-sdk --clear
```
#### 1.2 更新

```shell
cd ./my-zephyr

lisa zep update
```

__注意__

该过程会拉取更新依赖，初次update时间较久，请耐心等待。

过程中因网络原因会出现部分依赖update失败，可重新执行__lisa zep update__命令，直至update完全成功。

### 2、设置Zephyr sdk

```shell
lisa zep use-sdk ./zephyr
```

__解释__

该命令会进行sdk的设置，并在环境变量中设置__ZEPHYR_BASE__路径。命令示例中的__zephyr__文件夹，为__my-zephyr__中的文件夹。

:::success

可敲命令__lisa info zephyr__查看，__ZEPHYR_BASE__为你刚设置的sdk路径。

恭喜你，你已经成功完成获取/设置Zephyr sdk。

:::

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