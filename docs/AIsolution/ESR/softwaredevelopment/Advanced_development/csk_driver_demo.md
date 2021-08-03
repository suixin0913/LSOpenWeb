---
sidebar_label: CSK硬件驱动开发示例
sidebar_position: 2
---

# CSK硬件驱动开发示例

> 本篇介绍CSK的硬件驱动使用示例，包含UART、PWM、GPIO、I2C等通信接口。
> 看完本篇你将了解到：
>
> -  uart串口通信实现指令的接收和发送。


## 1. UART

### 1.1 基本介绍

USART 驱动功能特性如下：

* 支持 UART（Asynchronous）模式，不支持 Synchronous 模式。

* 使用硬件 FIFO。

* 非阻塞数据传输接口，硬件事件通过用户事件回调上报。

* 支持 DMA 传送（参数可配置）。

* 支持 Modem 控制模式，支持 RTS/CTS 流控。（可选）

USART 驱动提供的静态接口实例为：Driver_USART0，Driver_USART1。

### 1.2 使用场景

目标机器需要使用通讯串口与上位机进行通讯。

### 1.3 接口说明
> 串口初始化接口：用于初始化通讯串口，同时会初始化一个串口ringbuffer来存储接收的数据

```js
// csk uart
/**
 * @brief 串口的初始化，同时会初始化一个串口ringbuffer来存储接收的数据
 * @return
 */
void csk_uart_init(void);

```
串口接收接口：用于接收串口数据

```js
/**
 * @brief 从串口ringbuffer里面读取数据
 * @param  dat              接收数据的指针
 * @param  len              要接收的数据长度（单位：byte）
 * @param  ms               超时时间（单位：ms）
 * @return              实际收到的数据长度
 */
int csk_uart_recv(void *dat, int len, int ms);

```
 串口发送接口：用于发送串口数据

```js
/**
 * @brief 通过串口发送数据
 * @param  dat              要发送的数据指针
 * @param  len              要发送的数据长度（单位：byte）
 * @param  ms               超时时间（单位：ms）
 * @return              实际发送的数据长度
 */
int csk_uart_send(void *dat, int len, int ms);

```
### 1.4 硬件配置

**引脚配置**

在硬件配置资源`hardware.lini`中配置通讯串口（uart2）的Pin脚以及功能。

```js
[peripheral]

  [[peripheral.uart]]

  [[peripheral.uart]]

  [[peripheral.uart]]

    [peripheral.uart.txd]
    pin = 4
    mux = 2

    [peripheral.uart.rxd]
    pin = 5
    mux = 2
```


**软件配置**

在应用配置资源`application.lini`中配置通讯串口(uart2)的驱动接口配置。

```js
[driver]

  [driver.uart_ctrl]
  uart = 2
  baudrate = 115200

```


### 1.5 应用实现

**实现通讯串口的初始化和数据接收**

代码清单：
 - app_main.c

构建一个通讯串口的数据接收任务初始化接口：

```js
static void
uart_init(void)
{
	csk_uart_init();
	if (xTaskCreate(uart_task_proc, "uart_task_proc", 2 * 1024, NULL, 13, NULL) != pdPASS) {
		CLOGW("[APP]Failed creating UART task");
	}
}
```

完成通讯串口数据接收任务的实现：

```js
static void
uart_task_proc(void *arg)
{
	uint8_t data[MAX_CUSTOM_UART_BUF_CNT];
	uint16_t size = 0;

	while (true) {
		// 从 UART 读取数据
		memset(&data, 0, sizeof(data));

		size = read_data(&data, sizeof(data), 0);
		// size = read_data(&data, sizeof(data), portMAX_DELAY);

		// 将数据交给 ScriptEngine 处理
		if (size > 0)
			script_handle_uart(data, size);
	}

	vTaskDelete(NULL);
}
```

在用户的应用入口*app_main*中调用**uart_init**进行通讯串口的初始化：

```js
void
app_main(void)
{
	CLOGD("[APP]Hello world");
	csk_handler_register(CSK_EVENT_WAKE_UP, cb_wake_up);
	csk_handler_register(CSK_EVENT_ESR_RECOGNITION, cb_esr_recognition);
	csk_handler_register(CSK_EVENT_ESR_TIMEOUT, cb_esr_timeout);
	csk_handler_register(CSK_EVENT_PLAYER_START, cb_player_start);
	csk_handler_register(CSK_EVENT_PLAYER_FINISH, cb_player_finish);

	// 如使用 UART，解除下面这一行的注释
	uart_init();
```

在识别回调接口中，将回调的数据通过ScriptEngine注册的mruby接口透传用户回调数据：

```js
static void
cb_esr_recognition(keyword_attrs_t *key_attrs)
{
	CLOGD("[APP]ESR Recognition: kid=%d", key_attrs->kid);

	// 如需在 ScriptEngine 中处理指令，解除下面这一行的注释
	script_handle_intent(key_attrs->txt);
}

```

**实现mruby业务**

代码清单：
 - intents.rb <br/>

在ruby代码中进行业务的部署，根据关键字的的意图进行业务实现：

```js
on_intent "打开空调" do
  EngineCore.logger.info "打开空调"
  num = EngineCore.storage.get(:open) || 0
  EngineCore.logger.info("count: #{num}")
  EngineCore.storage.set(:open, num + 1)
  UART.transmit "PWR ON"
end

on_intent "关闭空调" do
  EngineCore.logger.info "关闭空调"
  UART.transmit "PWR OFF"
end

default_intent do |intent|
  EngineCore.logger.info "default_intent: #{intent}"
end

on_uart_parsed do |data|
  EngineCore.logger.info "UART: #{data}"
end

```

### 1.6 测试
通过"**小美小美**"进行语音唤醒，然后呼唤命令词"**打开空调**"。

从通讯串口的接收中可以看到，已经正确接收到了发送的数据"**PWR ON**"。

```js
2021-01-21 21:27:09.379	PWR ON
2021-01-21 21:28:34.295	
2021-01-21 21:28:34.296	
2021-01-21 21:28:35.647	
```
