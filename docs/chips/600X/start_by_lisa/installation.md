---
title: 基于Lisa的Zephyr环境搭建
sidebar_position: 1
---

### 搭建Lisa环境

1、确保你安装了较新版本的Node.js。打开[node官网](https://nodejs.org/zh-cn/)，根据自身系统平台，选择**长期维护版(LTS)16.13.0**进行下载安装。

2、全局安装lisa和yarn（当前为beta版）

```shell
npm install @listenai/lisa@beta -g
```

```shell
npm install yarn -g
```

现在，运行下lisa的命令看看吧～

```shell
lisa -v
```

3、尝试登录你的聆思账号~

```shell
lisa login
```

### 安装Zephyr扩展包

执行lisa命令，一键安装Zephyr扩展包，该扩展包会自动根据本机系统，搭建对应的所需环境

```shell
lisa install @lisa-plugin/zephyr -g
```

来查看下当前的zephyr环境吧~

```shell
lisa info zephyr
```

:::success

若上面步骤均顺利，恭喜你，你已经搭建好Zephyr开发的环境！

:::