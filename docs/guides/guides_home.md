---
id: guides_index
title: CSK项目开发指南
slug: /guides_index
---

## 从这里开始

### [快速入门CSK项目开发@梓伦 @钟蔚](http://localhost:3000/getting_start)


从0到1完成你的第一个CSK项目。@梓伦 @钟蔚

`./guides/getting-start`


--------

## 固件基础知识

### [CSK项目基础配置@张喆](/lisa_guide)

完整了解CSK项目的每一个基础配置项，包括麦克风配置、TTS配置、交互配置等。@梓伦

`./guides/firmware/base-config`

--------

### [自定义词表与回复语@囧](/lisa_guide)


本篇介绍CSK项目的语音交互配置。包含交互模板使用、自定义命令词词条和回复语提示音，也会介绍如何设计合适的命令词词条，并根据词条检测结果对命令词词条进行修改。



`./guides/firmware/vui`

--------

### [修改硬件配置](/lisa_guide)

本篇介绍如何根据硬件设计配置CSK项目中的引脚，主要包含UART、I2S等接口。

`./guides/firmware/hardware-config`

--------


### [拦截语音命令@钟蔚](/lisa_guide)

本篇介绍CSK项目语音拦截器的使用。包含所有可以使用的语音拦截器指令，以及自定义业务逻辑。

`./guides/firmware/Interceptor`

--------


### [芯片通讯协议@钟蔚](www)



本篇介绍CSK项目和外围芯片的通讯。包含UART、PWM、GPIO、I2C等接口。
`./guides/firmware/io_protocol`


--------

## 进阶知识

### [实验室语音效果测试](/lisa_guide) @张喆


本篇介绍如何通过语音实验室评估语音效果。包含语音实验室搭建，测试用例准备，测试环境布置，自动测试工具使用和测试结果统计。
`./guides/advanced/test`

---------


### [效果调优@晓庆 @思宇](/lisa_guide) 

本篇介绍如何对语音效果进行调优。包含测试报告分析，以及常用的调优思路和调优方法。
`./guides/advanced/optimize`

--------


### [自动调优](/lisa_guide) @巍巍

本篇介绍如何如何通过LStudio，在不使用实验室的情况下进行自动调优和测试。
`./guides/advanced/auto-test`



-----------------

### [芯片业务逻辑debug（施工中）](/lisa_guide)


::: tip 提示
文档建设中
:::

--------


### [产测开发@佳楠](/lisa_guide) 

`./guides/advanced/factory_config`
本篇介绍如何在LStudio中配置CSK项目的产测流程。

--------

## 上位机通讯编程 @星晨



### [音频传输](/lisa_guide)


本篇介绍CSK芯片和上位机之间的音频传输。包含通过I2S/UAC输出算法处理后的音频，及接收上位机传输的音频。

`./guides/msio/audio`

-------------------

### [OTA](/lisa_guide)

本篇介绍如何通过上位机为CSK升级固件。

`./guides/msio/ota`

-------------------

### [DSP模式（Android或特定设备）](/lisa_guide)

本篇介绍如何把CSK芯片作为单纯的DSP来进行声学降噪，并把降噪后音频输出给上位机。

`./guides/msio/dsp`



--------

## LISA API （建设中）@星晨

### [LISA API简介](/lisa_guide)

LISA API简介

--------

### [LISA API使用指南](http://localhost:3000/lisa_guide)

LISA API使用指南。


--------

### [LISA API代码示例](/lisa_guide)

LISA API代码示例。

--------

## 业务引擎LScript @钟蔚

### [快速熟悉常用语法](/lisa_guide)

从0到1搭建自己的业务引擎，熟悉LScript常用语法。

`./guides/LScript/grammar/`

-------------------

### [了解LScript API](/lisa_guide)

本篇介绍所有LScript API。

`./guides/LScript/API/`

-------------------

### [LScript 编译](/lisa_guide)

本篇介绍LScript的编译方式。。

`./guides/LScript/bulid/`

--------

### [LScript debug](/lisa_guide)

本篇介绍如何对LScript进行debug。

`./guiides/LScript/debug/`

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

## 附录及其他

[下载LSKits硬件设计源文件](/lisa_guide)

[下载LSKits Bom表](/lisa_guide)

--------
## 支持 @梓伦

## 反馈与建议

描述