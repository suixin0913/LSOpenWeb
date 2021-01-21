---
id: advanced_factory_config 
title: 产测配置
slug: /factory_config
---

## 1.说明

CSK4002 产测模式可以对 CSK4002 核心模组进行基本硬件检测。产测代码和正常代码集成在一个固件里面，CSK4002 芯片上电后通过判断产测触发引脚的状态来决定进入产测或正常运行。

:::note CSK300X 产测功能正在开发中。
:::

## 2.产测项

 CSK芯片检测为音频检测，包括以下两条通路：

 1. 录音通路：MIC 音频经过 ADC 到 CSK 芯片的音频通路 
 2. 播音通路：CSK 芯片通过 SPK 播放音频的通路 硬件连通性检测：包含 GPIO 的连通性检测。

## 3.产测配置 

产测涉及的芯片硬件引脚，如产测触发引脚、音频检测结果输出引脚和其他 GPIO 引脚都可以通过 软件进行可配置。hardware.toml 和 private.toml 两个 toml 文件控制着产测模式的引脚配置。

### 3.1 hardware.toml

hardware.toml 文件的"factory_gpio"字段就是产测引脚的硬件配置，包含下表 3 个字段:

| 引脚分类 | 说明 |
| - | - |
| check_enter | 通过此引脚来决定是否进入产测模式；只能配 1 个引脚，只能为输入 |
| check_record | 用来输出音频检测结果（依次为 MIC1,MIC2,REF 信号检测结果）；只能配 3 个引 脚，只能为输出 |
| check_gpios | 用来检测 GPIO 的硬件连通性，CSK 控制这些引脚的电平，最多可配置 10 个引脚， 只能为输出 |

下面是其中引脚的字段的说明

| 键名 | 键值 | 说明 | 
| ----- | - | - | 
| tag | name |  pin脚的名字，用户可指定 |
| pin | 1~64 | CSK芯片的引脚，具体参考Datasheet|
| mux | 0~4 | pin 脚的复用功能 |
| dir | true/false | ture：引脚设置为输出<br/>false:引脚设置为输入 |
| def | true/false | ture：当引脚设为输出时，输出的逻辑电平为高<br/>false: 当pin脚设为输出时，输出的逻辑电平为低 |
| rev |  true/false| ture：逻辑电平和物理电平一致<br/>false:逻辑电平和物理电平相反 |

hardware.toml 的"factory_gpio"字段示例如下：

```js
[factory_gpio]

  # 通过此引脚来决定是否进入产测模式；
  # 只能配1个引脚；
  # 只能为输入dir = false
  [factory_gpio.check_enter]
  tag = "enter"
  pin = 12
  mux = 0
  dir = false

  # 用来输出音频检测结果（依次为 MIC1,MIC2,REF 信号检测结果）；只能配3个引脚，只能为输出（dir = true）。
  [[factory_gpio.check_record]]
  tag = "record0"
  pin = 31
  mux = 0
  dir = true
  def = true
  rev = true

  [[factory_gpio.check_record]]
  tag = "record1"
  pin = 32
  mux = 0
  dir = true
  def = true
  rev = true

  [[factory_gpio.check_record]]
  tag = "record2"
  pin = 57
  mux = 0
  dir = true
  def = true
  rev = true

  # 用来检测 GPIO 的硬件连通性，CSK 控制这些引脚的电平，最多可配置10个引脚，只能为输出（dir = true）。
  [[factory_gpio.check_gpios]]
  tag = "gpio0"
  pin = 22
  mux = 0
  dir = true
  def = true
  rev = true

  [[factory_gpio.check_gpios]]
  tag = "gpio1"
  pin = 23
  mux = 0
  dir = true
  def = true
  rev = true

  [[factory_gpio.check_gpios]]
  tag = "gpio2"
  pin = 24
  mux = 0
  dir = true
  def = true
  rev = true

  [[factory_gpio.check_gpios]]
  tag = "gpio3"
  pin = 26
  mux = 0
  dir = true
  def = true
  rev = true

  [[factory_gpio.check_gpios]]
  tag = "gpio4"
  pin = 35
  mux = 0
  dir = true
  def = true
  rev = true

  [[factory_gpio.check_gpios]]
  tag = "gpio5"
  pin = 55
  mux = 0
  dir = true
  def = true
  rev = true

  [[factory_gpio.check_gpios]]
  tag = "gpio6"
  pin = 56
  mux = 0
  dir = true
  def = true
  rev = true

  [[factory_gpio.check_gpios]]
  tag = "gpio7"
  pin = 59
  mux = 0
  dir = true
  def = true
  rev = true

  [[factory_gpio.check_gpios]]
  tag = "gpio8"
  pin = 62
  mux = 0
  dir = true
  def = true
  rev = true
```

### 3.2 private.toml

private.toml 的"factory"字段涉及到产测引脚的配置，如下图：

```js
#产测配置
[factory]

# 开关，决定是否进入产测模式。
enable = false

# 检查进入产测模式的触发电平条件，false：低电平；true：高电平。
check_enter_level = false

# 预留配置，暂未使用。检测进入产测模式触发电平的延迟时间。
check_gpios_delay = 2
```

## 4.产测流程 
1. 上电检测产测触发引脚（"check_enter"）为特定电平，就进入产测模式 
2. 产测代码自动通过 SPK 播放音频，同时通过 2 个 MIC 进行录音 
3. 如果 MIC1 录音检测通过，则相应引脚设置为逻辑高，否则为逻辑低 
4. 如果 MIC2 录音检测通过，则相应引脚设置为逻辑高，否则为逻辑低 
5. 如果回采信号检测通过，则相应引脚设置为逻辑高，否则为逻辑低 
6. 音频检测完成后，设置（"check_gpios"）相关引脚为逻辑高