---

id: csk_online_guides_index
title: CSK 离在线项目开发指南
slug: /CSK_online_guides_home

---

## 从这里开始
-------------

### [离在线语音交互初体验](/CSK_online_guides/getting_start)

本篇介绍 LSKits 离在线模块的配网和使用方法，带你快速体验离在线语音交互。

### [方案整体介绍](/CSK_online_guides/developer_guides)

本篇介绍离在线方案整体架构与工作链路，建议开发前阅读！


## 固件开发（iFLYOS）
---------------

在上手 LSKits 体验离在线功能并初步了解方案架构后，你可以通过阅读下列进阶文档，开始二次开发。

### [制作离在线项目的 CSK 固件](/CSK_online_guides/CSK_online_firmware)

本篇介绍如何在 LStudio 中制作离在线项目的 CSK 固件。

### [创建你的 iFLYOS 设备](/CSK_online_guides/Create_iFLYOS_equipment)

本篇介绍如何在 iFLYOS 平台创建并配置你的设备。若你要对接讯飞 iFLYOS 一站式语音云，请阅读本篇。

### 上位机固件开发

#### [方案一：固件直接对接语音云](/CSK_online_guides/xr872_evs)

聆思已完成 XR872 的上位机离在线（iFLYOS）方案的开发，你可以直接基于源码直接进行二次开发。本篇介绍 XR872 固件的二次开发方法，包括自定义 Client_id、AP 热点前缀、灯光、按键，自定义技能的设备端实现，以及本地 TTS 文件的集成。

#### [方案二：固件通过LISA API对接语音云](/xr872_lisa)

本篇介绍 LISA API 对接方法，包括  Drivers（驱动）、Component（组件）、Log（日志）、OS（系统）、Modules（功能模块）五方面详的对接实现。文中以 XR872 为例，你可以直接基于源码进行上层应用开发，也可以参考对接源码在其他上位机上实现相关功能。

:::tip

当你在一个上位机平台上适配完 LISA API 后，若你想更换芯片平台，仅需在新平台重新适配 LISA API，应用层代码无需改动。

:::


## 进阶知识
---------------

### [OTA 服务](/CSK_online_guides/OTA_service)

本篇介绍如何在 iFLYOS 平台实现上位机与 CSK 固件的 OTA 功能。

### [OTA 协议说明](/serial_protocol)

本篇档描述了 CSK4002 的串口下载方法，通过串口的方式，将用户代码拷贝到 RAM 或者 FLASH 区域，可用于用户方案开发，并开放上位机和下位机代码以及协议解析。

### [自定义技能实现](/CSK_online_guides/Custom_skills)

本篇介绍如何实现 iFLYOS 自定义语音技能，包括在 iFLYOS 技能工作室创建技能，编写意图、语料、后处理，并在固件端实现自定义技能。

### [智能家居服务](https://doc.iflyos.cn/service/iot/#%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85%E6%8E%A7%E5%88%B6%E6%9C%8D%E5%8A%A1%E7%AE%80%E4%BB%8B)

本篇介绍 iFLYOS 的智能家居服务，如果你希望了解 iFLYOS 智能家居技能支持语音控制的设备类型与语音指令；或者你有自己的 IOT 云，想要接入 iFLYOS 智能家居服务，实现语音控制你的 IOT 设备，可以阅读此文档。



## 其他
----------

### 硬件参考设计

- [CSK4002+XR872AT](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK4002%2BES7210%2BXR872%2BBT6956C_%E9%9F%B3%E7%AE%B1%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1C4-18.zip)

