---
id: lisa
title: 关于 LISA
slug: /lisa
---

**LISA(Listenai Software Architecture)**是聆思智能提供的软件框架，支持客户通过命令行工具使用并管理聆思提供的软件包。[**LPM(Listenai Package Manager)**](https://lpm.listenai.com/)是聆思智能的私有软件包管理服务。LPM 上的软件包可通过统一的命令行工具进行安装使用。

## 1.LISA 的优势

1. 以软件包的形式，更便捷获取聆思提供的固件源码、算法模型、固件配置、开发工具等。
2. 对开发项目的软件依赖、软件版本管理更清晰，提升问题定位与解决的效率。
3. 支持针对软件包进行热更新，平滑提升产品效果、修复软件缺陷。

## 2.获取 LISA 环境

下载并安装LStudio 2.3.1 版本，即可以完成配置所有运行 LISA 所需的环境配置。[点击这里下载](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lstudio/alpha/LStudioInstaller-2.3.1-beta.exe)

如果之前已经在更早版本的 LStudio 登录过，安装新版本后**请重新登录**。

**检查 LISA**
1. 在 LStudio 打开终端
2. 输入命令行 `lisa -v`，看到 LISA 版本号，代表 LISA 环境正常

```shell
PS C:\Users\oralzl\项目文件夹> lisa -v
@listenai/lisa/1.3.4 win32-x64 node-v12.21.0
```

你也可以不依赖 LStudio 搭建 LISA 环境，具体请查看[这里](http://open.listenai.com/lisa_tutorial#%E6%96%B9%E5%BC%8F%E4%BA%8C%EF%BC%9A%E6%90%AD%E5%BB%BA%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)


## 3.使用 LISA

###  [使用 LISA 创建 CSK 项目](/lisa_create)
本文介绍如何使用 LISA 把各类软件包组织成全新的 CSK 项目，如何使用 LISA 完成固件构建与烧录，并介绍 LISA CSK 新增的图形化配置功能。

###  [为旧项目烧录固件](/build_old_project)
本文介绍如何在旧项目中使用 LISA，直接体验软件包的安装机制（lisa install）与任务运行机制（lisa task）。

###  [LISA 命令行功能详解](https://lpm.listenai.com/package/@listenai/lisa)
通过本文可以更全面了解 LISA 的命令。

###  [开发者教程：从零开发一个 LISA 包](/lisa_tutorial)
从开发一个小工具包入手，你将学到如何使用 LISA 去创建并开发实现一个 LISA 软件包，以及使用者如何使用该 LISA 包。



## 4.LISA 软件包

LISA 生态离不开各类软件包的不断丰富，以下列出目前推荐使用的软件包。将有更多实用的软件包更新到此目录中。

### 基础软件包

- [@listenai/lisa](https://lpm.listenai.com/package/@listenai/lisa)：LISA 命令行原始工具
- [@@listenai/lisa_core](https://lpm.listenai.com/package/@listenai/lisa_core)：LISA 核心包，用于制作 LISA 软件包


### CSK源码@source

- [@source/csk4002](https://lpm.listenai.com/package/@source/csk4002)：CSK4002 源码
<!-- - [@source/csk4002nc](https://lpm.listenai.com/package/@source/csk4002nc)：CSK4002NC 源码 -->
<!-- - [@source/csk3002](https://lpm.listenai.com/package/@source/csk3002)：CSK3002 源码 -->
<!-- - [@source/csk3001nn](https://lpm.listenai.com/package/@source/csk3001nn)：CSK3001NN源码 -->


### 项目模板@generator

- [@generator/csk](https://lpm.listenai.com/package/@generator/csk)：CSK开发项目 Framework，包含生成器与相关业务功能
- [@generator/lpm-pkg](https://lpm.listenai.com/package/@generator/lpm-pkg)：LPM包生成器


### 算法模型@algo

- [@algo/csk4002-cae-mlp](https://lpm.listenai.com/package/@algo/csk4002-cae-mlp)：CSK4002 通用 algo
- [@algo/csk3002-cae-mlp](https://lpm.listenai.com/package/@algo/csk3002-cae-mlp)：CSK3002 通用 algo
- [@algo/csk3001nn-cae-mlp](https://lpm.listenai.com/package/@algo/csk3001nn-cae-mlp)：CSK3001 单麦NN降噪模型


### CSK板型模板@board

- [@board/lskits-csk4002](https://lpm.listenai.com/package/@board/lskits-csk4002)：LSkits CSK4002核心板 硬件板型模板
- [@board/lskits-csk3002](https://lpm.listenai.com/package/@board/lskits-csk3002)：LSkits CSK3002核心板 硬件板型模板



### 常用工具@tool

- [@tool/cskburn](https://lpm.listenai.com/package/@tool/cskburn)：CSK 芯片烧录工具
- [@tool/csk-old-build](https://lpm.listenai.com/package/@tool/csk-old-build)：支持 CSK 旧项目构建出 LPK文件
- [@tool/mini-esr-tool](https://lpm.listenai.com/package/@tool/mini-esr-tool)：可把阈值txt转成bin






