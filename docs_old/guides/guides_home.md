---
id: guides_index
title: CSK项目开发指南
slug: /guides
---

## 从这里开始

--------------

### [快速入门 CSK 项目开发](/getting_start)

本篇介绍如何创建 CSK 项目，并从 0 到 1 制作第一个语音交互固件。


## 固件开发基础知识

-------

### [自定义词表与回复语](/vui)

本篇介绍 CSK 项目的语音交互配置。包含交互模板使用、自定义命令词词条和回复语提示音，也会介绍如何设计合适的命令词词条，并根据词条检测结果对命令词词条进行修改。

### [源码应用配置](/config_application)

完整了解如何配置 CSK 項目中的源码功能，包括交互配置、硬件配置、驱动配置等。

### [芯片引脚功能配置](/config_hardware)

本篇介绍如何根据硬件需求在 hardware.lini 中配置 CSK 项目中的引脚，包含 UART、I2C、I2S、GPIO、PWM 等功能。


### [产测开发](/factory_config)

本篇介绍如何在 LStudio 中配置CSK项目的产测流程。


### [音频传输](/audio_transmission)

本篇介绍如何配置使 CSK 固件正常录音；如何使 CSK 输出音频；如何送音频至 CSK 播放。




## 效果测试与调优

---------

### [实验室语音效果测试](/test)

本篇介绍如何通过语音实验室评估语音效果。包含语音实验室搭建，测试用例准备，测试环境布置，自动测试工具使用和测试结果统计。


### [入门调优与自动调优](/auto_optimize)
本篇介绍什么是语音效果调优，如何使用 LStudio 自动调优与测试。



### [阈值调节技巧](/optimize_skills)

本篇介绍如何对语音效果进行调优。包含测试报告分析，以及常用的调优思路和调优方法。




## 固件开发进阶知识

--------

### [UART 串口通信协议文档](/public_uart_protocol)

本传输协议主要负责UART底层的数据进行可靠性保障，而业务协议主要是对CSK能力进行定义，提供可扩展的API。


### [SDK使用示例](/csk_sdk_demo)

CSK SDK API 的使用示例，包括事件回调、业务接口等，及自定义业务逻辑的方法。



### [硬件驱动使用示例](/csk_driver_demo)


CSK 的硬件驱动使用示例，包含 UART、PWM、GPIO、I2C 等通信接口。


### [CSK 外语资源集成说明](/foreign_resources)

本篇介绍 CSK 外语资源结构与使用方式。



## 业务引擎 EngineCore

--------

### [快速实现业务逻辑](/guides/EngineCore/getting_started)

本篇通过具体示例介绍如何使用 EngineCore 快速实现业务逻辑。



### [快速熟悉常用语法](/guides/EngineCore/grammar)

从0到1搭建自己的业务引擎，熟悉 EngineCore 常用语法。


## 硬件基础知识

-------------------

### [快速设计 CSK 硬件](/hardware_guide)

本篇针对 CSK 产品中结构设计、硬件设计提供设计指南与参考。


## 技术支持

---------------------

### [创建工单获取技术支持](/cloud_project)

本篇介绍如何通过工单系统获取各类技术支持。



## 附录及其他

------------------------------------

- [LSKits硬件使用指导手册.pdf](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%E7%A1%AC%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C.pdf)

- [下载 LSKits 参考设计](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)

- [LSKits BOM.zip](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%20BOM.zip)




