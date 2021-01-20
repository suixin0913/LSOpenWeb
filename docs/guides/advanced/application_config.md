---
id: application_config 
title: 配置application.toml
slug: /application_config
---

**通过application.toml，你可以迅速适配自己的硬件板型。本章介绍业务配置、硬件配置、驱动配置的使用。**<br/>
**application.toml 中关于产测的配置，请在[产测开发](/guides_index)中查阅。**

## 1.业务配置 business

### 1.1 基础配置

**sys_mode**

```toml
sys_mode = "private"
```

:::note 此字段用于配置协议模式：
- private：私有串口协议；适用于演示demo或带单工（只能发不能收）私有串口协议场景;
- custom：自定义开发模式；适用于双工（能发能收）私有串口协议场景;
- public：聆思公版串口协议；目前离在线方案推荐使用该协议。
:::


**配置开机提示音**

```toml
welcome = [501,502]
```

:::note 该配置为数组，随机播放数组中的一条音频。
:::

**配置播音音量**

有效范围：1-10，配置0表示关闭语音。

```toml
play_vol = 7
```


### 1.2 识别配置 business.asr

**配置触发进入识别模式的唤醒词id**

```toml
enter_asr = [
    501
  ]
```

**触发退出识别模式的命令词id**

```toml
exit_asr = [
    502
  ]
```

**设置识别超时时间**

超时后进入待唤醒状态，单位：秒。

```toml
exit_asr = [
    502
  ]
```

**配置通讯方式**

```toml
cmd_send_mode = 1 
```

:::note
- 1:仅串口通讯
- 2:仅红外通讯 
- 3:串口和红外同时通讯
:::

## 2.硬件配置 hw_config

### 2.1 i2s配置

**i2s输出开关**

```toml
i2s_out_enable = true
```

**i2s输出音频通道配置数组**

```toml
i2s_out_chs = [
  1,
  2,
  5,
  6
]

```toml

:::note 只支持4路通道配置。参数为通道编号：
 - 1：mic 1原始音频；
 - 2：mic 2原始音频；
 - 3：ref 1音频；
 - 4：ref 2音频；
 - 5：CAE 1后音频；
 - 6：CAE 2后音频；
 - 7：测试音频；
 - 8：送云端识别音频。
:::

### 2.2 usb配置 hw_config.usb_mode

**usb开关**

```toml
uac_in_enable = false
```

**usb录音功能开关**

```toml
custom_enable = true
```

:::note 只有在 uac_in_enable = false 时可用
:::




### 2.3 麦克风配置 hw_config.mic

**设置麦克风类型**

使用模拟麦填amic；使用数字麦填dmic。

```toml
type = "amic"
```

**设置麦间距**

取值范围35-110，单位：mm。

```toml
dist = 35
```

## 3.驱动配置 driver

### 3.1 日志串口配置 driver.uart_logs

**选择日志串口端口**

有效值：0、1、2，对应芯片预留的3个uart口。

```toml
uart = 1
```

**设置日志串口波特率**

有效取值：9600/19200/57600/115200/345600。

```toml
baudrate = 115200
```



### 3.2 通讯串口配置 driver.uart_ctrl

**选择通讯串口端口**

有效值：0、1、2，对应芯片预留的3个uart端口。

```toml
uart = 1
```

**设置通讯串口波特率**

有效取值：2400/4800/9600/19200/38400/57600/115200/345600。

```toml
baudrate = 115200
```

### 3.3 声卡配置 driver.codec

**端口选择**

i2s端口只有一个，无需修改；i2c端口有效取值为0、1，对应对应芯片预留的2个i2c端口。

```toml
i2s = 0
i2c = 1
```

**选择adc硬件型号**

```toml
adc_type = "es7210"
```

**adc通道增益配置**

```toml
adc_gain = [
      10.0,             
      10.0,             
      3.0,              
      3.0               
    ]
```

:::note 配置规则如下:
- 第一个参数，MIC1增益，有效范围：1-10（数值越大增益越高，0表示关闭）
- 第二个参数，MIC2增益，有效范围：1-10（数值越大增益越高，0表示关闭）
- 第三个参数，REF1增益，有效范围：1-10（数值越大增益越高，0表示关闭）
- 第四个参数，REF2增益，有效范围：1-10（数值越大增益越高，0表示关闭）
:::

:::warning 注意事项：
1. 需要根据产品实际场景，通过录音分析（可使用Adobe Audition等工具），调整每个通道的增益；
2. 需要保证在设备播放最大音频时，每个通道的录音不会出现截幅问题；
3. 为了保证语音识别效果，在各通道录音不截幅情况下，需要尽量提高每个通道的增益。
:::

**麦克风通道配置数组**

最多支持两个参数

```toml
mic_chs = [
      1.0,              
      2.0
    ]
```

:::note 最多支持两个参数:
1. 数组第一个参数代表mic 1对应的adc通道编号；
2. 数组第二个参数代表mic 2对应的adc通道编号。
:::



### 3.4 红外驱动配置 driver.infrared

**配置红外pwm驱动端口号**

有效取值：0、1。

```toml
pwm = 0
```


**配置channel**

有效取值：0、1、2、3、4、5。

```toml
ch = 1
```

:::note channel配置依赖pwm驱动端口配置:
- pwm0支持：channel 0、channel 1、channel 2、channel 3；
- pwm1支持：channel 4、channel 5。
:::

**配置红外发射频率**

单位为Hz。

```toml
freq = 38000
```

**单条命令连续发送次数**

可用于设计重试次数。

```toml
resend = 8
```

**红外信号pwm占空比**

```toml
duty = 160
```







