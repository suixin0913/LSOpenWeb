---
sidebar_label: 外围引脚配置
sidebar_position: 3
---


# 外围引脚配置

>本篇介绍如何在 hardware.lini 完成外围器件的引脚配置。读完本文后，你将学习到：
- 如何确认引脚配置需求。
- 在什么地方可以完成配置。
- hardware.lini 有哪些引脚配置参数及其含义。

<!-- 可以参考星宇这个整理的材料
https://www.tapd.cn/65128374/prong/stories/view/1165128374001011213 -->


## 1.设计规则与需求确认

### 1.1 Datasheet 与引脚列表

为了避免硬件设计与芯片功能不匹配，软件工程师**务必要**与硬件工程师先明确清楚**引脚的选用与对应支持的功能**。芯片 Datasheet 是你们沟通需求的重要材料，可前往 http://open.listenai.com/chips 进行下载。

**引脚列表**

| PIN | MUX0     | MUX1        | MUX2       | MUX3         | MUX4   |
| --- | -------- | ----------- | ---------- | ------------ | ------ |
| 1   | VCC_RTC  |             |            |              |        |
| 2   | VOUT_11  |             |            |              |        |
| 3   | VDD_CORE |             |            |              |        |
| 4   | USBDP    | I2C2_SCL    | TXD2       | PWM_CH0      |        |
| 5   | USBDM    | I2C2_SDA    | RXD2       | PWM_CH1      |        |
| ~~6~~ | ~~PA0~~ | ~~I2S_DIN1~~ | ~~PWM_CH2~~ | ~~QSPI_CS~~ |        |
| ~~7~~ | ~~PA1~~ | ~~I2S_DOUT1~~ | ~~PWM_CH3~~ | ~~QSPI_IO1~~ |        |
| ~~8~~ | ~~PA2~~ | ~~I2S_DOUT2~~ | ~~PWM_CH4~~ | ~~QSPI_IO2~~ |        |
| 9   | XOUT     | TXD0        | PC0        | RXD0         |        |
| 10  | XIN      | RXD0        | PC1        |              |        |
| 11  | PA3      | I2S_DOUT3   | PWM_CH5    |              |        |
| 12  | PA4      | PWM_CH0     | SPI2_CLK   | SDIO_CLK     |        |
| 13  | PA5      | PWM_CH1     | SPI2_CS    | SDIO_IO1     |        |
| 14  | PA6      | PWM_CH2     | SPI2_MISO  | SDIO_IO0     |        |
| 15  | PA7      | PWM_CH3     | SPI2_MOSI  | SDIO_CMD     |        |
| 16  | VCC      |             |            |              |        |
| 17  | PA8      | SDIO_CLK    | I2S_DIN1   | SPI2_CLK     |        |
| 18  | PA9      | SDIO_CMD    | I2S_DOUT1  | SPI2_CS      |        |
| 19  | PA10     | SDIO_IO0    | RXD2       | SPI2_MISO    |        |
| 20  | PA11     | RXD1        | I2S_MCLK   | SPI2_MOSI    |        |
| 21  | VDD_CORE |             |            |              |        |
| 22  | PA12     | QSPI_D0     | PWM_CH3    | SPI3_MOSI    |        |
| 23  | PA13     | QSPI_DCLK   | PWM_CH4    | SPI3_CLK     |        |
| 24  | PA14     | QSPI_D3     | PWM_CH5    | SPI3_CS      |        |
| 25  | PA15     | QSPI_D2     | SDIO_IO1   | SPI3_MISO    |        |
| 26  | PA16     | QSPI_D1     | SDIO_IO2   | I2C2_SDA     |        |
| 27  | PA17     | QSPI_CS     | SDIO_IO3   | I2C2_SCL     |        |
| 28  | VCC      |             |            |              |        |
| 29  | PA18     | PWM_CH0     | I2C2_SCL   | SDIO_IO3     |        |
| 30  | PA19     | PWM_CH1     | I2C2_SDA   | SDIO_IO2     |        |
| 31  | PA20     | I2C1_SCL    | PWM_CH0    | I2S_DATAIN1  |        |
| 32  | PA21     | I2C1_SDA    | PWM_CH1    | I2S_DATAOUT1 |        |
| 33  | PA22     | I2S_FCLK    | PWM_CH2    | SPI3_CLK     |        |
| 34  | PA23     | I2S_BCLK    | PWM_CH3    | SPI3_CS      |        |
| 35  | PA24     | I2S_DOUT0   | PWM_CH4    | SPI3_MISO    |        |
| 36  | PA25     | I2S_DIN0    | PWM_CH5    | SPI3_MOSI    |        |
| 37  | PA26     | I2S_MCLK    | I2S_DIN1   | I2C2_SCL     |        |
| 38  | PA27     | TXD1        | PWM_CH5    | I2C2_SDA     |        |
| ~~39~~  | ~~PA28~~ | ~~RXD2~~ | ~~PWM_CH4~~ | ~~QSPI_IO0~~ |        |
| ~~40~~  | ~~PA29~~ | ~~SDIO_IO3~~ | ~~PWM_CH3~~ | ~~QSPI_CLK~~ |        |
| ~~41~~  | ~~PA30~~ | ~~SDIO_IO2~~ | ~~PWM_CH2~~ | ~~QSPI_IO3~~ |        |
| 42  | PA31     | SDIO_IO1    | RXD2       | SPI3_CS      |        |
| 43  | PB0      | SDIO_IO0    | I2S_DOUT2  | SPI3_MISO    |        |
| 44  | PB1      | SDIO_CLK    | I2S_DOUT1  | SPI3_CLK     |        |
| 45  | PB2      | SDIO_CMD    | I2S_DIN1   | SPI3_MOSI    |        |
| 46  | SWCLK    | PB3         | PWM_CH0    | CTS1         |        |
| 47  | SWDIO    | PB4         | PWM_CH1    | RXD2         |        |
| 48  | VDD_CORE |             |            |              |        |
| 49  | PB5      | CLASSD0_P   | PWM_CH2    | CTS1         |        |
| 50  | PB6      | CLASSD0_M   | PWM_CH3    | RXD2         |        |
| 51  | VCC      |             |            |              |        |
| 52  | PB7      | CLASSD1_M   | PWM_CH4    | CTS1         |        |
| 53  | PB8      | CLASSD1_P   | PWM_CH5    | RXD2         |        |
| 54  | PB9      | DMIC_D3     | TXD2       | PWM_CH0      | TOUCH5 |
| 55  | PB10     | DMIC_D2     | TXD1       | PWM_CH1      | TOUCH4 |
| 56  | PB11     | DMIC_D1     | RXD1       | PWM_CH2      | TOUCH3 |
| 57  | PB12     | DMIC_D3     | RTS1       | PWM_CH3      | TOUCH2 |
| 58  | PB13     | DMIC_D1     | PWM_CH0    | I2C2_SCL     | TOUCH1 |
| 59  | PB14     | DMIC_D2     | PWM_CH1    | I2C2_SDA     | TOUCH0 |
| 60  | PB15     | TXD2        | RXD2       |              |        |
| 61  | PB16     | RXD0        | DMIC_CLK   | DMIC_CLK     |        |
| 62  | PB17     | TXD0        | DMIC_DATA0 | DMIC_DATA0   |        |
| 63  | VDD_DDR  |             |            |              |        |
| 64  | VDD_FUSE | RESET(PB18) |            |              |        |
| 65  | GND_PAD  |             |            |              |        |

### 1.2 设计规则

1. 通常 **MUX0** 列表示为 PA$  或 PB$ 的 PIN 都可以给用户自由配置,但有若干例外：

    * PIN 49/50 (PB5/PB6) 用来接喇叭，且只有它能接喇叭，所以通常不会用来做别的用途
    * PIN 6/7/8/39/40/41 **不可用**
    * PIN 12 (PA4) 的 PWM 功能**不可用**
    * **约定使用** PIN 12 (PA4) 作为唤醒电平输出 (WAKEUP)、PIN 14 (PA6) 作为功放使能输出 (PA_EN)，通常不会将这两个脚改成其它用途


2. 对于上面所说的每一个可自由配置的 PIN，都可以将它配置为 MUX0 ~ MUX4 中的任一功能。但反过来，一个功能只能由一个 PIN 实现（互斥，比如不可以同时把两个 PIN 都配置为 TXD2）

3. 上表中的 PA$ 和 PB$（通常是 MUX0，有例外）表示作为普通 GPIO 使用；其余 TXD$、I2C$、PWM$ 等表示作为这些特定协议的引脚使用（下面详细解释）

4. 对于作为普通 GPIO 使用时，有如下参数：
    * `dir` 表示方向，为 `true` 表示输出；为 `false` 表示输入
    * `def` 表示默认值，为 `true` 表示默认高电平；为 `false` 表示默认低电平
    * `rev` 表示电平和值的对应关系；为 `false` 表示低电平有效（即写入 `1` 输出低电平，或输入低电平时读出 `1`，反之亦然）；反之亦然

5. 对于作为特定协议的引脚使用时，有如下规则：
    * 通常使用 PB17/PB10/PA27/PB9/PB15 中的任意一个作为调试日志输出的 TXD 使用
    * 对于模拟麦克风，通常需要分配一组 I2C 和 I2S 给 ADC 芯片使用
    * 如果需要使用一组串口 TXD/RXD 对接上位机在选择串口的PIN硬件资源时，**不建议**使用 PIN 4/5，因为只有 PIN 4/5支持 USBDP/USBDM，如果使用PIN 4/5作为串口功能，这样就**无法使用** USB 录制调试用的音频

:::warning 务必考虑 USB 录制调试音频的需求
使用 usb 进行音频调试是 CSK 项目常用的调试手段。uart 与 usb 的引脚需求冲突很容易被忽视并阻碍项目推进。
:::
   

<!-- **在硬件设计完成后，硬件工程师需向软件工程师交付以下产物：**

1. 原理图
2. PCB设计图
3. 提供可用于调试的 PCBA

**基于以上产物，可以进一步分析出以下明确配置需求：**

1. 需要使用到的引脚编号
2. 每个引脚对应的功能
3. 每个引脚的电平配置

在需求明确之后，可以开始在 CSK 项目中进行外围引脚配置。 -->

## 2.找到 hardware.lini

在创建 CSK 项目后，你可以在项目中找到用于配置引脚的 hardware.lini，具体路径是：

`./config/environment/hardware.lini`

## 3.lini 语法简介

CSK项目中使用 hardware.lini 实现引脚配置，结合实际使用情况，下面提供一组简单示例对比 json 与 toml 关于表/数组表的语法。

**json 示例**

```json
{
    "d":{
        "x": 1,
        "y": 2
    },
    "e":[
        {                  },
        { "x":"a", "y":"b" },
        { "x":"c", "y":"d" }
    ]
}
```

**toml 示例**
```js
[d]
x = 1
y = 2

[[e]]

[[e]]
x = "a"
y = "b"

[[e]]
x = "c"
y = "d"

```
> 拓展阅读：[TOML 完整规范](https://toml.io/cn/v1.0.0)

## 3.hardware.lini 字段说明

hardware.lini 中需要用到以下字段：

| 键名 | 键值 | 说明 | 
| - | - | - | 
| tag | name |  pin脚的名字，用户可指定 |
| pin | 1~64 | CSK芯片的引脚|
| mux | 0~4 | pin 脚的复用功能 |
| dir | true/false | ture：引脚设置为输出<br/>false:引脚设置为输入 |
| def | true/false | ture：当引脚设为输出时，输出的逻辑电平为高<br/>false: 当pin脚设为输出时，输出的逻辑电平为低 |
| rev | true/false| ture：逻辑电平和物理电平一致<br/>false:逻辑电平和物理电平相反 |


## 4.配置示例

在明确需求与字段含义后，核对当前 hardware.lini 配置与需求的差异，并根据需求调整配置。

### 4.1 I2C 示例

根据硬件需求，仅使用第二组 `i2c`，对应 `29` 与 `30` 两个引脚（可参照 Datasheet 的引脚功能）：

![](./files/20210121144320.png)

在 hardware.lini 配置 `peripheral.i2c` ：
1. 第一组留空，使用第二组；
2. `peripheral.i2c.scl` 中，`pin`设为 `29` ， `mux` 设为 `2` ；
3. `peripheral.i2c.sda` 中，`pin`设为 `39` ， `mux` 设为 `2` 。

```js
[[peripheral.i2c]]

[[peripheral.i2c]]
  [peripheral.i2c.scl]
    pin = 29
    mux = 2

  [peripheral.i2c.sda]
    pin = 30
    mux = 2
```

### 4.2 UART 示例

根据硬件需求，模组仅使用第二第三组 `uart`，第二组`uart`可用`55`、`56`2个引脚，第三组`uart`可用`4` 、 `5`2个引脚。

在 hardware.lini 配置 `peripheral.uart` ：
1. 第一组留空，使用第二组，第三组uart；
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

### 4.3 I2S 示例

根据硬件需求，要用到使用两组 `i2s`，Datasheet对应引脚为 `33`~ `37` 5个引脚。

在 hardware.lini 配置 `peripheral.i2s` ：
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

<!-- ### 4.4 spi示例

根据硬件需求，要用到使用两组 `i2s`，Datasheet对应引脚为 `33`~ `37` 5个引脚。

在 hardware.lini 配置 `peripheral.i2s` ：
1. `peripheral.i2s.mclk`中，`pin`设为 `37` ， `mux` 设为 `1` ；
2. `peripheral.i2s.bclk` 中，`pin`设为 `34` ， `mux` 设为 `1` ；
3. `peripheral.i2s.lrck` 中，`pin`设为 `33` ， `mux` 设为 `1` ；
4. `peripheral.i2s.dout` 中，`pin`设为 `35` ， `mux` 设为 `1` ；
5. `peripheral.i2s.din0` 中，`pin`设为 `36` ， `mux` 设为 `1` 。


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
``` -->

### 4.5 GPIO 示例

<!-- 根据硬件需求，要用到使用两组 `i2s`，Datasheet对应引脚为 `33`~ `37` 5个引脚。

在 hardware.lini 配置 `peripheral.i2s` ：
1. `peripheral.i2s.mclk`中，`pin`设为 `37` ， `mux` 设为 `1` ；
2. `peripheral.i2s.bclk` 中，`pin`设为 `34` ， `mux` 设为 `1` ；
3. `peripheral.i2s.lrck` 中，`pin`设为 `33` ， `mux` 设为 `1` ；
4. `peripheral.i2s.dout` 中，`pin`设为 `35` ， `mux` 设为 `1` ；
5. `peripheral.i2s.din0` 中，`pin`设为 `36` ， `mux` 设为 `1` 。 -->

**系统就绪的io输出引脚配置**

```js
[[peripheral.gpio]]
  tag = "rdy"
  pin = 13
  mux = 0
  dir = true
  def = false
  rev = true
```

**PA的使能引脚配置**

```js
[[peripheral.gpio]]
  tag = "amp"
  pin = 14
  mux = 0
  dir = true
  def = true
  rev = true
```
