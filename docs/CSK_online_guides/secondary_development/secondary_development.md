---

id: secondary_development
title: 上位机固件二次开发
slug: /CSK_online_guides/secondary_development

---

> 本文主要介绍离在线方案运行逻辑，帮助开发者快速理解方案架构。阅读本文后，你将了解到：
>
> 1.如何在上位机固件中修改 Client_id、OTA_SECRET、AP热点前缀、按键、灯光、本地TTS；
>
> 2.如何在固件端实现自定义技能；
>
> 3.如何在完成二次开发后进行验证。

:::important

需要注意的是，本文档只针对云端接入 iFLYOS 的产品，若开发者对接其他的云端操作系统，该文档并不适用。

:::



### 1.更换 Client_id 、OTA_SECRET

修改方式：更改源码目录下 **bk7251_sdk_relase/applications/lisa/lisa_app/lisa_evs/evs_opts.h**  中 `Client_id`、`OTA_SECRET` 的宏定义。



### 2.修改热点前缀

在修改热点前缀之前，请先了解[ AP 配网流程](https://doc.iflyos.cn/device/network/ap.html#ap-%E9%85%8D%E7%BD%91)。

若你希望自定义热点前缀名，可按照如下步骤操作：

第一步，在 iFLYOS 平台的【设备能力】-【热点配网】-【 Wi-Fi 】热点前缀处修改，在此处修改并保存后，小飞在线 APP 端将实时生效。配网时，APP 端将根据你在 iFLYOS 平台设置的前缀寻找热点并连接。

![](./files/AP_CONECCT.png)

第二步，在固件代码中修改前缀 ，位于 **evs_netconfig.c**，如下。修改完成并烧录固件后，设备进入配网模式，广播时的热点前缀将变为自定义前缀。

```c
void
evs_net_config_begin(evs_net_config_t *handle)
{
	handle->m_is_config = true;
	handle->m_wifi_connect = false;
	handle->m_client->m_is_configing = true;
	handle->m_link_ssid[0] = '\0';
	handle->m_link_pwd[0] = '\0';
	handle->m_link_usr_code[0] = '\0';
	handle->m_refresh_token[0] = '\0';
    // 前缀修改
	char ap_name[7] = "LA_";
	char device_id[65];
	strcpy(device_id, evs_client_get_deviceid());
	int pos = strlen(device_id) - 3;
	strncpy(ap_name + 3, device_id + pos, 3);
	ap_name[6] = '\0';
    // 修改前缀示例
    // char ap_name[9] = "LISA_";
	// char device_id[65];
	// strcpy(device_id, evs_client_get_deviceid());
	// int pos = strlen(device_id) - 3;
	// strncpy(ap_name + 5, device_id + pos, 3);
	// ap_name[8] = '\0';
	evs_aplinker_stop_link(handle->m_ap_linker);
	evs_timer_stop(handle->m_accept_timer);
	evs_timer_stop(handle->m_data_timer);
	evs_timer_stop(handle->m_reconnect_timer);
	evs_timer_set_timeout(handle->m_accept_timer, _on_accept_time_out, AP_LINKER_ACCEPT_TIMEOUT);
	evs_soundplayer_play(handle->m_sound_player, get_tone_url(TONE_ID_8));
	evs_client_stop(handle->m_client);
	handle->m_wifi_mgr->wifi_disconnect();
	evs_aplinker_start_link(handle->m_ap_linker, ap_name);
}
```



### 3.按键

CSK 离在线开发套件中已配备四个功能按键和一个硬件控制复位按键，四个功能按键分别是禁麦|开麦、音量+、音量-、播放|暂停。开发者可根据自身产品需求，自定义按键功能。支持单按键与组合键触发，触发方式包括单击与长按。

1、按键事件注册入口 **evs_interceptor.c** 

```c
evs_interceptor_t *
evs_interceptor_create()
{
	evs_interceptor_t *handle = (evs_interceptor_t *)evs_calloc(1, sizeof(evs_interceptor_t));
	evs_time_init();
	handle->m_led_mgr =  evs_led_mgr_create();
	handle->m_client = evs_client_create();
	evs_handler_set_handler(_handle_msg);
	evs_set_key_callback(_on_key_down, _on_key_long_press);// 按键事件注册入口
	handle->m_sound_player = evs_client_get_soundplayer(handle->m_client);
	handle->m_speaker = evs_client_get_speaker(handle->m_client);
	handle->m_audio_player = evs_client_get_audioplayer(handle->m_client);
	handle->m_tts_player = evs_client_get_ttsplayer(handle->m_client);
	handle->m_alert_player = evs_client_get_alertplayer(handle->m_client);
	handle->m_recognizer = evs_client_get_recognizer(handle->m_client);
	handle->m_net_config = evs_net_config_create(handle->m_sound_player, handle->m_client);
	s_interceptor = handle;
	return handle;
}
```

2、按键事件定义 **evs_key_event.h**

```c
typedef enum _KEY_EVENT { 
    KEY_VOL_DOWN = 0, //音量减事件
    KEY_VOL_UP, //音量加事件
    KEY_PLAY, //播放按键事件
    KEY_MUTE, //MUTE键事件
    KEY_MUTE_VOL_UP,// 目前定义的组合按键，同时按下MUTE和音量加
    KEY_MUTE_VOL_DOWN // 目前定义的组合按键，同时按下MUTE和音量减
} KEY_EVENT;

// 短按事件回调接口
typedef void (*key_press_callback)(KEY_EVENT event);

// 事件回调接口
typedef void (*key_longpress_callback)(KEY_EVENT event);
```

3、驱动层实现 **evs_key_event.c**

```c
extern void listenai_key_callback(key_press_callback pressCb, key_longpress_callback longPressCb);//驱动层需要实现此函数，通过pressCb回调对应的短按事件，通过longPressCb回调对应的长按事件
```



### 4.灯光

在产品实际使用过程中，上电、配网、语音交互等业务逻辑都会以灯光的形式提示用户，合适的灯光提示对于智能语音设备来说不可或缺。

1、灯光焦点管理模块

固件端根据用户使用产检，设计并维护了一套灯光焦点管理模块，该模块主要负责维护所有灯光的开关，创建、销毁、灯光优先级管理、灯光的打断恢复。

具体代码说明如下：

```c
// 灯光焦点管理模块初始化，如果要屏蔽灯光模块，请在此方法第一行return NULL;
evs_led_mgr_t* 
evs_led_mgr_create()
{
    int ret = disp_i2c_init();//灯光驱动初始化
    if (ret != 0) {
        return NULL;
    }
	led_init();//灯光具体效果初始化
    evs_led_mgr_t* handle = evs_calloc(1, sizeof(evs_led_mgr_t));
	// led_ctrl(LED3_MASK, LED_ON, 0xff0000);
    handle->m_lights[LED_ALARM] = (base_light_t*)alarm_light_create(_on_light_close);
    handle->m_lights[LED_BOOT] = (base_light_t*)boot_light_create(_on_light_close);
    handle->m_lights[LED_BOOTED] = (base_light_t*)booted_light_create(_on_light_close);
    handle->m_lights[LED_NET_WAIT] = (base_light_t*)net_wait_light_create(_on_light_close);
    handle->m_lights[LED_NET_SUCCESS] = (base_light_t*)net_success_light_create(_on_light_close);
    handle->m_lights[LED_UPDATING] = (base_light_t*)updating_light_create(_on_light_close);
    handle->m_lights[LDE_UPDATE_SUCCESS] = (base_light_t*)update_success_light_create(_on_light_close);
    handle->m_lights[LED_UPDATE_FAILED] = (base_light_t*)update_failed_light_create(_on_light_close);
    handle->m_lights[LED_NET_DISCONNECT] = (base_light_t*)net_disconn_light_create(_on_light_close);
    handle->m_lights[LED_SYSTEM_ERROR] = (base_light_t*)error_light_create(_on_light_close);
    handle->m_lights[LED_MIC] = (base_light_t*)mic_light_create(_on_light_close);
    handle->m_lights[LED_VOL] = (base_light_t*)vol_light_create(_on_light_close);
    handle->m_lights[LED_LISTENING] = (base_light_t*)listening_light_create(_on_light_close);
    handle->m_lights[LED_THINKING] = (base_light_t*)thinking_light_create(_on_light_close);
    handle->m_lights[LED_SPEAKING] = (base_light_t*)speaking_light_create(_on_light_close);
    s_led_mgr = handle;
    return handle;
}
```

- 灯光开启关闭

  ```c
  // 在evs_event线程中使用
  void evs_led_open_light(led_type_e type);//灯光开启方法
  void evs_led_close_light(led_type_e type);//灯光关闭方法
  void evs_led_close_all_light();//关闭全部灯光
  ```

- 灯光类型定义，位于 evs_ledtype.h

  ```c
  typedef enum {
        LED_ALARM = 0, 		// 闹钟灯光
        LED_BOOT,				// 开机灯光
        LED_BOOTED,			// 开机完成灯光
        LED_NET_WAIT,			// 开始配网
        LED_NET_SUCCESS,		// 联网成功
        LED_UPDATING,			// 升级灯光
        LDE_UPDATE_SUCCESS,	// 升级成功灯光
        LED_UPDATE_FAILED,	// 升级失败
        LED_NET_DISCONNECT,	// 网络断开
        LED_SYSTEM_ERROR,		// 系统错误
        LED_MIC,				// MUTE灯光
        LED_VOL,				// 音量调整灯光
        LED_LISTENING,		// listening灯光
        LED_THINKING,			// thinking灯光
        LED_SPEAKING,			// speaking灯光
        LED_COUNT				//灯光总数，保证在此枚举最后一个位置
    } led_type_e;
  ```

2、具体灯光实现

- 灯光基类 **base_light.h**

  ```c
  typedef struct base_light_s {
      void (*open)();				// 开灯
      void (*close)();			// 关灯
      led_type_e (*get_type)();	// 获取灯光类型
      int (*get_priority)();		// 获取灯光优先级
      void (*pause)();			// 暂停，根据需求实现，部分灯光需要暂停
      void (*resume)();			// 恢复
      void (*restart)();			
      bool (*need_pause)(led_type_e type); // 是否支持暂停
      light_close_callback m_close_cb;	// 灯光关闭回调
      light_state_e m_state;		// 灯光状态
  } base_light_t;
  ```

- 具体灯效实现，具体的灯光效果在以下文件里 open close 方法实现

  ```c
  ├── listenai_led
  │	├── alarm_light.h
  │	├── base_light.h
  │	├── boot_light.h
  │	├── ........
  ```



## 5.自定义本地TTS

固件中预置了表示设备状态的TTS，包括联网成功|失败、断网、开|禁麦等状态的的提示音，开发者可根据自己的产品自行定义 TTS 内容。

### 生成TTS文件

在 iFLYOS 的【设备能力】页面找到【语音输出】，可在此处试听并生成对应的TTS，如下图：

![](./files/iFLYOS_tts.png)

### TTS文件说明

**1.格式要求**

提示音播放目前只支持 mp3 和 wav 格式。

**2.空间要求**

提示音总大小不能超过2328K。

### 打包工具

**1.fatdisk.exe**

bk7251_sdk_relase\tool\fatdisk 目录下。

**2.rt_ota_packaging_tool.exe**

bk7251_sdk_relase\tool\rtt_ota 目录下。

### 操作步骤

1. 将需要打包的提示音放到 bk7251_sdk_relase\tool\fatdisk\root 路径下。

2. 使用`fatdisk.exe`工具在当前目录下生成 root.bin。

3. 使用`rt_ota_packaging_tool.exe`工具将 root.bin 打包成 root.rbl ,该文件会生成在 bk7251_sdk_relase\tool\fatdisk 目录下。

4. 编译打包时，会自动将 tool\fatdisk\ 目录下的 root.rbl 打包至固件。

### 软件使用

程序运行后，音频文件会挂载在 /flash0/ 目录下，可直接以文件形式操作。



## 6.自定义技能

当你在 iFLYOS 技能工作室完成了交互模型以及后处理，此时你需要在设备端实现如下代码，配合云端实现自定义技能的业务逻辑。在整个流程中，云端负责解析语义、下发指令；固件端需要响应云端指令，执行对应业务逻辑。

- 云端 response 接受函数

  目前所有云端消息接收消息在 **evs_client.c** 中，具体代码如下

  ```c
  //云端消息分发函数
  static void
  _handle_ws_message(const char *msg, int len)
  {
  	evs_response_t *response = evs_response_create(msg);
  	if (response == NULL) {
  		LOGE(TAG, "response is null");
  		return;
  	}
  	if (_will_drop(s_client, response->m_meta->m_request_id) == 0) {
  		LOGI(TAG, "current recognizer request id: %s, drop old request id: %s",
  				s_client->m_recognizer->m_cur_request_id, response->m_meta->m_request_id);
  		evs_response_destroy(response);
  		return;
  	}
  
      // 在次处解析云端消息判断是否是自定义拦截器
  	for (int i = 0; i < response->m_size; i++) {
  		evs_resp_item_t *item = &response->m_responses[i];
  		if (evs_system_process(s_client->m_system, response->m_meta, item) == 0) {
  			continue;
  		} else if (evs_recognizer_process(s_client->m_recognizer, response->m_meta, item) == 0) {
  			continue;
  		} else if (evs_speaker_process(
  						   s_client->m_speaker, response->m_meta, item, response->m_size) == 0) {
  			evs_system_sync_state(s_client->m_system);
  			continue;
  		} else if (evs_capaudioplayer_process(
  						   s_client->m_cap_audio_player, response->m_meta, response) == 0) {
  			break;
  		}
  	}
  
  	if (response->m_meta->m_is_last) {
  		if (response->m_size <= 0) {
  			LOGD(TAG, "iflyos_response size is 0");
  			evs_audioplayer_resume(s_client->m_audio_player);
  		}
  		evs_recognizer_response_end(s_client->m_recognizer, response->m_meta->m_request_id);
  	}
  	evs_response_destroy(response);
  }
  ```

- 实现示例

  ```c
  #define CMD_RESP_CUSTOM "interceptor.custom" // 云端定义的自定义事件
  
  int
  evs_capaudioplayer_process(evs_capaudioplayer_t *handle, evs_resp_meta_t *meta, evs_response_t *resp)
  {
  	if (resp->m_size <= 0) {
  		return 1;
  	}
  	int resp_code = 1;
  	for (int i = 0; i < resp->m_size; i++) {
  		evs_resp_item_t *item = &resp->m_responses[i];
  		if (strcmp(item->m_header_name, CMD_RESP_AUDIO_OUT) == 0) {
  			resp_code = 0;
  			audio_out_t *audio1 = _payload_parse(item->m_payload);
  			if (!audio1) return resp_code;
  			if (strcmp(audio1->m_type, AUDIO_OUT_PLAYBACK) == 0) {
  				bool has_tts = false;
  				if ((i + 1) < resp->m_size) {
  					evs_resp_item_t *item2 = &resp->m_responses[i + 1];
  					audio_out_t *audio2 = _payload_parse(item2->m_payload);
  					if (audio2 != NULL) {
  						if (strcmp(audio2->m_type, AUDIO_OUT_TTS) == 0) {
  							if (strcmp(audio2->m_behavior, BEHAVIOR_PARALLEL) != 0) {
  								strcpy(handle->m_cur_dialog_id, meta->m_request_id);
  							}
  							handle->m_ttsPlayer->on_directive(handle->m_ttsPlayer, audio2);
  							i++;
  							has_tts = true;
  						} else {
  							evs_free(audio2);
  						}
  					}
  					
  				}
  				if (handle->m_playback) {
  					evs_free(handle->m_playback);
  					handle->m_playback = NULL;
  				}
  				if (has_tts) {
  					handle->m_playback = audio1;
  				} else {
  					handle->m_audio_player->on_directive(handle->m_audio_player, audio1);
  				}
  			} else if (strcmp(audio1->m_type, AUDIO_OUT_TTS) == 0) {
  				if (strcmp(audio1->m_behavior, BEHAVIOR_PARALLEL) != 0) {
  					strcpy(handle->m_cur_dialog_id, meta->m_request_id);
  				}
  				handle->m_ttsPlayer->on_directive(handle->m_ttsPlayer, audio1);
  			} else if (strcmp(audio1->m_type, AUDIO_OUT_RING) == 0) {
  				handle->m_alert_player->on_directive(handle->m_alert_player, audio1);
  			} else {
  				evs_free(audio1);
  			}
  		} else if (strcmp(item->m_header_name, CMD_RESP_EXPECT_REPLY) == 0) {
  			resp_code = 0;
  			int result = strcmp(handle->m_cur_dialog_id, meta->m_request_id);
  			LOGD(TAG, "expect_reply reslut = %d", result);
  			LOGD(TAG, "expect_reply reslut = %s", handle->m_cur_dialog_id);
  
  			cJSON *payload_obj = cJSON_Parse(item->m_payload);
  			cJSON *payload_param = NULL;
  			strcpy(handle->m_request_id, meta->m_request_id);
  			payload_param = cJSON_GetObjectItem(payload_obj, "reply_key");
  			if (payload_param != NULL) {
  				strcpy(handle->m_reply_key, payload_param->valuestring);
  				LOGD(TAG, "reply_key = %s", handle->m_reply_key);
  			}
  			payload_param = cJSON_GetObjectItem(payload_obj, "background_recognize");
  			if (payload_param != NULL) {
  				handle->m_background_recognize = payload_param->valueint;
  				LOGD(TAG, "background_recognize = %d", handle->m_background_recognize);
  			}
  			long timeout = 8000;
  			payload_param = cJSON_GetObjectItem(payload_obj, "timeout");
  			if (payload_param != NULL) {
  				timeout = payload_param->valuedouble;
  				LOGD(TAG, "timeout = %d", timeout);
  			}
  			cJSON_Delete(payload_obj);
  			if (result != 0) {
  				evs_recognizer_expect_reply(handle->m_recognizer, meta->m_request_id,
  						handle->m_reply_key, false, (long)timeout);
  
  				s_cap_audio_player->m_reply_key[0] = '\0';
                  // s_cap_audio_player->m_request_id[0] = '\0';
                  s_cap_audio_player->m_background_recognize = false;
  			}
  			
  		} else if (strcmp(item->m_header_name, CMD_RESP_CUSTOM) == 0) { //判断是自定义拦截器
  			resp_code = 0;
              // 解析payload，
  			audio_out_t *audio1 = _payload_parse(item->m_payload);
  			if (!audio1) return resp_code;
  			if (strcmp(audio1->m_type, AUDIO_CUSTOM) == 0) {
                  // 解析后，此自定义消息是播放tts
  				handle->m_ttsPlayer->on_directive(handle->m_ttsPlayer, audio1);
  			} else {
  				evs_free(audio1);
  			}
  		}
  	}
  	return resp_code;
  }
  
  ```

  

## 7.自行验证

完成二次开发并编译固件后，你可在 iFLYOS 设备接入平台——【产品认证】中选择【下载模板】，下载平台测试用例，对设备进行功能自测。

![](./files/test_case.png)
