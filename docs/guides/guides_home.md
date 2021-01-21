---
id: guides_index
title: CSK项目开发指南
slug: /
---

## 从这里开始

### [快速入门CSK项目开发](/getting_start)


从0到1完成你的第一个CSK项目

`./guides/getting_start`


## 固件基础知识

`./guides/firmware`

### [CSK项目基础配置](/guides/firmware/base_config) @巍巍

完整了解CSK项目的每一个基础配置项，包括麦克风配置、TTS配置、交互配置等。@梓伦

`./guides/firmware/guides/firmware/base_config`

--------

### [自定义词表与回复语](/vui)@囧


本篇介绍CSK项目的语音交互配置。包含交互模板使用、自定义命令词词条和回复语提示音，也会介绍如何设计合适的命令词词条，并根据词条检测结果对命令词词条进行修改。

`./guides/firmware/vui`

--------

### [外围引脚配置](/peripheral_config)@罗梓伦

本篇介绍如何根据硬件需求在hardware.toml中配置CSK项目中的引脚，包含uart、i2c、i2s、spi、gpio等接口。

`./guides/firmware/peripheral_config`

--------


### [拦截语音命令](/guides_index)@钟蔚

本篇介绍CSK项目语音拦截器的使用。包含所有可以使用的语音拦截器指令，以及自定义业务逻辑。

`./guides/firmware/interceptor`

:::caution 未交货
:::

--------


### [芯片通讯协议](/guides_index)@钟蔚



本篇介绍CSK项目和外围芯片的通讯。包含UART、PWM、GPIO、I2C等接口。
`./guides/firmware/io_protocol`

:::caution 未交货
:::


--------

## 进阶知识

`./guides/advanced`


### [实验室语音效果测试](/test) @张喆


本篇介绍如何通过语音实验室评估语音效果。包含语音实验室搭建，测试用例准备，测试环境布置，自动测试工具使用和测试结果统计。
`./guides/advanced/test`

---------

### [入门调优与自动调优](/auto_optimize) @巍巍

本篇介绍什么是语音效果调优，如何使用LStudio自动调优与测试。
`./guides/advanced/auto_optimize`

-----------------

### [阈值调节技巧](/optimize_skills) @巍巍

本篇介绍如何对语音效果进行调优。包含测试报告分析，以及常用的调优思路和调优方法。
`./guides/advanced/optimize_skills`

--------

### [配置application](/application_config) @梓伦

通过application.toml，你可以迅速适配自己的硬件板型，具体包括：产测配置、业务配置、硬件配置、驱动配置。
`./guides/advanced/application_config`

--------


### [芯片业务逻辑debug（施工中）](/guides_index)


:::note 文档建设中
:::

--------


### [产测开发](/factory_config) @梓伦

`./guides/advanced/factory_config`
本篇介绍如何在LStudio中配置CSK项目的产测流程。

--------

## 上位机通讯编程 @星晨 @良艺

### [音频传输](/audio_transmission)

`./guides/msio/audio_transmission`

:::caution 未交货
:::


-------------------

### [OTA](/guides_index)

本篇介绍如何通过上位机为CSK升级固件。

`./guides/msio/ota`

:::caution 未交货
:::

-------------------



## LISA API （建设中）@星晨

:::note 文档建设中
:::

<!-- ### [LISA API简介](/lisa_guide)

:::note 文档建设中
:::

--------

### [LISA API使用指南](http://localhost:3000/lisa_guide)

LISA API使用指南。


--------

### [LISA API代码示例](/lisa_guide)

LISA API代码示例。 -->

--------

## 业务引擎EngineCore @展晖

### [快速实现业务逻辑](/guides/EngineCore/getting_started)

-------

### [快速熟悉常用语法](/guides/EngineCore/grammar)

从0到1搭建自己的业务引擎，熟悉LScript常用语法。

:::caution 未交货
:::

-------------------

### [了解EngineCore API](/lisa_guide)

本篇介绍所有LScript API。

`./guides/engine_core/api/`

:::caution 未交货
:::

-------------------

### [EngineCore编译](/lisa_guide)

本篇介绍EngineCore的编译方式。。

`./guides/engine_core/bulid/`

:::caution 未交货
:::

--------

### [EngineCore debug](/lisa_guide)

本篇介绍如何对EngineCore进行debug。

`./guiides/engine_core/debug/`

:::caution 未交货
:::

-------------------
## 硬件基础知识 @晓溪

### [快速设计CSK硬件](/lisa_guide)

------------------------

### [声学问题排查](/lisa_guide)

-------------------

### [硬件debug](/lisa_guide)

---------------------

### [基础电声调优](/lisa_guide)

---------------------

### [硬件问题排查](/lisa_guide)

----------------------

### [量产保障](/lisa_guide)

---------------------
## 技术支持

### [创建工单获取技术支持](/cloud_project)

本篇介绍如何通过工单系统获取各类技术支持。

------------------------------------

## 附录及其他

[下载LSKits硬件设计源文件](/lisa_guide)

[下载LSKits Bom表](/lisa_guide)





