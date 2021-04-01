---
id: application_config
title: 配置 application.toml
slug: /application_config
---

>通过 `application.toml`，你可以迅速适配自己的硬件板型。本章介绍业务配置、硬件配置、驱动配置的使用。
文件中关于产测的配置，本篇不会说明，请前往[产测开发](/)中查阅。

## 1.退出识别模式

| 字段 | 取值 | 说明 |示例 |
| - | - | - | - |
| `exit_asr` | 命令词ID| 触发退出识别模式的命令词id | `exit_asr = [502]` |


## 2.硬件配置 hw_config

### 2.1 i2s配置

| 字段 | 取值 | 说明 |示例 |
| - | - | - | - |
| `i2s_out_enable` | `true`<br/>`false`| 开启i2s输出<br/>关闭i2s输出 | `i2s_out_enable = true` |
| `i2s_out_chs` | 数组| 只支持4路通道配置，参数为通道编号 | `i2s_out_chs = [1,2,5,6]` |

通道编号含义请看下表

| 通道编号 | 说明 |
| - | - |
| 1 | mic 1 原始音频 |
| 2 | mic 2 原始音频 |
| 3 | ref 1 音频 |
| 4 | ref 2 音频 |
| 5 | mic 1 cae后音频 |
| 6 | mic 2 cae后音频 |
| 7 | 测试音频 |
| 8 | 送云端识别音频 |


### 2.2 usb配置 hw_config.usb_mode

| 字段 | 取值 | 说明 |示例 |
| - | - | - | - |
| `uac_in_enable` | `true`<br/>`false`| 开启uac<br/>关闭uac | `uac_in_enable = false` |
| `custom_enable` | `true`<br/>`false`| 开启usb录音<br/>关闭usb录音 | `custom_enable = true` |

:::note 
`custom_enable` 只有在 `uac_in_enable = false` 时可效
:::


## 3.驱动配置 driver

### 3.1 日志串口配置 driver.uart_logs

| 字段 | 取值 | 说明 |示例 |
| - | - | - | - |
| `uart` | <br/>`0`<br/>`1`<br/>`2`| **选择日志串口端口：**<br/>预留的第1组uart<br/>预留的第2组uart<br/>预留的第3组uart | `uart = 1` |
| `baudrate` | 9600/19200/57600/<br/>115200/345600| 波特率 | `baudrate = 115200` |



### 3.2 通讯串口配置 driver.uart_ctrl

| 字段 | 取值 | 说明 |示例 |
| - | - | - | - |
| `uart` | <br/>`0`<br/>`1`<br/>`2`| **选择通讯串口端口：**<br/>预留的第1组uart<br/>预留的第2组uart<br/>预留的第3组uart | `uart = 1` |
| `baudrate` | 2400/4800/9600/<br/>19200/38400/57600/<br/>115200/345600<br/>**此处配置无效！以基础配置 **<br/>`config/base.csk`** 为准**| 波特率 | `baudrate = 115200` |

### 3.3 声卡配置 driver.codec

| 字段 | 取值 | 说明 |示例 |
| - | - | - | - |
| `i2s` | `0`| i2s端口只有一个，无需修改 | `i2s = 0` |
| `i2c` | `0`<br/>`1`| 选择预留的第1组 i2c 端口<br/>选择预留的第2组 i2c 端口 | `i2c = 1` |
| `adc_type` | 型号| 选择adc硬件型号 | `adc_type = "es7210"` |
| `mic_chs` | `1`<br/>`2`| mic 1对应的adc通道编号<br/>mic 2对应的adc通道编号 | `mic_chs = [1,2]` |
| `adc_gain` | 整型数组<br/>`0-10`<br/>`0-10`<br/>`0-10`<br/>`0-10`| 各路音频增益，数值越大增益越高，0表示关闭<br/>MIC 1增益<br/>MIC 2增益<br/>REF 1增益<br/>REF 2增益 | `adc_gain = [10,10,3,3]` |

:::warning 增益调节注意事项：
1. 需要根据产品实际场景，通过录音分析（可使用Adobe Audition等工具），调整每个通道的增益；
2. 需要保证在设备播放最大音频时，每个通道的录音不会出现截幅问题；
3. 为了保证语音识别效果，在各通道录音不截幅情况下，需要尽量提高每个通道的增益。
:::

### 3.4 红外驱动配置 driver.infrared

| 字段 | 取值 | 说明 |示例 |
| - | - | - | - |
| `pwm` | `0`<br/>`1`| 选择0号pwm端口<br/>选择1号pwm端口 | `pwm = 0` |
| `ch` | 整型`0-3`| pwm=0，ch=1，使用channel1<br/>pwm=0，ch=2，实际channel2<br/>pwm=0，ch=3，实际channel3<br/>pwm=1，ch=0，实际channel4<br/>pwm=1，ch=1，实际channel5 | `ch = 1` |
| `freq` | 整型| 配置红外发射频率，单位为Hz<br/>**此处配置无效！以基础配置 **<br/>`config/base.csk`** 为准** | `freq = 38000` |
| `resend` | 整型| 单条命令连续发送次数，可用于设计重试次数 | `resend = 8` |
| `duty` | 整型| 红外信号pwm占空比 | `duty = 160` |

## 4.其他无法生效的配置

:::tip 以下配置修改无法生效
在CSK项目中，`./config/base.csk` 与 `./config/interact.csk` 的配置优先级高于 `application.toml` 中的相同配置。所以下列 `application.toml` 中的配置修改无法生效。你可以在以下指南页面查看优先级更高的图形化配置：
- [CSK项目基础配置](/guides/firmware/base_config)
- [自定义词表与回复语](/vui)
:::


### 4.1 business

| 字段 | 取值 | 说明 |示例 |
| - | - | - | - |
| `sys_mode` | - public<br/>- private<br/> - custome<br/>| - 聆思公版串口协议<br/>- 私有协议：适用于演示demo或带单工业务场景<br/>- 自定义开发模式：适用于双工业务场景 | `sys_mode = "private"` |
| `welcome` |音频ID数组 | 开机提示音会随机播放数组中的一条音频。 | `welcome = [501,502]` |
| `play_vol` |整数1-10 | 值越大播放音量越大，0表示关闭语音 | `play_vol = 7` |
| `enter_asr` | 唤醒词ID| 配置触发进入识别模式的唤醒词id | `enter_asr = [501]` |
| `exit_asr` | 命令词ID| 触发退出识别模式的命令词id | `exit_asr = [502]` |
| `timeout` | int| 识别超时时间，超时后进入待唤醒状态，单位为秒。 | `timeout = 20` |
| `cmd_send_mode` | 1<br/>2<br/>3|仅串口通讯<br/>仅红外通讯<br/>串口与红外同时通讯| `cmd_send_mode = 1` |

### 4.3 hw_config.mic


| 字段 | 取值 | 说明 |示例 |
| - | - | - | - |
| `type` | `amic`<br/>`dmic`| 使用模拟麦<br/>使用数字麦 | `type = "amic"` |
| `dist` | 35-110| 麦克风距离，单位为mm<br/>小于35mm设为35<br/>大于110mm设为110 | `dist = 35` |












