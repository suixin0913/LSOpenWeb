---
id: csk_sdk_demo
title: CSK SDK使用示例
slug: /csk_sdk_demo
---



> 本篇介绍了CSK项目SDK的一些使用示例。
> 看完本篇你将了解到：
>
> 1. SDK文件目录。
> 2. 回调事件的使用示例。
> 3. 业务控制接口的使用示例。
> 4. EngineCore接口的使用示例。

本文档仅作示例说明，具体请查看 [CSK SDK API详细文档](https://open.listenai.com/csksdk_api)

### 1. SDK文件目录说明

- app/csk_callback.h：回调接口头文件
- app/csk_controller.h：控制接口头文件
- app/app_main.c：自定义业务逻辑主函数
- app/scripts/intents.rb：EngineCore业务处理

### 2. 回调事件使用示例

这个示例展示如何注册和使用回调事件，CSK识别命令词后触发的回调事件，开发者可以在识别结果回调获取识别结果并处理自定义逻辑，例如播放提示音。

```C
cb_esr_recognition(keyword_attrs_t *key_attrs)
{
    CLOGD("[APP]ESR Recognition: kid=%d", key_attrs->kid);
    csk_player_stop();
    csk_player_start(2);
}

app_main(void)
{
	CLOGD("[APP]Hello world");
	csk_handler_register(CSK_EVENT_WAKE_UP, cb_wake_up);
    ...
}
```

### 3. 业务控制接口使用示例

#### 3.1 获取播放器状态
```C
csk_player_status_e csk_player_get_status(void);

参数说明：
typedef enum {
    CSK_PLAYER_IDLE,    // 空闲
    CSK_PLAYER_RUNNING, // 正在播音
} csk_player_status_e;
```

#### 3.2 串口接收/发送使用示例
初始化串口
```C
static void
uart_init(void)
{
	csk_uart_init();
	if (xTaskCreate(uart_task_proc, "uart_task_proc", 2 * 1024, NULL, 13, NULL) != pdPASS) {
		CLOGW("[APP]Failed creating UART task");
	}
}

app_main(void)
{
	CLOGD("[APP]Hello world");
	// 如使用 UART，解除下面这一行的注释
	 uart_init();
}
```

创建串口接收任务
```C
static void
uart_task_proc(void *arg)
{
	uint8_t data[MAX_CUSTOM_UART_BUF_CNT];
	uint16_t size = 0;

	while (true) {
		// 从 UART 读取数据
		size = csk_uart_recv(&data, sizeof(data), portMAX_DELAY);
	}

	vTaskDelete(NULL);
}
```

### 4. EngineCore使用示例
[什么是EngineCore？](https://open.listenai.com/guides/EngineCore/getting_started)

#### 4.1 EngineCore接口调用方法
调用脚本引擎EngineCore中的intent方法
```C
void csk_script_handle_intent(char *keyword)
```
使用示例：在app_main.c中调用csk_script_handle_intent方法，将命令词识别结果传到：
```C
cb_esr_recognition(keyword_attrs_t *key_attrs)
{
	CLOGD("[APP]ESR Recognition: kid=%d", key_attrs->kid);

	// 如需在 ScriptEngine 中处理指令，解除下面这一行的注释
	csk_script_handle_intent(key_attrs->txt);
}
```

调用脚本引擎EngineCore中的on_uart方法：
```C
void csk_script_handle_uart(uint8_t *data, uint16_t size)
```
使用示例：在app_main.c中调用csk_script_handle_uart方法，将串口接收数据传到EngineCore中处理。

```C
static void
uart_task_proc(void *arg)
{
	uint8_t data[MAX_CUSTOM_UART_BUF_CNT];
	uint16_t size = 0;

	while (true) {
		// 从 UART 读取数据
		size = csk_uart_recv(&data, sizeof(data), portMAX_DELAY);

		// 将数据交给 ScriptEngine 处理
		csk_script_handle_uart(data, size);
	}

	vTaskDelete(NULL);
}
```
#### 4.2 如何在EngineCore中做业务处理？
文件位置：app/scripts/intents.rb
```ruby
on_intent "打开空调" do
  EngineCore.logger.info "打开空调"
  num = EngineCore.storage.get(:open) || 0
  EngineCore.logger.info("count: #{num}")
  EngineCore.storage.set(:open, num + 1)
  UART.transmit "PWR ON"

  # 点亮 LED20
  # IO.set 42, :low
end

on_intent "关闭空调" do
  EngineCore.logger.info "关闭空调"
  UART.transmit "PWR OFF"

  # 熄灭 LED20
  # IO.set 42, :high
end

default_intent do |intent|
  EngineCore.logger.info "default_intent: #{intent}"
end

on_uart_parsed do |data|
  EngineCore.logger.info "UART: #{data}"
end
```
