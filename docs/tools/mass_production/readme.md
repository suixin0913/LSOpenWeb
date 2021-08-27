---
sidebar_label: 简介
sidebar_position: 1
---


# 简介

聆思提供量产时可用于芯片、模组烧录的烧录器，以及各种辅助小工具。工厂可根据引导自行配置烧录器，实现一拖多芯片烧录或模组烧录，降低成本，提高产能。

## 量产烧录器

### [CSK烧录器](/tools/mass_production/cskburner)

聆思代理商、方案商等合作伙伴可选择在量产贴片前使用该烧录器进行裸芯片烧录，或在量产贴片后使用模组烧录器进行烧录。该烧录器支持烧录CSK3、4系列芯片，可配合烧录机台实现一拖多自动化烧录，也可配合治具实现产线烧录作业。

**获取方式**

- 按照本指引文档配置软硬件：[CSK烧录器](/tools/mass_production/cskburner)。

- 点击以下跳转链接直接购买USB转串口板与芯片烧录座子板

    [USB转串口底板2.1](https://www.aifuwus.com/onstage/cmddetail?product_type=2672)

    [芯片烧录座子板2.1](https://www.aifuwus.com/onstage/cmddetail?product_type=2768)


## 网页辅助小工具

### [烧录包制作工具](/tools/mass_production/WebTools/pack) 
烧录包制作工具能够帮助开发者将非LISA项目的固件（由旧版LStudio打包生成，一般为Zip格式）转换为配合以上烧录器使用的固件包（lpk格式）。


### [烧录包信息打印工具](/tools/mass_production/WebTools/print)  
烧录包信息打印工具能够打印聆思lpk格式固件包的版本信息和分区表，通过比对该信息，工厂与方案商可以确认双方传递的固件包（lpk格式）是否一致。


### [烧录包校验工具](/tools/mass_production/WebTools/verify) 
烧录包校验工具能够将芯片中已烧录的固件与PC端的原始固件做对比，判断是否一致。该工具可用于在芯片烧录时验证首件和尾件。


## 问题支持

如使用量产工具过程中遇到问题，请前往[LSCloud](https://cloud.listenai.com/)提交问题工单。