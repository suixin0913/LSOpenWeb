---
title: 安装
sidebar_position: 1
---

## 获取

1、确保你安装了较新版本的Node.js。可参考该[文档](./node_installation)进行安装。

2、全局安装yarn。

```shell
npm install yarn -g
```

3、全局安装lisa。

```shell
npm install @listenai/lisa -g
```

现在，运行下lisa的命令看看吧~

```shell
lisa -v
```

尝试登录你的聆思账号~

```shell
lisa login
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
```