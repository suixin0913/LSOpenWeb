---
id: guides_index
title: CSK项目开发指南
slug: /guides_index
---

## 从这里开始
### [快速入门CSK项目开发@梓伦 @钟蔚](http://localhost:3000/getting_start)


通过简要清晰的示例，体验从软件安装配置到固件烧录的所有流程。@梓伦 @钟蔚

`./guiides/getting-start`
=======


--------

## 固件基础知识

### [CSK项目基础配置@张喆](/lisa_guide)

完整了解CSK项目的每一个基础配置项，包括麦克风配置、TTS配置、交互配置等。@梓伦

`./guiides/firmware/base-config`

--------

### [自定义词表与回复语@囧](/lisa_guide)


了解如何在CSK项目中自定义词表和回复语，介绍聆思提供的交互模板。



`./guiides/firmware/vui`

--------



了解如何根据硬件设计修改固件中的硬件配置。

`./guiides/firmware/hardware-config`

--------


### [拦截语音命令@钟蔚](/lisa_guide)

拦截器可以拦截业务流程中产生的语音指令，随后可自定义你的业务逻辑。

拦截器....C和Mruby都介绍下 @钟蔚
`./guiides/firmware/Interceptor`

--------


### [芯片通讯协议@钟蔚](www)



了解CSK芯片如何和其他芯片通讯，支持UART、PWM、GPIO、I2C等接口交互
`./guiides/firmware/io_protocol`


--------

## 进阶知识

### [实验室语音效果测试](/lisa_guide) @张喆


使用LStudio配置的语音效果测试流程，支持实验室现场完成测试任务。
`./guiides/advanced/test_config`

完整了解怎么评估语音效果和交互体验。


### [离线测试](/lisa_guide) @巍巍

了解如何使用LStudio自动进行语音效果测试，以更快速的方式获取测试报告。
`./guiides/advanced/test_config`

介绍如何使用LStudio完成语音交互效果测试。


-----------------


### [效果调优@晓庆 @思宇](/lisa_guide) 

了解如何分析测试报告，并对语音交互效果进行调优。
`./guiides/advanced/optimize`

--------


### [芯片业务逻辑debug（施工中）](/lisa_guide)


了解如何使用LStudio debug芯片业务逻辑。

--------


### [产测开发@佳楠](/lisa_guide) 

`./guiides/advanced/factory_config`
了解如果配置CSK项目的产测流程。

--------

## 上位机通讯编程 @星晨



### [音频传输](/lisa_guide)


了解如何把算法处理后的音频传输给上位机。

`./guiides/msio/audio`

-------------------

### [OTA](/lisa_guide)

了解如何通过上位机为CSK升级固件。

`./guiides/msio/ota`

-------------------

### [DSP模式（Android或特定设备）](/lisa_guide)

了解如何把CSK芯片作为单纯的DSP来进行声学降噪，并把降噪后音频输出给上位机。

`./guiides/msio/dsp`



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

通过具体示例熟悉LScript常用语法，在业务实现中你会喜欢上它。

`./guiides/LScript/grammar/`

-------------------

### [了解LScript API](/lisa_guide)

全面了解LScript API，通过LScript API来设计你自己的业务吧。

`./guiides/LScript/API/`

-------------------

### [LScript 编译](/lisa_guide)

写完代码，快点编译你的业务引擎吧。

`./guiides/LScript/bulid/`

--------

### [LScript debug](/lisa_guide)

有bug？了解一下如何对LScript进行debug。

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