---
id: awesome
title: 关于 LISA
slug: /awesome
---

**LISA(Listenai Software Architecture)**是聆思智能提供的软件框架，支持客户通过命令行工具使用并管理聆思提供的软件包。
**LPM(Listenai Package Manager)**是聆思智能的私有软件包管理服务。LPM 上的软件包可通过统一的命令行工具进行安装使用。

## LISA 的优势
1. 以软件包的形式，更便捷获取聆思提供的固件源码、算法模型、固件配置、开发工具等。
2. 对开发项目的软件依赖、软件版本管理更清晰，提升问题定位与解决的效率。
3. 支持针对软件包进行热更新，平滑提升产品效果、修复软件缺陷。

## 使用 LISA

### - [使用 LISA 创建 CSK 项目](/lisa_create)

### - [LISA命令行功能详解](https://lpm.listenai.com/package/@listenai/lisa)

### - 为旧项目烧录固件(马上更新)

### - 使用 Lisa 开发(马上更新)



## Lisa 软件包

### 基础软件包

- [@listenai/lisa](https://lpm.listenai.com/package/@listenai/lisa)：lisa 命令行原始工具
- [@@listenai/lisa_core](https://lpm.listenai.com/package/@listenai/lisa_core)：lisa 核心包，用于制作 LPM 包


### CSK源码@source

- [@source/csk4002](https://lpm.listenai.com/package/@source/csk4002)：CSK4002 源码
- [@source/csk4002nc](https://lpm.listenai.com/package/@source/csk4002nc)：CSK4002NC 源码
- [@source/csk3002](https://lpm.listenai.com/package/@source/csk3002)：CSK3002 源码
- [@source/csk3001nn](https://lpm.listenai.com/package/@source/csk3001nn)：CSK3001NN源码


### 项目模板@generator

- [@generator/csk](https://lpm.listenai.com/package/@generator/csk)：CSK开发项目 Framework，包含生成器与相关业务功能
- [@generator/lpm-pkg](https://lpm.listenai.com/package/@generator/lpm-pkg)：LPM包生成器


### 算法模型@algo

- [@algo/csk4002-cae-mlp](https://lpm.listenai.com/package/@algo/csk4002-cae-mlp)：CSK4002 通用 algo
- [@algo/csk3002-cae-mlp](https://lpm.listenai.com/package/@algo/csk3002-cae-mlp)：CSK3002 通用 algo
- [@algo/csk3001nn-cae-mlp](https://lpm.listenai.com/package/@algo/csk3001nn-cae-mlp)：CSK3001 单麦NN降噪模型


### CSK板型模板@board

- [@board/lskits](https://lpm.listenai.com/package/@board/lskits)：LSKits 的板型模板


### 常用工具@tool

- [@tool/cskburn](https://lpm.listenai.com/package/@tool/cskburnp)：CSK 芯片烧录工具
- [@tool/csk-old-build](https://lpm.listenai.com/package/@tool/csk-old-build)：针对 CSK 旧项目，进行 build 的相关操作，可 package lpk
- [@tool/mini-esr-tool](https://lpm.listenai.com/package/@tool/mini-esr-tool)：可把阈值txt转成bin






