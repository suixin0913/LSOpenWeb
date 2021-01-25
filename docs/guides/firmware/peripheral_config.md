---
id: peripheral_config
title: 外围引脚配置
slug: /peripheral_config
---

>本篇介绍如何在hardware.toml完成外围器件的引脚配置。读完本文后，你将学习到：
- 如何确认引脚配置需求。
- 在什么地方可以完成配置。
- hardware.toml 有哪些引脚配置参数及其含义。


## 1.需求分析与确认

### 1.1 硬件设计之前的需求确认

为了避免硬件设计与芯片功能不匹配，软件工程师**务必要**与硬件工程师先明确清楚**引脚的选用与对应支持的功能**。芯片 Datasheet 是你们沟通需求的重要材料，可前往 http://open.listenai.com/datasheet 进行下载。

### 1.2 硬件设计完成后

**在硬件设计完成后，硬件工程师需向软件工程师交付以下产物：**

1. 原理图
2. PCB设计图
3. 提供可用于调试的PCBA

**基于以上产物，可以进一步分析出以下明确配置需求：**

1. 需要使用到的引脚编号
2. 每个引脚对应的功能
3. 每个引脚的电平配置

在需求明确之后，可以开始在CSK项目中进行外围引脚配置。

## 2.找到 hardware.toml

在创建 CSK 项目后，你可以在项目中找到用于配置引脚的 hardware.toml，具体路径是：

`./config/environment/hardware.toml`

## 3.hardware.toml 字段说明

hardware.toml 中需要用到以下字段：

| 键名 | 键值 | 说明 | 
| - | - | - | 
| tag | name |  pin脚的名字，用户可指定 |
| pin | 1~64 | CSK芯片的引脚，具体参考Datasheet|
| mux | 0~4 | pin 脚的复用功能 |
| dir | true/false | ture：引脚设置为输出<br/>false:引脚设置为输入 |
| def | true/false | ture：当引脚设为输出时，输出的逻辑电平为高<br/>false: 当pin脚设为输出时，输出的逻辑电平为低 |
| rev |  true/false| ture：逻辑电平和物理电平一致<br/>false:逻辑电平和物理电平相反 |


## 4.配置示例

在明确需求与字段含义后，核对当前hardware.toml配置与需求的差异，并根据需求调整配置。

### 4.1 i2c示例

根据硬件需求，模组仅使用一组 `i2c`，选用 `29` 与 `30` 两个引脚。可参照Datasheet的引脚功能：

![](./files/20210121144320.png)

在 hardware.toml 配置 `peripheral.i2c` ：
1. 使用第一组，第二组留空；
2. `peripheral.i2c.scl` 中，`pin`设为 `29` ， `mux` 设为 `2` ；
3. `peripheral.i2c.sda` 中，`pin`设为 `39` ， `mux` 设为 `2` 。

```js
[[peripheral.i2c]]

    [peripheral.i2c.scl]
    pin = 29
    mux = 2

    [peripheral.i2c.sda]
    pin = 30
    mux = 2

[[peripheral.i2c]]
```

### 4.2 uart示例

根据硬件需求，模组仅使用两组 `uart`，选用 `4` 、 `5` 、`55`、`56`4个引脚。

在 hardware.toml 配置 `peripheral.uart` ：
1. 使用第二组，第三组uart；
2. 第2组，`peripheral.uart.txd` 中，`pin`设为 `55` ， `mux` 设为 `2` ；
3. 第2组，`peripheral.uart.rxd` 中，`pin`设为 `56` ， `mux` 设为 `2` ；
4. 第3组，`peripheral.uart.txd` 中，`pin`设为 `4` ， `mux` 设为 `2` ；
5. 第3组，`peripheral.uart.rxd` 中，`pin`设为 `5` ， `mux` 设为 `2` 。


```js
  [[peripheral.uart]]

  [[peripheral.uart]]

    [peripheral.uart.txd]
    pin = 55
    mux = 2

    [peripheral.uart.rxd]
    pin = 56
    mux = 2

  [[peripheral.uart]]

    [peripheral.uart.txd]
    pin = 4
    mux = 2

    [peripheral.uart.rxd]
    pin = 5
    mux = 2
```

### 4.3 i2s示例

根据硬件需求，要用到使用两组 `i2s`，Datasheet对应引脚为 `33`~ `37` 5个引脚。

在 hardware.toml 配置 `peripheral.i2s` ：
1. `peripheral.i2s.mclk`中，`pin`设为 `37` ， `mux` 设为 `1` ；
2. `peripheral.i2s.bclk` 中，`pin`设为 `34` ， `mux` 设为 `1` ；
3. `peripheral.i2s.lrck` 中，`pin`设为 `33` ， `mux` 设为 `1` ；
4. `peripheral.i2s.dout` 中，`pin`设为 `35` ， `mux` 设为 `1` ；
5. `peripheral.i2s.din0` 中，`pin`设为 `36` ， `mux` 设为 `1` 。


```js
[[peripheral.i2s]]

    [peripheral.i2s.mclk]
    pin = 37
    mux = 1

    [peripheral.i2s.bclk]
    pin = 34
    mux = 1

    [peripheral.i2s.lrck]
    pin = 33
    mux = 1

    [peripheral.i2s.dout]
    pin = 35
    mux = 1

    [peripheral.i2s.din0]
    pin = 36
    mux = 1
```

### 4.4 spi示例

<!-- 根据硬件需求，要用到使用两组 `i2s`，Datasheet对应引脚为 `33`~ `37` 5个引脚。

在 hardware.toml 配置 `peripheral.i2s` ：
1. `peripheral.i2s.mclk`中，`pin`设为 `37` ， `mux` 设为 `1` ；
2. `peripheral.i2s.bclk` 中，`pin`设为 `34` ， `mux` 设为 `1` ；
3. `peripheral.i2s.lrck` 中，`pin`设为 `33` ， `mux` 设为 `1` ；
4. `peripheral.i2s.dout` 中，`pin`设为 `35` ， `mux` 设为 `1` ；
5. `peripheral.i2s.din0` 中，`pin`设为 `36` ， `mux` 设为 `1` 。 -->


```js
[[peripheral.spi]]
  [peripheral.spi.sclk]
  pin = 4
  mux = 1
  
  [peripheral.spi.miso]
  pin = 4
  mux = 1
  
  [peripheral.spi.mosi]
  pin = 4
  mux = 1
  
  [peripheral.spi.cs]
  pin = 4
  mux = 1
```

### 4.5 gpio示例

<!-- 根据硬件需求，要用到使用两组 `i2s`，Datasheet对应引脚为 `33`~ `37` 5个引脚。

在 hardware.toml 配置 `peripheral.i2s` ：
1. `peripheral.i2s.mclk`中，`pin`设为 `37` ， `mux` 设为 `1` ；
2. `peripheral.i2s.bclk` 中，`pin`设为 `34` ， `mux` 设为 `1` ；
3. `peripheral.i2s.lrck` 中，`pin`设为 `33` ， `mux` 设为 `1` ；
4. `peripheral.i2s.dout` 中，`pin`设为 `35` ， `mux` 设为 `1` ；
5. `peripheral.i2s.din0` 中，`pin`设为 `36` ， `mux` 设为 `1` 。 -->


```js
[[peripheral.gpio]]
  tag = "rdy"
  pin = 13
  mux = 0
  dir = true
  def = false
  rev = true

[[peripheral.gpio]]
  tag = "amp"
  pin = 14
  mux = 0
  dir = true
  def = true
  rev = true
```

