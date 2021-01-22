---
id: guides_index
title: CSK项目开发指南
slug: /
---

## 从这里开始

--------------

### [快速入门CSK项目开发](/getting_start)

从0到1完成你的第一个CSK项目。


## 固件基础知识

-------

### [CSK项目基础配置](/guides/firmware/base_config)

完整了解CSK项目的每一个基础配置项，包括麦克风配置、TTS配置、交互配置等。



### [自定义词表与回复语](/vui)

本篇介绍CSK项目的语音交互配置。包含交互模板使用、自定义命令词词条和回复语提示音，也会介绍如何设计合适的命令词词条，并根据词条检测结果对命令词词条进行修改。


### [外围引脚配置](/peripheral_config)

本篇介绍如何根据硬件需求在hardware.toml中配置CSK项目中的引脚，包含uart、i2c、i2s、spi、gpio等接口。



## CSK开发示例

--------

### [SDK使用示例](/csk_sdk_demo)

CSK SDK API的使用示例，包括事件回调、业务接口等，及自定义业务逻辑的方法。





### [硬件驱动使用示例](/csk_driver_demo)


CSK的硬件驱动使用示例，包含UART、PWM、GPIO、I2C等通信接口。




## 进阶知识

---------

### [实验室语音效果测试](/test)

本篇介绍如何通过语音实验室评估语音效果。包含语音实验室搭建，测试用例准备，测试环境布置，自动测试工具使用和测试结果统计。




### [入门调优与自动调优](/auto_optimize)
本篇介绍什么是语音效果调优，如何使用LStudio自动调优与测试。



### [阈值调节技巧](/optimize_skills)

本篇介绍如何对语音效果进行调优。包含测试报告分析，以及常用的调优思路和调优方法。



### [配置application](/application_config)

通过application.toml，你可以迅速适配自己的硬件板型，具体包括：产测配置、业务配置、硬件配置、驱动配置。




### [CSK GDB使用说明](/)


:::note
文档建设中
:::




### [产测开发](/factory_config)

本篇介绍如何在LStudio中配置CSK项目的产测流程。



## 上位机通讯编程

--------

### [音频传输](/audio_transmission)

本篇介绍如何配置使CSK正常录音；如何使CSK输出音频；如何送音频至CSK播放。



### [OTA](/)

:::note
文档建设中
:::




<!-- ## LISA API

--------------

:::note 文档建设中
::: -->

<!-- ### [LISA API简介](/lisa_guide)

:::note 文档建设中
:::

--------

### [LISA API使用指南](http://localhost:3000/lisa_guide)

LISA API使用指南。


--------

### [LISA API代码示例](/lisa_guide)

LISA API代码示例。 -->



## 业务引擎EngineCore

--------

### [快速实现业务逻辑](/guides/EngineCore/getting_started)

本篇通过具体示例介绍如何使用EngineCore快速实现业务逻辑。



### [快速熟悉常用语法](/guides/EngineCore/grammar)

从0到1搭建自己的业务引擎，熟悉LScript常用语法。


## 硬件基础知识

-------------------

### [快速设计CSK硬件](/hardware_guide)

本篇针对CSK产品中结构设计、硬件设计提供设计指南与参考。


## 技术支持

---------------------

### [创建工单获取技术支持](/cloud_project)

本篇介绍如何通过工单系统获取各类技术支持。



## 附录及其他

------------------------------------

[下载 LSKits 参考设计](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)





