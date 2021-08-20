---
title: 安装
sidebar_position: 1
---

## 获取

提供两个方式获取Lisa环境。


### 方式一：从LStudio中获取

下载并安装LStudio 最新版本，即可以完成配置所有运行 LISA 所需的环境配置。[点击这里下载](https://castor.iflyos.cn/castor/v3/lstudio/download)

如果之前已经在更早版本的 LStudio 登录过，安装新版本后**请重新登录**。

### 方式二：搭建本地开发环境

1、确保你安装了较新版本的Node.js。打开[node官网](https://nodejs.org/zh-cn/)，根据自身系统平台，选择**长期维护版(LTS)**进行下载安装。

2、全局安装yarn。

```shell
npm install yarn -g
```

3、全局安装lisa。

```shell
npm install @listenai/lisa -g
```

现在，运行下lisa的命令看看吧～

```shell
lisa -v
```

## 更新

若你已经安装了 lisa ，同样有两种方式进行更新。

### 方式一：用lisa命令

lisa 提供了更新命令，直接执行能将当前环境的lisa升级到latest版本。

```shell
lisa update
```

### 方式二：通过npm更新

执行npm全局安装命令，同样能将lisa升级到latest版本。

```shell
npm install @listenai/lisa -g
```

:::info

若由于额外原因导致install失败，可先卸载后，重新install

:::

```shell
npm uninstall @listenai/lisa -g
npm install @listenai/lisa -g
```