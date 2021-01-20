---
id: peripheral_config
title: 外围引脚配置
slug: /peripheral_config
---

:::note 本篇介绍如何在hardware.toml完成外围器件的引脚配置。
读完本文后，你将学习到：

- 在开始配置前需要关注哪些问题。

- 在什么地方可以完成配置。

- hardware.toml有哪些引脚配置参数及其含义。

:::

## 1.和硬件工程师沟通需求

在开始外围器件引脚配置工作之前，需要确定硬件工程师已经完成以下工作：

- 完成原理图设计
- 完成PCB设计
- 提供可用于调试的PCBA

此外，你需要和硬件工程师明确引脚配置的相关需求：

- 需要使用到的引脚编号
- 每个引脚对应的功能
- 每个引脚的电平配置

:::note 如何明确引脚功能需求？

1. 硬件工程师会根据芯片Datasheet定义每个引脚需要使用的功能；
2. 软件工程师也需要阅读Datasheet中的功能说明，明确目标引脚的功能编号，用于固件配置。

芯片Datasheet文档请前往 http://open.listenai.com/xxxx 进行下载。

:::


pin脚编号
pin脚功能
pin脚电平需求
硬件原理图
硬件板子

## 2.找到hardware.toml

在创建CSK项目后，你可以在项目中找到用于配置引脚的hardware.toml，具体路径是：

`./config/environment/hardware.toml`

## 3.配置项说明

| 键名 | 键值 | 说明 | 
| - | - | - | 
| tag | name |  pin脚的名字，用户可指定 |
| pin | 1~64 | CSK芯片的引脚，具体参考Datasheet|
| mux | 0~4 | pin 脚的复用功能 |
| dir | true/false | ture：引脚设置为输出<br/>false:引脚设置为输入 |
| def | true/false | ture：当引脚设为输出时，输出的逻辑电平为高<br/>false: 当pin脚设为输出时，输出的逻辑电平为低 |
| rev |  true/false| ture：逻辑电平和物理电平一致<br/>false:逻辑电平和物理电平相反 |


## 4.检查配置差异，修改配置

在明确需求与配置项含义后，就可以核对当前hardware.toml配置与需求的差异。并根据需求调整配置。

