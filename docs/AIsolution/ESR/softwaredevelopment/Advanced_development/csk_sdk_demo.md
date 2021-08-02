---
sidebar_label: CSK SDK开发示例
sidebar_position: 1
---

# CSK SDK开发示例

> 本篇介绍了CSK项目SDK的一些开发示例，看完本篇你将了解到：
>
> 1. SDK文件目录。
> 2. 回调事件的使用示例。
> 3. 业务控制接口的使用示例。

本文档仅作示例说明，具体请查看： [CSK SDK API详细文档](https://open.listenai.com/csksdk/csk4002/sdk/files.html)

在正式开发前，请在 `application.lini` 配置文件中把**协议模式**选定为**自定义双工协议** `sys_mode = "custom"`


## 1. SDK文件目录说明

- `app/csk_callback.h`回调接口头文件
- `app/csk_controller.h`控制接口头文件
- `app/app_main.c`自定义业务逻辑主函数
- `app/scripts/intents.rb`EngineCore业务处理

## 2. 回调事件使用示例

这个示例展示如何注册和使用回调事件，CSK识别命令词后触发的回调事件，开发者可以在识别结果回调获取识别结果并处理自定义逻辑，例如播放提示音。

```js
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

## 3. 业务控制接口使用示例

### 3.1 获取播放器状态

```js
csk_player_status_e csk_player_get_status(void);

参数说明：
typedef enum {
    CSK_PLAYER_IDLE,    // 空闲
    CSK_PLAYER_RUNNING, // 正在播音
} csk_player_status_e;
```

### 3.2 串口接收/发送使用示例

**初始化串口**

```js
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

**创建串口接收任务**

```js
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