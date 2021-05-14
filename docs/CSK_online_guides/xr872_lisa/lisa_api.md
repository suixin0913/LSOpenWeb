# LISA_API 接口手册


## Drivers

封装 LISA 语音系统需要的基本驱动功能，输出统一API

### 1 .FLASH 模块

#### 1.1 简介

FLASH 模块用于支持 LISA 的持久化功能模块，以及对固化在 FLASH 中的音频文件的读取操作。



#### 1.2 接口说明

```
lisa_err_t lisa_flash_write(uint32_t addr, uint8_t *buf, uint32_t size)
```

**参数**

​    addr		待写入的起始地址

​	buf	      待写入的数据buf指针

​	size		 待写入的数据长度

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	FLASH 写入操作，写之前需要先擦除。



```
lisa_err_t lisa_flash_read(uint32_t addr, uint8_t *buf, uint32_t size)
```

**参数**

​    addr		待读取的起始地址

​	buf	      待读取的数据buf指针

​	size		 待读取的数据长度

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	FLASH 读取操作



```
lisa_err_t lisa_flash_erase(uint32_t addr, uint32_t size)
```

**参数**

​    addr		待擦除的起始地址

​	size		 待擦除的数据长度

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	FLASH 擦除，最小单位是4K



#### 1.3 使用示例

```
#define TAG "lisa_flash"

uint8_t buf[512];

void
lisa_flash(int argc, char *argv[])
{
	uint32_t address, len;
	void *data;
	if (argc < 4) {
		LISA_LOGE(TAG, "usage: %s write/read/erase addr len\r\n", argv[0]);
		return;
	}
	address = atoi(argv[2]);
	len = atoi(argv[3]);
	if (len > sizeof(buf)) {
		len = sizeof(buf);
	}

	LISA_LOGE(TAG, "address 0x%x  len:%d\r\n", address, len);

	if (strcmp(argv[1], "write") == 0) {
		for (uint8_t i = 0; i < len; i++) {
			buf[i] = i;
		}
		lisa_flash_write(address, buf, len);
	} else if (strcmp(argv[1], "read") == 0) {
		for (uint8_t i = 0; i < len; i++) {
			buf[i] = 0;
		}
		lisa_flash_read(address, buf, len);
		for (uint8_t i = 0; i < len; i++) {
			LISA_LOGE(TAG, "rec:0x%x\r\n", buf[i]);
		}
	} else if (strcmp(argv[1], "erase") == 0) {
		lisa_flash_erase(address, 4096);
	}
}
```

### 2. RTC 模块

#### 2.1 简介

用于和云端同步时间



#### 2.2 接口说明

```
lisa_err_t lisa_rtc_set(lisa_time_t *time)
```

​	**参数**

​		time		             设置时间的数据指针

​	**返回值**

​		成功返回	LISA_OK;	失败返回	LISA_FAIL

​	**说明**

​		设置时间



```
lisa_err_t lisa_rtc_get(lisa_time_t *time)
```

​	**参数**

​		time		             获取时间的数据指针

​	**返回值**

​		成功返回	LISA_OK;	失败返回	LISA_FAIL

​	**说明**

​		获取时间



#### 2.3 使用示例

```
#define TAG "lisa_rtc"

void
rtc_test(int argc, char *argv[])
{
	lisa_time_t time;
	uint8_t set = 0;

	if (argc < 2) {
		LISA_LOGE(TAG, "usage: %s set|get\r\n", argv[0]);
		return;
	}

	lisa_rtc_get(&time);
	if ('s' == argv[1][0]) {
		set = 1;
	} else {
		set = 0;
	}

	if (set) {
		time.year = 2013;
		time.month = 11;
		time.day = 12;
		time.hour = 13;
		time.minute = 14;
		time.second = 15;
		lisa_rtc_set(&time);
	} else {
		lisa_rtc_get(&time);
	}
}
```





### 3. WiFi 模块

#### 3.1 简介

提供 API 实现 WiFi 的 AP 模式和 STA 模式的使能和除能，实现 WiFi 参数的获取，并可根据回调函数返回 WiFi 的事件中断。



#### 3.2 接口说明

**接口**

```
lisa_err_t lisa_wifi_init(void);
```

**参数**

​	none

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	通过该函数上电 WiFi 的硬件。



**接口**

```
lisa_err_t lisa_wifi_connect(lisa_wifi_connect_t *connect);
```

**参数**

connect     写入待连接的wifi信息，参数内容参加结构体lisa_wifi_connect_t定义

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	该函数启动 WiFi 的 STA 模式，并连接到指定的 WiFi 热点。（仅在当前 WiFi 模式为空时生效）



**接口**

```
lisa_err_t lisa_wifi_disconnect(void);
```

**参数**

  none

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

该函数断开 WiFi 连接，AP 模式和 STA 模式均生效。



**接口**

```
lisa_err_t lisa_wifi_start_ap(lisa_wifi_ap_t *ap);
```

**参数**

ap     需要开启的热点信息，参考结构体lisa_wifi_ap_t定义说明

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	该函数启动 WiFi 的 AP 模式，并创建指定的热点。



**接口**

```
lisa_err_t lisa_wifi_stop_ap(void);
```

**参数**

  none

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

该函数关闭wifi的ap模式。



```
int lisa_wifi_set_mode(lisa_wlan_mode_t mode)
```

**参数**

mode    待设置的wifi工作模式，枚举类型，参考lisa_wlan_mode_t定义

**返回值**

返回当前设置的wifi工作模式

**说明**

用于设置wifi的工作模式



```
int lisa_wifi_get_mode(void)
```

**参数**

none

**返回值**

返回当前设置的wifi工作模式

**说明**

用于获取当前wifi工作模式





#### 

**暂未实现的预留接口**

​	开始搜索周围环境的 WiFi 信号

```
lisa_err_t lisa_wifi_start_scan(lisa_wifi_scan_t *scan);
```

​	停止搜索周围环境的 WiFi 信号

```
lisa_err_t lisa_wifi_stop_scan(void);
```



**结构体定义**

```
typedef struct lisa_wifi_connect_t
```

wifi的ssid,密码和连接事件回调

**成员**

char *ssid;					// 连入的ssid

char *password;				// 连入的密码，无密码置NULL

 uint8_t *bssid;               //  MAC地址 ，不限定则传 NULL

 void (*on_event)(lisa_wifi_connect_event_t *event);	// 注册wifi事件回调函数



```
typedef struct lisa_wifi_connect_event_t 
```

wifi事件回调结构体定义

**成员**

  lisa_wifi_connect_event_e what;  // 事件类型

  char ssid[LISA_WLAN_SSID_MAX_LEN + 1];  // ssid，LISA_WLAN_SSID_MAX_LEN = 32

  uint8_t bssid[6];  //  MAC地址 ，不限定则传 NULL

  uint8_t ip_addr[4]; // 返回连接成功的ip地址

  uint8_t broadcast_addr[4]; // 返回连接成功广播地址



**what取值说明**

```
LISA_WIFI_ON_IDLE
```

 wifi未初始化

```
LISA_WIFI_ON_CONNECTED
```

 wifi已连接

```
 LISA_WIFI_ON_CONNECT_FAILED
```

 wifi连接失败

```
 LISA_WIFI_ON_PSWD_WRONG
```

  wifi密码错误

```
LISA_WIFI_ON_DISCONNECTED
```

  wifi已断开

```
LISA_WIFI_AP_ASSOCIATED
```

  wifi热点已连接

```
LISA_WIFI_AP_ASSOCIATE_FAILED
```

  wifi热点连接失败

```
LISA_WIFI_AP_DISASSOCIATED
```

   wifi热点已断开



```
typedef struct lisa_wifi_scan_t
```

热点信息定义

**成员**

  char ssid[33];		// 创建的热点名称

  char password[64];	// 创建的热点密码，为空则置NULL

  uint8_t ch;			// 创建的热点信道号，默认为11信道，非法值暂不提醒

  uint8_t ip_addr[4];   //  创建的热点IP地址（暂未实现）

  uint8_t subnet_mask[4];	 //  创建的热点IP地址掩码（暂未实现）

  uint8_t client_ip_start[4];	 //  创建的热点可分配的IP起始地址（暂未实现）

  uint8_t client_ip_end[4];		 //  创建的热点IP地址（暂未实现）



```
enum lisa_wlan_mode_t
```

```
 LISA_WIFI_NONE
```

   wifi工作模式未设置

```
LISA_WIFI_STATION
```

  站点模式

```
LISA_WIFI_SOFTAP
```

   热点模式



#### 3.3 使用示例

​	启动 WiFi 功能：>> hal_wifi_demo   init

​	启动 STA 模式并连入 WiFi：>> hal_wifi_demo  join  "wifi_ssid "   " wifi_password"

​	启动 AP 模式并创建 WiFi 热点：>> hal_wifi_demo  ap   "wifi_ssid "   " wifi_password"

​	关闭当前 WiFi 模式 hal_wifi_demo   down

```
static void
wifi_event_callback(lisa_wifi_connect_event_t *event)
{
  WLAN_DBG("------------event type: [%d]---------------",event->what);
}

int
hal_wifi_demo(int argc, char **argv)
{
    if (strcmp(argv[1], "init") == 0) {
    	lisa_wifi_init();
    } else if (strcmp(argv[1], "join") == 0) {
        lisa_wifi_connect_t test_connect;
        test_connect.ssid = argv[2];

        test_connect.password = argv[3];
        test_connect.on_event = wifi_event_callback;
        lisa_wifi_connect(&test_connect);
  	} else if (strcmp(argv[1], "up") == 0) {
 	 	/* the key was saved in g_lisa_wlan device */
		rt_wlan_connect(lisa_wifi_info->g_lisa_wlan, RT_NULL, lisa_wifi_info->g_lisa_wlan->key);
 	} else if (strcmp(argv[1], "down") == 0) {
		lisa_wifi_disconnect();
	} else if (strcmp(argv[1], "ap") == 0) {
		rt_err_t result = RT_EOK;
		lisa_wifi_ap_t temp_ap;
        os_memset(temp_ap.ssid, 0, sizeof(temp_ap.ssid));
        os_memset(temp_ap.password, 0, sizeof(temp_ap.password));
        lisa_wifi_info->connect_event.on_event = NULL;
        os_memcpy(temp_ap.ssid, argv[2], strlen((char *)argv[2]) + 1);
        
        if (argc == 4) {
        } else if (argc == 5) {
        	os_memcpy(temp_ap.password, argv[3], strlen((char *)argv[3]) + 1);
        }
        temp_ap.ch = 11;
        result = lisa_wifi_start_ap(&temp_ap);
        if (result != RT_EOK) {
       		WLAN_DBG("wifi start failed! result=%d\n", result);
     	}
  	} 
  	return 0;
}

MSH_CMD_EXPORT(hal_wifi_demo, hal_wifi_demo command);


```



## OS

​	OS的 API 函数为应用层提供了统一的函数接口；目的是屏蔽不同 OS 的 API 的差别，方便应用层代码开发和移植

### 1. Thread



#### lisa_thread_create

```
lisa_thread_t *lisa_thread_create(const lisa_thread_attr_t *attr, 
									void (*entry)(void *), 
									void *arg)
```

**参数**：

​	attr：		线程属性

```
    typedef struct {
        char *name;
        uint32_t stack_size;	// 栈大小
        uint32_t priority;		// 优先级
    } lisa_thread_attr_t;
```

​	entry：	线程函数

```
	void (*entry)(void *)
```

​	arg：		线程函数的参数

**返回值：**

​	lisa_thread_t * 	线程指针

​	失败	返回 NULL

​	成功	返回非 NULL

**说明:**

​	创建线程



#### lisa_thread_delete

```
lisa_err_t lisa_thread_delete(lisa_thread_t *thread)
```

**参数**：

​	thread：	线程指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	销毁线程



#### lisa_thread_yield

```
lisa_err_t lisa_thread_yield(void)
```

**参数**：

​	void

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	启动线程调度



#### lisa_thread_suspend

```
lisa_err_t lisa_thread_suspend(lisa_thread_t *thread)
```

**参数**：

​	thread：	线程指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	挂起线程



#### lisa_thread_resume

```
lisa_err_t lisa_thread_resume(lisa_thread_t *thread)
```

**参数**：

​	thread：	线程指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	恢复线程



#### lisa_thread_delay

```
lisa_err_t lisa_thread_delay(uint32_t ticks)
```

**参数**：

​	tick：		延时时间，单位为秒

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	线程延时，单位为秒



#### lisa_thread_mdelay

```
lisa_err_t lisa_thread_mdelay(uint32_t ms)
```

**参数**：

​	ms：	   单位为ms

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	线程延时，单位为ms



#### lisa_thread_getcurrent

```
lisa_thread_t *lisa_thread_getcurrent(void)
```

**参数**：

​	void

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	获取当前线程指针



### 2. Queue

#### lisa_queue_create

```
lisa_queue_t *lisa_queue_create(uint32_t count, uint32_t item_size)
```

**参数**：

​	count：			消息队列中消息的最大个数

​	item_size：	  单个消息的大小	

**返回值：**

​	lisa_queue_t *：消息队列指针

​	成功：	返回消息队列指针	

​	失败：	返回 NULL

**说明:**

​	创建消息队列



#### lisa_queue_push

```
lisa_err_t lisa_queue_push(lisa_queue_t *queue, 
							void *item, 
							uint32_t item_size, 
							int32_t wait)
```

**参数**：

​	queue：		 消息队列指针

​	item：			发送数据的地址

​	item_size：	单个消息的大小

​	wait：			超时时间，单位为ms

**返回值：**

​	LISA_OK：	发送成功	

​	LISA_FAIL：  出现错误

**说明:**

​	向消息队列里面发送消息



#### lisa_queue_receive

```
lisa_err_t lisa_queue_receive(lisa_queue_t *queue, 
								void *item, 
								uint32_t item_size, 
								int32_t wait)
```

**参数**：

​	queue：		消息队列指针

​	item：		    接收数据的指针

​	item_size：    单个消息的大小

​	wait：			 超时时间，单位为ms

**返回值：**

​	LISA_OK：	接收成功	

​	LISA_FAIL：  出现错误

**说明:**

​	从消息队列里面接收消息；如果超时时间到了，还没有收到消息，那么返回 LISA_FAIL；在超时时间到达前收到消息，那么返回 LISA_OK；



#### lisa_queue_delete

```
lisa_err_t lisa_queue_delete(lisa_queue_t *queue)
```

**参数**：

​	queue：消息队列指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	销毁消息队列



#### lisa_queue_available

```
uint32_t lisa_queue_available(lisa_queue_t *queue)
```

**参数**：

​	queue：消息队列指针

**返回值：**

​	消息队列中剩余可用的消息的个数

**说明:**

​	查询消息队列中空闲消息的个数



#### lisa_queue_waiting

```
uint32_t lisa_queue_waiting(lisa_queue_t *queue)
```

**参数**：

​	queue：消息队列指针

**返回值：**

​	消息队列中已有消息的个数

**说明:**

​	查询消息队列中正在等待的消息的个数



#### lisa_queue_clear

```
lisa_err_t lisa_queue_clear(lisa_queue_t *queue)
```

**参数**：

​	queue：消息队列指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	复位消息队列，此函数会清空消息队列



### 3. Mutex

#### lisa_mutex_create

```
lisa_mutex_t *lisa_mutex_create(void)
```

**参数**：

​	void

**返回值：**

​	lisa_mutex_t*：互斥量的指针

​	成功：	返回互斥量指针	

​	失败：	返回NULL

**说明:**

​	创建互斥量



#### lisa_mutex_lock

```
lisa_err_t lisa_mutex_lock(lisa_mutex_t *mutex, int32_t block_time)
```

**参数**：

​	mutex：		互斥量指针

​	block_time：超时时间，单位为ms

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	互斥量上锁，如果超时时间到了，还无法获得锁，那么返回 LISA_FAIL；在超时时间到达前获得锁，那么返回 LISA_OK；



#### lisa_mutex_unlock

```
lisa_err_t lisa_mutex_unlock(lisa_mutex_t *mutex)
```

**参数**：

​	mutex：		互斥量指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	互斥量解锁



#### lisa_mutex_delete

```
lisa_err_t lisa_mutex_delete(lisa_mutex_t *mutex)
```

**参数**：

​	mutex：		互斥量指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	销毁互斥量



### 4 .Semaphore

#### lisa_semaphore_create

```
lisa_semaphore_t *lisa_semaphore_create(uint32_t count)
```

**参数**：

​	count：		信号量最大个数

**返回值：**

​	lisa_semaphore_t *：	信号量指针

​	成功：	返回信号量指针	

​	失败：	返回NULL

**说明:**

​	创建信号量



#### lisa_semaphore_take

```
lisa_err_t lisa_semaphore_take(lisa_semaphore_t *sem, int32_t block_time)
```

**参数**：

​	sem：			信号量指针

​	block_time：超时时间

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	获取信号量，如果超时时间到了，还无法获得信号量，那么返回LISA_FAIL；在超时时间到达前获得信号量，那么返回LISA_OK；



#### lisa_semaphore_give

```
lisa_err_t lisa_semaphore_give(lisa_semaphore_t *sem)
```

| 入参  | 注释       |
| ----- | ---------- |
| mutex | 信号量指针 |

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	释放信号量



#### lisa_semaphore_delete

```
lisa_err_t lisa_semaphore_delete(lisa_semaphore_t *sem)
```

**参数**：

​	mutex：		信号量指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	销毁信号量



#### lisa_semaphore_getcount

```
uint32_t lisa_semaphore_getcount(lisa_semaphore_t *sem)
```

**参数**：

​	mutex：		信号量指针

**返回值：**

​	可用的信号量个数

**说明:**

​	获取可用的信号量个数



### 5. Timer

#### lisa_timer_create

```
lisa_timer_t *lisa_timer_create(lisa_timertype type, 
								lisa_timercb_t cb, 
								void *arg, 
								uint32_t period_ms)
```

**参数**：

​	type：		定时器类型

```
	typedef enum {
        OS_TIMER_ONCE = 0,		// 单次定时器
        OS_TIMER_PERIODIC = 1,	// 周期定时器
    } lisa_timertype;
```

​	cb：			定时器回调函数

```
	typedef void (*lisa_timercb_t)(void *arg)
```

​	arg：		  定时器回调函数的参数

​	period_ms：定时器的周期，单位ms

**返回值：**

​	lisa_timer_t *：	定时器指针

​	成功：	返回定时器指针

​	失败：	返回NULL

**说明:**

​	创建软件定时器



#### lisa_timer_delete

```
lisa_err_t lisa_timer_delete(lisa_timer_t *timer)
```

**参数**：

​	timer：		定时器指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	销毁定时器



#### lisa_timer_start

```
lisa_err_t lisa_timer_start(lisa_timer_t *timer)
```

**参数**：

​	timer：		定时器指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	启动定时器



#### lisa_timer_stop

```
lisa_err_t lisa_timer_stop(lisa_timer_t *timer)
```

**参数**：

​	timer：		定时器指针

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	停止定时器



#### lisa_timer_change_period

```
lisa_err_t lisa_timer_change_period(lisa_timer_t *timer, uint32_t period_ms)
```

**参数**：

​	timer：		定时器指针

​	period：	  定时器周期，单位ms

**返回值：**

​	LISA_OK：	成功	

​	LISA_FAIL：  失败

**说明:**

​	修改定时器周期



### 6 .Time

#### lisa_os_get_ticks

```
uint32_t lisa_os_get_ticks(void)
```

**参数**：

​	void

**返回值：**

​	返回从 OS 启动后到现在为止的时间间隔，单位为时间片，时间片由具体 OS 实现决定

**说明:**

​	获得 OS 启动到现在的时间间隔，单位为时间片



#### lisa_os_get_time

```
uint32_t lisa_os_get_time(void)
```

**参数**：

​	void

**返回值：**

​	返回从 OS 启动后到现在为止的时间，单位为秒

**说明:**

​	获得 OS 启动到现在的时间，单位为秒



#### lisa_rand32

```
uint32_t lisa_rand32(void)
```

**参数**：

​	void

**返回值：**

​	返回随机值（直接返回os的当前tick值）

**说明:**

​	获得32位随机值



### 7.Memory

#### lisa_mem_alloc

```
void *lisa_mem_alloc(uint32_t size);
```

**参数**：

​	size：大小为byte

**返回值：**

​	void* 

**说明:**

​	申请内存空间



#### lisa_mem_realloc

```
void *lisa_mem_realloc(void *ptr, uint32_t size)
```

**参数**：

​	ptr：内存空间地址

​	size：申请内存大小，单位为byte

**返回值：**

​	void* 

​	成功：返回非NULL指针

​	失败：返回NULL

**说明:**

​	重新申请内存空间



#### lisa_mem_calloc

```
void *lisa_mem_calloc(uint32_t count, uint32_t size)
```

**参数**：

​	count：内存块个数

​	size：单个内存块大小，单位为byte

**返回值：**

​	void* 

​	成功：返回非NULL指针

​	失败：返回NULL

**说明:**

​	申请count*size的内存空间



#### lisa_mem_free

```
void lisa_mem_free(void *ptr)
```

**参数**：

​	ptr：内存空间指针

**返回值：**

​	void

**说明:**

​	释放内存空间



#### lisa_strdup

```
char *lisa_strdup(const char *s)
```

**参数**：

​	s：字符串

**返回值：**

​	char*

​	成功：返回非NULL指针

​	失败：返回NULL

**说明:**

​	字符串拷贝函数



## Component

### 1. 播放器

#### 1.1 简介

移植 LISA 系统需要当前环境支持双播放器实例，播放器1主要用于播放音乐和订阅的内容且，播放器二主
要用于播放 tts 提示音。



#### 1.2 接口说明

```
lisa_player_t *lisa_player_init(lisa_player_params_t *params);
```

**参数**

   params				播放器配置参数

```
       typedef enum {
            LISA_PLAYER_TYPE_ONE = 0,
            LISA_PLAYER_TYPE_TWO,			//只支持mp3和wav格式
            LISA_PLAYER_TYPE_MAX
        } lisa_player_type_e;
       
       typedef enum {
            LISA_PLAYER_EVENT_ERROR,
            LISA_PLAYER_EVENT_PREPARED,		//未支持
            LISA_PLAYER_EVENT_STARTED,		//已播放
            LISA_PLAYER_EVENT_STOPPED,		//停止
            LISA_PLAYER_EVENT_PAUSED,		//暂定
            LISA_PLAYER_EVENT_RESUMED,		//恢复播放
            LISA_PLAYER_EVENT_FINISHED,		//播放完毕
        } lisa_player_event_e;
        
        typedef struct {	
            void *user;						//回调参数
            lisa_player_type_e type;		//播放器类型
            lisa_player_cb cb;				//注册回调，回调事件见lisa_player_event_e
        } lisa_player_params_t;
```

**返回值**

​	成功返回播放器实例；失败返回NULL

**说明**

​	用于创建播放器实例，注册对应播放器事件回调函数。注意播放器 LISA_PLAYER_TYPE_TWO 只支持mp3和wav格式



```
lisa_err_t lisa_player_prepare_url(lisa_player_t *ins, const char *url)
```

**参数**

   ins		播放器实例

   url		URL指针

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	播放前加载资源，可以是网络url，也可以是打包在文件系统的资源路径



```
lisa_err_t lisa_player_set_callback(lisa_player_t *ins, lisa_player_cb callback)
```

**参数**

   ins		播放器实例

   callback		回调函数

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	播放器事件回调函数可以在 lisa_player_init 创建实例中注册，也可以通过该函数重新注册



```
lisa_err_t lisa_player_play(lisa_player_t *ins)
```

**参数**

   ins		播放器实例

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	用于加载资源后，开始播放



```
lisa_err_t lisa_player_stop(lisa_player_t *ins)
```

**参数**

   ins		播放器实例

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	停止播放



```
lisa_err_t lisa_player_pause(lisa_player_t *ins)
```

**参数**

   ins		播放器实例

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	暂停播放



```
lisa_err_t lisa_player_resume(lisa_player_t *ins)
```

**参数**

   ins		播放器实例

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	恢复播放



```
lisa_player_state_e lisa_player_get_state(lisa_player_t *ins)
```

**参数**

   ins		播放器实例

**返回值**

​	当前播放器状态		

```
        typedef enum {
            LISA_PLAYER_STAUS_PLAYING = 0,			//正在播放
            LISA_PLAYER_STATUS_PAUSED,				//暂停播放
            LISA_PLAYER_STATUS_STOPPED,				//停止播放

            LISA_PLAYER_ERR,
        } lisa_player_state_e;
```

**说明**

​	主动获取当前播放器状态



```
lisa_err_t lisa_player_seek(lisa_player_t *ins, uint32_t progress_ms)
```

**参数**

   ins		播放器实例

   progress_ms		待seek的时间点

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	在播放过程中 seek music



```
uint32_t lisa_player_get_progress(lisa_player_t *ins)
```

**参数**

   ins		播放器实例

**返回值**

​	当前播放进度时间，单位ms

**说明**

​	在播放过程中获取当前播放器进度



```
uint32_t lisa_player_get_duration(lisa_player_t *ins)
```

**参数**

   ins		播放器实例

**返回值**

​	当前歌曲总长，单位ms

**说明**

​	在播放过程中获取当前歌曲总长



```
lisa_err_t lisa_player_set_volume(lisa_player_t *ins, uint8_t volume)
```

**参数**

   ins		播放器实例

   volume		音量大小，0~100

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	调整对应播放器音量大小



```
uint8_t lisa_player_get_volume(lisa_player_t *ins)
```

**参数**

   ins		播放器实例

**返回值**

​	音量大小

**说明**

​	获取对应播放器音量大小



#### 1.3 使用示例

```
lisa_player_t *g_player1 = NULL;
lisa_player_t *g_player2 = NULL;

static struct optparse_long opts[] = {{"version", 'V', OPTPARSE_NONE}, /* 版本 */
		{"help", 'h', OPTPARSE_NONE}, /* 帮助 */
		{"start", 's', OPTPARSE_REQUIRED}, /* 播放 */
		{"stop", 't', OPTPARSE_NONE}, /* 停止 */
		{"pause", 'p', OPTPARSE_NONE}, /* 暂停 */
		{"resume", 'r', OPTPARSE_NONE}, /* 恢复 */
		{"seek", 'k', OPTPARSE_REQUIRED}, /* 移动 */
		{"volume", 'v', OPTPARSE_REQUIRED}, /* 音量 */
		{"dump", 'd', OPTPARSE_NONE}, /* 信息 */
		{NULL, 0, OPTPARSE_NONE}};

static void

usage(void)
{
	rt_kprintf("usage: player [type][option] [target] ...\n\n");
	rt_kprintf("type options: 1|2\n");

	rt_kprintf("usage options:\n");
	rt_kprintf("  -V,     --version                  Print player version message.\n");
	rt_kprintf("  -h,     --help                     Print defined help message.\n");
	rt_kprintf(
			"  -s URI, --start=URI                Play music with URI(network links or local "
			"files).\n");
	rt_kprintf("  -t,     --stop                     Stop playing music.\n");
	rt_kprintf("  -p,     --pause                    Pause the music.\n");
	rt_kprintf("  -r,     --resume                   Resume the music.\n");
	rt_kprintf("  -k sec, --seek=sec                 Seek the specified seconds to play.\n");
	rt_kprintf("  -v lvl, --volume=lvl               Change the volume(0~99).\n");
	rt_kprintf("  -d,     --dump                     Dump play relevant information.\n");
}

#if 1
static void
dump_status(uint8_t type)
{
	lisa_player_t *playobj;
	const char *state[] = {"PLAYING", "PAUSED", "STOPPED"};
	if (1 == type) {
		playobj = g_player1;
	} else {
		playobj = g_player2;
	}

	rt_kprintf("\nPlayer Dump Status:\n");
	rt_kprintf("status   - %s\n", state[lisa_player_get_state(playobj)]);
	// rt_kprintf("URI      - %s\n", (player_get_uri() != NULL) ? player_get_uri() : "NULL");
	rt_kprintf("volume   - %d\n", lisa_player_get_volume(playobj));
	rt_kprintf("codec    - %s\n", audio_codec_tostring(audio_codec_get()));

	if ((int)lisa_player_get_state(playobj) != (int)LISA_PLAYER_STATUS_STOPPED) {
		int value;

		value = lisa_player_get_duration(playobj);
		rt_kprintf("duration - %02d:%02d\n", value / 60, value % 60);

		value = lisa_player_get_progress(playobj) / 1000;
		rt_kprintf("position - %02d:%02d\n", value / 60, value % 60);
	}
}
#endif
void
player1_test_cb(lisa_player_event_e event, void *user)
{
	rt_kprintf("player1 event %d\n", event);
}

void
player2_test_cb(lisa_player_event_e event, void *user)
{
	rt_kprintf("player2 event %d\n", event);
}

static int
player_test(int argc, char *argv[])
{
	if (argc == 1) {
		usage();
		return RT_EOK;
	}

	uint8_t type = atoi(argv[1]);

	if (strcmp(argv[2], "-s") == 0) {
		rt_kprintf("player%d start in\n", type);
		if (1 == type) {
			if (NULL == g_player1) {
				lisa_player_params_t para;
				memset(&para, 0, sizeof(lisa_player_params_t));
				para.type = LISA_PLAYER_TYPE_ONE;
				g_player1 = lisa_player_init(&para);
			}

			lisa_player_set_callback(g_player1, player1_test_cb);

			lisa_player_prepare_url(g_player1, argv[3]);

			lisa_player_play(g_player1);

		} else {
			if (NULL == g_player2) {
				lisa_player_params_t para;
				memset(&para, 0, sizeof(lisa_player_params_t));
				para.type = LISA_PLAYER_TYPE_TWO;
				g_player2 = lisa_player_init(&para);
			}

			lisa_player_set_callback(g_player2, player2_test_cb);

			lisa_player_prepare_url(g_player2, argv[3]);

			lisa_player_play(g_player2);
		}

		rt_kprintf("player%d start out\n", type);
	} else if (strcmp(argv[2], "-p") == 0) {
		rt_kprintf("player%d pause in\n", type);
		if (1 == type) {
			lisa_player_pause(g_player1);
		} else {
			lisa_player_pause(g_player2);
		}
		rt_kprintf("player%d pause out\n", type);
	} else if (strcmp(argv[2], "-r") == 0) {
		rt_kprintf("player%d resume in\n", type);
		if (1 == type) {
			lisa_player_resume(g_player1);
		} else {
			lisa_player_resume(g_player2);
		}
		rt_kprintf("player%d resume in\n", type);
	} else if (strcmp(argv[2], "-t") == 0) {
		rt_kprintf("player%d stop in\n", type);
		if (1 == type) {
			lisa_player_stop(g_player1);
		} else {
			lisa_player_stop(g_player2);
		}
		rt_kprintf("player%d stop in\n", type);
	} else if (strcmp(argv[2], "-v") == 0) {
		uint8_t volume = atoi(argv[3]);
		rt_kprintf("player%d set volume%d in\n", type, volume);
		if (1 == type) {
			lisa_player_set_volume(g_player1, volume);
		} else {
			lisa_player_set_volume(g_player2, volume);
		}
		rt_kprintf("player%d set volume%d in\n", type, volume);
	} else if (strcmp(argv[2], "-d") == 0) {
		dump_status(type);
	} else if (strcmp(argv[2], "-k") == 0) {
		uint32_t seek = atoi(argv[3]);
		if (1 == type) {
			lisa_player_seek(g_player1, seek);
		} else {
			lisa_player_seek(g_player2, seek);
		}
		rt_kprintf("player%d seek %d\n", type, seek);
	}

	return RT_EOK;
}

MSH_CMD_EXPORT(player_test, persistence testself);
```



## Log

### 1. 日志

#### 1.1 简介

​	提供通用的日志打印函数，具备常用的日志分级输出、tag 标记的能力



#### 1.2 接口说明

#### 日志等级

```
#define LOG_LEVEL_NONE 		(0)		//	 
#define LOG_LEVEL_ERROR 	(1)		//	错误
#define LOG_LEVEL_WARN 		(2)		//	警告
#define LOG_LEVEL_INFO 		(3)		//	信息
#define LOG_LEVEL_DEBUG 	(4)		//	调试
```

#### 日志打印函数

```
LISA_LOGV(tag, format, ...);        // 输出全部日志
LISA_LOGE(tag, format, ...);		// 输出错误日志
LISA_LOGW(tag, format, ...);		// 输出警告日志
LISA_LOGI(tag, format, ...);		// 输出信息日志
LISA_LOGD(tag, format, ...);		// 输出调试日志
```

#### 断言

```
#define LISA_OK (int32_t)(0)
#define LISA_FAIL (int32_t)(-1)

LISA_APP_ASSERT(exp, fmt, ...)	// 线程断言
LISA_ISR_ASSERT(exp, fmt, ...)	// 中断断言
```



## Modules 

### 1 .button检测

#### 1.1 简介

基于 multibutton 封装按键接口,支持短按，长按。



#### 1.2 接口说明

```
lisa_err_t lisa_keys_init(lisa_keys_on_event event_cb)
```

**参数**

​	event_cb		注册按键回调函数

```
		
		#define KEY_TYPE_SHORT (1 << 0)				//短按
		#define KEY_TYPE_LONG (1 << 1)				//长按
		#define KEY_TYPE_DOUBLETICK (1 << 2)		//双击
		
		typedef struct {
            uint8_t type_e;				//按键事件类型
            uint8_t key_index;			//按键号
        } lisa_key_event;

		typedef void (*lisa_keys_on_event)(lisa_key_event *event);
```

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	通过该函数注册按键事件回调函数，并且启动按键检测。另外还需结合硬件电路配置合适的 button_config g_button[]

​	下面配置对应硬件关联为：

​			按键2,3一起通过 adc6 检测，按键2单独按下电压检测值为1.3左右，按键3单独按下电压检测值为0.9左右；

​			按键4,5一起通过 adc7 检测，按键4单独按下电压检测值为1.3左右，按键5单独按下电压检测值为0.9左右；

```
    button_config g_button[4] = { 
            [0] = {.type = KEY_TYPE_SHORT | KEY_TYPE_LONG,		//支持短按和长按
                    .key_index = 2,								//按键号
                    .ad_confg.channel = 6,						//通过通道6的adc检测
                    .ad_confg.lowValue = 1100,					//1100mv~1600mv 是按键按下状态。
                    .ad_confg.highValue = 1600},  

            [1] = {.type = KEY_TYPE_SHORT | KEY_TYPE_LONG,
                    .key_index = 3,
                    .ad_confg.channel = 6,
                    .ad_confg.lowValue = 700,
                    .ad_confg.highValue = 1100},  

            [2] = {.type = KEY_TYPE_SHORT | KEY_TYPE_LONG,
                    .key_index = 4,
                    .ad_confg.channel = 7,
                    .ad_confg.lowValue = 700,
                    .ad_confg.highValue = 1100},  
            [3] = {.type = KEY_TYPE_SHORT | KEY_TYPE_LONG,
                    .key_index = 5,
                    .ad_confg.channel = 7,
                    .ad_confg.lowValue = 1100,
                    .ad_confg.highValue = 1600},  

    };
```

​	

#### 1.3 使用示例

需结合硬件电路设计，配置合适的 button_config

```
void
lisa_button_cb(lisa_key_event *event)
{
	LISA_LOGE(TAG, "lisa_button_cb key %d  type %d", event->key_index, event->type_e);
}

static int
lisa_button(int argc, char *argv[])
{
	LISA_LOGE(TAG, "lisa_button test ///////////////////");
	lisa_keys_init(lisa_button_cb);

	return 0;
}

MSH_CMD_EXPORT(lisa_button, button testself);
```



### 2. led显示

#### 2.1 简介

通过3路 PWM 控制 RGB led 完成显示功能，支持常亮，关闭，闪烁，呼吸灯。



#### 2.2 接口说明

```
lisa_err_t lisa_led_init(void)
```

**参数**

   void

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	完成led显示模块初始化，配置相关pwm号



```
lisa_err_t lisa_rgbled_ctr(lisa_led_mode_e mode, uint32_t rgb, uint16_t flash_cnt)
```

**参数**

   mode			显示模式	

```
            typedef enum {
                LED_MODE_ON = 0,	//常亮
                LED_MODE_OFF,		//常灭
                LED_MODE_BREATH,	//呼吸灯
                LED_MODE_FLASHING,	//闪烁

                LED_MODE_INVALID,
            } lisa_led_mode_e;
```

​						

​	rgb				 显示颜色	RGB_BLUE/RGB_GREEN/RGB_RED

​	flash_cnt		闪烁次数（闪烁模式下有效）

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	按参数进行灯效显示



#### 2.3 使用示例

```
static int
lisa_led(int argc, char *argv[])
{
	lisa_led_mode_e mode;
	uint32_t rgb;
	uint16_t cnt = 0;

	if (argc < 2) {
		LISA_LOGE(TAG, "usage: %s breath|on|off|flash RGB cnt\r\n", argv[0]);
		return 0;
	}

	lisa_led_init();

	if (strcmp(argv[1], "breath") == 0) {
		rgb = atoi(argv[2]);
		mode = LED_MODE_BREATH;
		LISA_LOGE(TAG, "breath  0x%x\r\n", rgb);

	} else if (strcmp(argv[1], "on") == 0) {
		rgb = atoi(argv[2]);
		mode = LED_MODE_ON;
		LISA_LOGE(TAG, "on  0x%x\r\n", rgb);
	} else if (strcmp(argv[1], "off") == 0) {
		rgb = atoi(argv[2]);
		mode = LED_MODE_OFF;
		LISA_LOGE(TAG, "off  0x%x\r\n", rgb);
	} else if (strcmp(argv[1], "flash") == 0) {
		rgb = atoi(argv[2]);
		cnt = atoi(argv[3]);
		mode = LED_MODE_FLASHING;
		LISA_LOGE(TAG, "flash  0x%x %d\r\n", rgb, cnt);
	}

	switch (rgb) {
		case 0:
			lisa_rgbled_ctr(mode, 0, cnt);
			break;
		case 1:
			lisa_rgbled_ctr(mode, RGB_BLUE, cnt);
			break;
		case 2:
			lisa_rgbled_ctr(mode, RGB_GREEN, cnt);
			break;
		case 3:
			lisa_rgbled_ctr(mode, RGB_GREEN | RGB_BLUE, cnt);
			break;
		case 4:
			lisa_rgbled_ctr(mode, RGB_RED, cnt);
			break;
		case 5:
			lisa_rgbled_ctr(mode, RGB_RED | RGB_BLUE, cnt);
			break;
		case 6:
			lisa_rgbled_ctr(mode, RGB_RED | RGB_GREEN, cnt);
			break;
		case 7:
			lisa_rgbled_ctr(mode, RGB_RED | RGB_GREEN | RGB_BLUE, cnt);
			break;
		default:
			break;
	}

	return 0;
}

MSH_CMD_EXPORT(lisa_led, led testself);
```



### 3 持久化

#### 3.1 简介

持久化依赖于 FLASH 模块，主要用于保存设备的 deviceID 和用户的设置信息。 建议移植 EasyFlash 库，该
库可提供 key-value 持久化接口。且默认开启均衡磨损和掉电保护。



#### 3.2 接口说明

```
lisa_err_t lisa_perst_init()
```

**参数**

   void

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	持久化功能初始化



```
lisa_err_t lisa_perst_put_string(const char *k, const char *v)
```

**参数**

   k				key值

   v				value

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	用于保存字符型型key-value



```
lisa_err_t lisa_perst_get_string(const char *k, char **v)
```

**参数**

   k				key值

   v				value

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	用于获取字符型型key-value



```
lisa_err_t lisa_perst_put_int(const char *k, int v)
```

**参数**

   k				key值

   v				value

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	用于保存int型key-value



```
lisa_err_t lisa_perst_get_int(const char *k, int *out_v)
```

**参数**

   k				key值

   v				value

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	用于获取int型key-value



```
lisa_err_t lisa_perst_put_bool(const char *k, bool v)
```

**参数**

   k				key值

   v				value

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	用于保存bool型key-value



```
lisa_err_t lisa_perst_get_bool(const char *k, bool *out_v)
```

**参数**

   k				key值

   v				value

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	用于获取 bool 型 key-value



```
lisa_err_t lisa_perst_delete(const char *k)
```

**参数**

   k				key值

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	用于从数据中删除对应key-value

​	

```
lisa_err_t lisa_perst_clear(void)
```

**参数**

   void

**返回值**

​	成功返回	LISA_OK;	失败返回	LISA_FAIL

**说明**

​	清除为默认状态



#### 3.3 使用示例

```
static int
lisa_perst(int argc, char *argv[])
{
	int8_t useok = 0;
	if (argc < 2) {
		LISA_LOGE(TAG, "usage: %s set|get|del|clr|info string|int|bool key value \r\n", argv[0]);
		return 0;
	}

	if (strcmp(argv[1], "set") == 0) {
		if (strcmp(argv[2], "string") == 0) {
			char *key = NULL;
			char *value = NULL;
			key = argv[3];
			value = argv[4];
			LISA_LOGE(TAG, "set string %s %s \r\n", key, value);

			lisa_perst_init();
			lisa_perst_put_string(key, value);

			useok = 1;

		} else if (strcmp(argv[2], "int") == 0) {
			char *key = NULL;
			int value;
			key = argv[3];
			value = atoi(argv[4]);
			LISA_LOGE(TAG, "set int %s %d \r\n", key, value);

			lisa_perst_init();
			lisa_perst_put_int(key, value);

			useok = 1;
		} else if (strcmp(argv[2], "bool") == 0) {
			char *key = NULL;
			bool value;
			key = argv[3];
			value = atoi(argv[4]);
			LISA_LOGE(TAG, "set bool %s %d \r\n", key, value);

			lisa_perst_init();
			lisa_perst_put_bool(key, value);

			useok = 1;
		}
	} else if (strcmp(argv[1], "get") == 0) {
		if (strcmp(argv[2], "string") == 0) {
			char *key = NULL;
			char *value = NULL;
			key = argv[3];

			lisa_perst_init();
			lisa_perst_get_string(key, &value);

			LISA_LOGE(TAG, "get string %s %s \r\n", key, value);

			useok = 1;

		} else if (strcmp(argv[2], "int") == 0) {
			char *key = NULL;
			int value;
			key = argv[3];

			lisa_perst_init();
			lisa_perst_get_int(key, &value);

			LISA_LOGE(TAG, "get int %s %d \r\n", key, value);

			useok = 1;
		} else if (strcmp(argv[2], "bool") == 0) {
			char *key = NULL;
			bool value;
			key = argv[3];

			lisa_perst_init();
			lisa_perst_get_bool(key, &value);

			LISA_LOGE(TAG, "get bool %s %d \r\n", key, value);

			useok = 1;
		}
	} else if (strcmp(argv[1], "del") == 0) {
		char *key = NULL;
		char *value = NULL;
		key = argv[3];
		value = argv[4];

		lisa_perst_init();
		lisa_perst_delete(key);

		LISA_LOGE(TAG, "del string %s\r\n", key);

		useok = 1;
	} else if (strcmp(argv[1], "clr") == 0) {
		lisa_perst_init();

		lisa_perst_clear();

	} else if (strcmp(argv[1], "info") == 0) {
		lisa_perst_init();
		ef_print_env();
	}

	if (!useok) {
		LISA_LOGE(TAG, "usage: %s set|get|del string|int|bool key value \r\n", argv[0]);
	}
}

MSH_CMD_EXPORT(lisa_perst, persistence testself);
```





### 4. 电源模块

#### 4.1 简介

重启电源



#### 4.2 接口说明

```
void lisa_reboot(void)
```

**参数**

   void

**返回值**

​	void

**说明**

​	重启设备



### 5 异常跟踪

#### 5.1 简介

用于保存异常时环境，log 输出相关信息。异常类型如下：

```
    #define LISA_EXCEPTION_TYPE_DABT (1)			//data abort
    #define LISA_EXCEPTION_TYPE_PABT (2)			//prefech abort
    #define LISA_EXCEPTION_TYPE_UDEF (3)			//未定义指令
    #define LISA_EXCEPTION_TYPE_ASSERT (9)
```



#### 5.2 接口说明

```
uint8_t exception_get(void)
```

**参数**

   void

**返回值**

​	获取上次重启原因，见简介异常类型

**说明**

​	用于开机时获取上次重启原因



#### 5.3 使用示例

下面是某次异常的日志输出，相关信息分析

![img](/Users/terrence/Desktop/wrong_type.png)





### 6 Http模块

#### 6.1 简介

实现 https/http 模块的统一封装，提供 http 通信所需的通用接口



#### 6.2 接口说明

**接口**

```
lisa_http_t *lisa_http_init(lisa_http_request_t *req);
```

**参数**

   req    http配置参数

```
typedef enum {
	LISA_HTTP_GET,
	LISA_HTTP_POST,
	LISA_HTTP_PUT,
	LISA_HTTP_PATCH,
	LISA_HTTP_DELETE,
} lisa_http_method_e;		// http 请求类型

typedef struct {
	const void *buf;		// 传入的数据
	int32_t len;			// buf的数据长度
	void *user;				// 用户自定义类型
} lisa_http_data_t;			// http回调函数的入参类型

typedef struct {
	lisa_http_event_e what;		// 事件类型
	lisa_http_error_e error;	// 错误值
	const char *header;			//http的header
	uint16_t status_code;		// http的code值
} lisa_http_event_t;

typedef struct {
	lisa_http_method_e method;		// 请求类型，目前支持post和get
	const char *url;
	const char *headers;		
	void *body;
	int32_t body_len;  // 不定长度传 -1
	uint32_t timeout_ms;			// 等待延时（默认10ms，暂不支持修改）
	void *user;						// 回调函数需传回的数据
	void (*on_event)(lisa_http_event_t *event);  // 注册http事件通知时的回调
	void (*on_data)(lisa_http_data_t *data);	 // 注册http有数据收到时的回调函数
} lisa_http_request_t;
```

**返回值**

​	成功返回 http 实例；失败返回 NULL

**说明**

​	用于创建 http 实例，注册对应 http 意外事件和接收到数据的回调函数。



**接口**

```
lisa_http_err_e lisa_http_perform(lisa_http_t *ins);
```

**参数**

   ins		http 实例 

**返回值**

```
typedef enum {
  LISA_HTTP_OK = 0,			// http请求执行成功
  LISA_HTTP_COMMON_ERR,		// 
  LISA_HTTP_PARAM_ERROR,	// 参数错误
} lisa_http_err_e;
```

**说明**

​	http 的请求，目前实现 get 和 post 请求。



**接口**

```
lisa_http_err_e lisa_http_cleanup(lisa_http_t *ins);
```

**参数**

   ins		http实例

**返回值**

```
typedef enum {
  LISA_HTTP_OK = 0,			// http请求执行成功
  LISA_HTTP_COMMON_ERR,		// 
  LISA_HTTP_PARAM_ERROR,	// 参数错误
} lisa_http_err_e;
```

**说明**

	删除http实例，并清理内部开销。



#### 6.3  使用示例

​		配置 http 请求参数：>> lisa_http_test  init   http://www.rt-thread.com/service/echo  RT-Thread is an open source IoT operating system from China!

​		启动 http 发送请求：>>lisa_http_test  perform    

​		删除 http 配置并关闭 http 端口：>>lisa_http_test  cancel

```
#define HEADERS "Content-Type: application/octet-stream\r\n"

lisa_http_t *test_http = NULL;

void
get_http_data_cb(lisa_http_data_t *data)
{
	rt_kprintf("get_auth_data_cb ");
	if (data->buf) {
		rt_kprintf("%s", (char *)data->buf);
		rt_kprintf("\n");
	}
	if (data->user) {
		rt_kprintf("%p", (char *)data->user);
	}
}
int
lisa_http_test(int argc, char **argv)
{
	lisa_http_request_t http_param;

	if (rt_strcmp(argv[1], "init") == 0) {
		strcpy(http_param.url, argv[2]);
		strcpy(http_param.body, argv[3]);
		strcpy(http_param.headers, HEADERS);
		http_param.body_len = strlen(argv[3]);
		http_param.method = LISA_HTTP_POST;
		http_param.timeout_ms = 10;
		http_param.on_data = get_http_data_cb;
		http_param.on_event = NULL;
		http_param.user = NULL;
		test_http = lisa_http_init(&http_param);
	} else if (rt_strcmp(argv[1], "cancel") == 0) {
		lisa_http_cleanup(test_http);
	}
	if (rt_strcmp(argv[1], "perform") == 0) {
		lisa_http_perform(test_http);
	} else {
		rt_kprintf("params error\n");
	}
	return RT_EOK;
}

MSH_CMD_EXPORT(lisa_http_test, lisa_http_test testself);

```



### 7. Websocket

#### 7.1 简介

​		实现 Websocket通讯的 api 接口封装,用于 LISA 系统与云端的通信交互。

#### 7.2 接口说明

**接口**

```
lisa_ws_t *lisa_ws_init(lisa_ws_request_t *req);
```

**参数** 

```
typedef enum {
  LISA_WS_OK = 0,
  LISA_WS_COMMON_ERR,
} lisa_ws_err_e;

typedef enum {
  LISA_WS_ON_ERROR,
  LISA_WS_ON_HEADER,          // 多次发生
  LISA_WS_ON_CONNECTED,	      // 连接成功
  LISA_WS_ON_DISCONNECTED,	  // 断开连接
} lisa_ws_event_e;

typedef struct {
  lisa_ws_event_e what;		// websocket 事件类型
  const char *header;		// websocket结构中的header属性
  void *user;
} lisa_ws_event_t;

typedef enum {
  LISA_WS_TEXT,				// text文本文件
  LISA_WS_BIN,				// 二进制数据（主要用于语音传输和固件传输）
} lisa_ws_data_type_e;

typedef struct {
  lisa_ws_data_type_e type;					
  const void *buf;							// 收到的数据
  uint32_t len;								// 收到的数据长度，最长为2048
  void *user;								// 用户带入的参数
} lisa_ws_data_t;

typedef struct {
  char *scheme;                              // "ws" "wss"
  char *host;								 // ws时，为80，wss时为443
  char *path;								 // 
  uint32_t timeout_ms;						 // 数据等待超时,暂不支持更改（单位： ms）
  void *user;								 // 用户携带的传入到回调函数的参数
  void (*on_event)(lisa_ws_event_t *event);  // 状态变化时的状态事件回调  
  void (*on_data)(lisa_ws_data_t *data);     // 收到数据时的回调函数
} lisa_ws_request_t;
```

**返回值**

​		websocket 实体句柄

```
typedef struct {
	char scheme[16];     // "ws" "wss"
	char host[512];		 //  web的host
	char path[512];		 //  web的path
	uint16_t port;		 //  websocket连接的端口号
} url_info_t;

typedef struct {
	url_info_t u_info;		// 远端url数据
	rws_socket *socket;		// rws库对应的的socket结构体						
	uint32_t timeout_ms;    //  数据回应超时值（ms）
	void *user;				// 携带的原始用户数据						
	void (*inter_on_event)(lisa_ws_event_t *event);		// 收到数据是用户回调函数
	void (*inter_on_data)(lisa_ws_data_t *data);		// 事件通知的回调函数
} lisa_ws_t;
```

**说明**

​		注册 Websocekt 实例，成功后，该 Websocket 接口收到的数据会通过调用用户注册函数 on_data()，收到的网络数据将作为 on_data 的参数 lisa_ws_data_t中的 buf 传入。



**接口**

```  
lisa_ws_err_e lisa_ws_connect(lisa_ws_t *ins);
```

**参数**

​		websocket 实体

**返回值**

​		成功返回：LISA_WS_OK；    失败返回：LISA_WS_COMMON_ERR

**说明**

​		将配置好的websocket实体与服务端建立连接。



**接口**

```
lisa_ws_err_e lisa_ws_disconnect(lisa_ws_t *ins);
```

**参数**

​		websocket实体

**返回值**

​		成功返回：LISA_WS_OK；    失败返回：LISA_WS_COMMON_ERR

**说明**

​		将配置好的websocket实体与服务端断开连接。



**接口**

```
lisa_ws_err_e lisa_ws_send_text(lisa_ws_t *ins, const char *text);
```

**参数**

​		ins：  websocket实体

​		text： 发送的字符串 

**返回值**

​		成功返回：LISA_WS_OK；    失败返回：LISA_WS_COMMON_ERR

**说明**

​		 向ins实体发送 tex t字符串



**接口**

```
lisa_ws_err_e lisa_ws_send_binary(lisa_ws_t *ins, const void *buf, uint32_t len); 
```

**参数**

​		ins：  websocket实体

​		buf： 发送的二进制数据

​		len:   数据长度

**返回值**

​		成功返回：LISA_WS_OK；    失败返回：LISA_WS_COMMON_ERR

**说明**

​		 发送 len 长度的数据 buf



**接口**

```
lisa_ws_err_e lisa_ws_cleanup(lisa_ws_t *ins);
```

**参数**

​		websocket 实体

**返回值**

​		成功返回：LISA_WS_OK；    失败返回：LISA_WS_COMMON_ERR

**说明**



#### 7.3 使用示例

​		注册并配置 websocket 实例：>> lisa_rws_test  init   wss  echo.websocket.org    /  

​		连接到配置好的 websocket 实例：>>lisa_rws_test   conn

​		通过 websocket 发送文本数据：>>lisa_rws_test  test   hello,listenAI

​        通过 websocket 发送二进制数据：>>lisa_rws_test   bin

​		断开 websocket 连接：>>lisa_rws_test   disc

​		删除 websocket 配置并关闭 websocket 端口：>>lisa_rws_test   clean

```
void
test_ws_data_cb(lisa_ws_data_t *data)
{
	WS_DBG(TAG, "test_ws_data_cb.");
	if (data->buf) {
		rt_kprintf("%s", (char *)data->buf);
		rt_kprintf("\n");
	}
	if (data->type == LISA_WS_TEXT) {
		WS_DBG(TAG, " LISA_WS_TEXT");
	} else if (data->type == LISA_WS_BIN) {
		WS_DBG(TAG, " LISA_WS_BIN");
	}
}

uint8_t bin_data[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
static int
lisa_rws_test(int argc, char *argv[])
{
	lisa_ws_request_t lisa_ws_req;
	if (rt_strcmp(argv[1], "init") == 0) {
		if (rt_strcmp(argv[2], "wss") == 0) {
			lisa_ws_req.scheme = "wss";
		} else {
			lisa_ws_req.scheme = "ws";
		}
		lisa_ws_req.host = argv[3];
		lisa_ws_req.path = argv[4];
		lisa_ws_req.timeout_ms = 0;
		lisa_ws_req.on_data = test_ws_data_cb;
		lisa_ws_req.on_event = NULL;
		lisa_ws_req.user = NULL;
		lisa_ws = lisa_ws_init(&lisa_ws_req);
	} else if (rt_strcmp(argv[1], "conn") == 0) {
		lisa_ws_connect(lisa_ws);
	} else if (rt_strcmp(argv[1], "disc") == 0) {
		lisa_ws_disconnect(lisa_ws);
	} else if (rt_strcmp(argv[1], "clean") == 0) {
		lisa_ws_cleanup(lisa_ws);
	} else if (rt_strcmp(argv[1], "text") == 0) {
		lisa_ws_send_text(lisa_ws, argv[2]);
	} else if (rt_strcmp(argv[1], "bin") == 0) {
		lisa_ws_send_binary(lisa_ws, bin_data, sizeof(bin_data));
	}

	return RT_EOK;
}
MSH_CMD_EXPORT(lisa_rws_test, lisa_rws_test text);
```

