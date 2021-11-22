---
title: 命令行工具包
---

:::info

该功能仅在 v2.1.0 或以上版本具备

:::

为方便使用更自由的命令行工具包，并基于lisa强大的版本管理，新增lisa的命令行工具包管理命令。

## 使用者

### 查看当前已经安装的命令行工具包

```sh
lisa tools
```

演示时该电脑没安装任何cli工具包。

![](../files/tools/tools2.png)

### 安装命令行工具包

通过[lpm官网](https://lpm.listenai.com/lpm/)搜索关键字 **@cli-tool**，查看可以安装的cli工具包。

![](../files/tools/tools1.png)

如图，我们选择 **@cli-tool/audioplayer** 进行安装。

使用lisa install 全局安装，安装成功后再次执行 **lisa tools** 查看。

![](../files/tools/tools3.png)

### 工具包的内置命令

以上述 **@cli-tool/audioplayer** 为例

1、查看版本

```sh
audioplayer --version
```

2、版本更新

```sh
audioplayer --update
```