---
sidebar_position: 4
---

# OTA开发


> 本文主要介绍离在线方案的 OTA 服务，通过阅读本文，你将了解到：
>
> 1.OTA 文件说明
>
> 2.OTA 服务运行流程，
>
> 3.如何在 iFLYOS 上配置 OTA 文件
>
> 4.固件源码中 OTA SDK 的使用说明



## 1.OTA文件说明

OTA 包由三部分组成，分别是 **info.txt**、**WIFi SOC  固件**、**CSK 固件**，本文以 CSK+XR872AT 方案的 OTA 为例：

WIFi SOC 固件包，如 XR872AT.img；

CSK 固件包，包括 flashboot、respak.bin、master.bin，burner.img；

info.txt 是一个配置文件，描述 OTA 的具体升级信息，示例如下：

```c
{

"version":10020,
  
"xr872":[
{
"version":10020,
"file_size":47920,
"md5":"0AC03421791CDFFB7B73E8AA7B0FD8B4",
"file_path":"files/xr872.img"
}
],
  
 "castor":[
   {
      "version":1001,
      "file_size":47920,
      "md5":"0AC03421791CDFFB7B73E8AA7B0FD8B4",
      "file_path":"files/burner.img"
   },
   {
      "version":1001,
      "file_size":18280,
      "md5":"394474A9B07DCDA2233C676CC24EFD45", 
      "file_path":"files/flashboot.bin"
      "addr":"0x0"
   },
   {
       "version":1001,
       "file_size":417164,
       "md5":"5DEBA6B85BEC67ED8A0C6438BBCAE1F9",
       "file_path":"files/master.bin"
       "addr": "0x10000"
   },
   {
      "version":1001,
      "file_size":3652226,
      "md5":"42EEFF98DD52E0189858C221330A1C85", 
      "file_path":"files/respak.bin"
      "addr": "0x100000"  
   }
 ]
```

| **字段名**          | **字段说明**                                                 |
| ------------------- | ------------------------------------------------------------ |
| version             | 此次 OTA 的版本号，必须比前版本大，只要有 XR872AT 或者 CSK 中的一 个需要升级都需增加此版本号 |
| xr872               | 此次 OTA 中 XR872AT 固件相关信息，如果 XR872AT 不升级，可不需要 |
| xr872.version       | XR872AT 固件版本号                                           |
| xr872.file_size     | XR872AT 固件大小                                             |
| xr872.md5           | XR872AT 固件MD5                                              |
| xr872.file_path     | XR872AT 固件文件路径（ files/xr872 文件名），需跟上传的 XR872AT 文件名 一致，会通过 url + file_path 进行 OTA |
| castor              | 此次 OTA 中 CSK 相关信息，如果 CSK 不升级，可不需要          |
| castor[i].version   | CSK 固件子包版本号，master.bin的版本号为主，**默认为1000**   |
| castor[i].file_size | CSK 固件子包文件大小                                         |
| castor[i].md5       | CSK 固件子包 md5                                             |
| castor[i].file_path | CSK 固件子包路径（ files /子包文件名），需跟上传的文件名一致， 会通过 url + file_path 进行 OTA |
| castor[i].addr      | CSK固件子包地址，烧录固件时会对子包地址进行校验，校验通过方可烧录成功 |



## 2.OTA 业务流程

整体流程见下图：

- 触发检查更新条件时，设备端会请求 iFLYOS 自动更新API
- 云端返回固件 **info.txt** 和固件下载地址。
- 解析 info.txt 文件，将解析出的 `version` 与固件本地的 `version`，若云端 `version` 大于固件 ``version``，则说明有可用更新，进入下一步流程；
- 根据 info.txt 的内容，解析出云端固件包的内容，通常来说，固件包有三种情况：仅 CSK 固件、仅 XR872AT 固件、CSK 固件和  XR872AT 固件均更新。
- 若仅 CSK 更新，则 XR872AT 将固件下载下来后，通过串口传输至 CSK 中，由 CSK 实现固件更新；
- 若仅 XR872AT 更新，则通过 A/B update 的形式实现固件更新；
- 若 CSK 和 XR872AT 均更新，则先完成 XR872AT固件更新，之后 XR872AT再将可用更新传至 CSK 中；

![](./filescopy_ota/OTA_PROCESS.jpg)



## 3.如何在 iFLYOS 上配置OTA文件

你需要在 iFLYOS 平台的【自动更新】菜单栏上传固件包，操作说明如下：

![](./filescopy_ota/iFLYOS_OTA.png)

- 配置 OTA 固件时，索引配置文件必须命名为 **info.txt**。

- 平台配置 OTA，info.txt 中 file_path 必须为 **files/文件名** 的形式。

- CSK 固件升级主要是检查 file_path 为 master.bin 的 `version`，其余子包 `version` 均为预留字段，建议 CSK 固件升级将 CSK 字段下的子包 `version` 均统一增加，如果不需要升级 CSK 固件不用添加 CSK 信息。

- OS平台配置后，可通过重启设备或【小飞在线】APP 检查更新来进行 OTA 升级。

:::tip

1.OTA 服务是可选项，如果你有自己的 OTA 服务，也可自行实现 OTA 功能。

2.请确保固件中的 `OTA_SECRET` 字段与 iFLYOS 中保持一致，否则即使云端有可用更新，也会因校验不通过而 OTA 失败。

:::



## 4.OTA SDK 使用说明

接下来为你介绍 OTA 相关接口，有助于你实现 OTA 模块的二次开发。

- **EVS OTA接口**

固件源码中，与 iFLYOS 平台 OTA 服务交互的相关逻辑在 `listenai_sdk/modules/listenai_evs/evs_ota.c` 中，主要包括以下功能接口。

| **函数名**                 | **功能说明**                                             | **参数与备注**                                               |
| -------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| evs_ota_init               | 初始化                                                   | 参数为一些 OTA 事件回调                                      |
| evs_ota_check_version      | 检查版本，可获取具体检查结 果                            |                                                              |
| evs_ota_update_new_version | 检查版本，通过回调的形式通 知是否需要升级                |                                                              |
| evs_ota_start_update       | 开始升级， evs_ota_update_new_version 后可通过此接口升级 | 与 evs_ota_update_new_version 搭配使用，分开是为了在检查和升级中  有一些自定义动作，可控流程 |
| evs_ota_get_state          | 获取当前 OTA 状态                                        |                                                              |
| evs_ota_destroy            | 销毁                                                     |                                                              |

以下为OTA接口调用的过程中，一些回调通知事件。

| **事件名**             | **功能说明**            | **备注**                                         |
| ---------------------- | ----------------------- | ------------------------------------------------ |
| OTA_EVENT_NEW_VERSION  | 检查到新版本            | evs_ota_update_new_version 接口调用后通知的事件  |
| OTA_EVENT_START        | 开始升级                | evs_ota_start_update 接口调用后通知的事件        |
| OTA_EVENT_START_FAILED | 开始升级失败            | evs_ota_start_update 接口调用后通知的事件        |
| OTA_EVENT_SUCCESS      | 升级流程成功            | evs_ota_start_update 接口调用后通知的事件        |
| OTA_EVENT_FAILED       | 升级失败                | evs_ota_start_update 接口调用后通知的事件        |
| OTA_EVENT_UPGRADE_OK   | 重启后检查确认 升级成功 | 重启后检查升级成功通知的事件                     |
| OTA_EVENT_NONE         | 无新版本                | evs_ota_update_new_version 接口调 用后通知的事件 |

**Castor_EVB** **OTA接口**

Castor_EVB 整套通用 OTA 方案，包括 XR872AT 和 CSK 升级，代码在 `listenai_sdk/drivers/listenai_ota/evs_castor_ota.c` 中，主要包含以下接口。

| **函数名**                    | **功能说明**                     | **参数与备注**                                               |
| ----------------------------- | -------------------------------- | ------------------------------------------------------------ |
| evs_ota_process               | OTA 升级接口                     | 参数为OTA配置文件的 url 地址，调用此接口便可通过配置信息进行 OTA 升级。返回 -1 表示检查配置失败，返回 -2 表示不需要更新 |
| evs_xr872_get_info            | 通过配置文件获取XR872AT 固件信息 |                                                              |
| evs_castor_get_info           | 通过配文件获取 CSK 固件信息      |                                                              |
| evs_castor_flashboot_get_info | 通过配置文件获取 CSK 固件信息    |                                                              |
| evs_castor_uart_get_info      | 通过配置文件获取 CSK 固件信息    |                                                              |
| evs_castor_respak_get_info    | 通过配置文件获取 CSK 固件信息    |                                                              |
| evs_get_version               | 获取当前默认 OTA 版本            | 需 flash 存储 OTA 版本号，否则此为默认版 本                  |

以下为 OTA 接口调用的过程中，一些回调通知事件。

| **事件名**    | **功能说明**  | **备注**                                       |
| ------------- | ------------- | ---------------------------------------------- |
| e_ota_start   | 开始 OTA 升级 | evs_ota_process 调用后检查需要更新后通知的事件 |
| e_ota_success | OTA 升级成功  | evs_ota_process 调用后升级成功通知的事件       |
| e_ota_failed  | OTA 升级失败  | evs_ota_process 调用后升级失败通知的事件       |

**XR872AT OTA 接口**

XR872AT 固件升级接口，代码在 listenai_sdk/drivers/listenai_ota/evs_xr872_ota.c 中，主要包含以下接口。

| **函数名**            | **功能说明**           | 参数与备注**                                   |
| --------------------- | ---------------------- | ---------------------------------------------- |
| evs_xr872_ota_http    | XR872AT http升级接口   | 参数为 XR872AT 固件包 url，返回-1表示升 级失败 |
| evs_xr872_get_version | XR872AT 当前固件版本号 |                                                |

**Castor_EVB 版本号信息**

Castor_EVB 版本号和版本名信息在 listenai_sdk/listenai_version.h 中。

| **字段名**             | **功能说明**       | **备注**                                       |
| ---------------------- | ------------------ | ---------------------------------------------- |
| CASTOR_VERSION_DEFAULT | CSK 默认版本号     |                                                |
| XR872_VERSION          | XR872AT 版本号     | 主版本号+次版本号+修订号形式                   |
| OTA_VERSION_DEFAULT    | OTA 方案默认版本号 | 需 flash 存储在线 OTA 版本号，否则此为默认版本 |

## 5. OTA协议

本文档描述了CSK4002的串口下载方法，通过串口的方式，将用户代码拷贝到RAM或者FLASH区域，可用于用户方案开发，并开放上位机和下位机代码以及协议解析。

### 数据格式解析

数据格式较为简单，主机发送由SLIP转化的数据请求到CSK4002芯片，再由CSK4002数据芯片回应刚才的请求给上位机（SLIP协议转化），本章主要描述了请求格式、回应格式、错误码以及指令码四个方面的内容。

#### 底层传输协议

底层传输协议采用SLIP传输协议，包头和包尾均由0xC0包裹，中间数据区域的0xC0和0xDB将会替换为0xDB 0xDC 和 0xDB 0xDD。

#### 请求数据格式

| Byte| Name | Comment |
| ----| ---- | ---- |
| 0| Direction | 总是0x00 |
| 1| Command | 参考[指令列表](#26指令列表) |
| 2-3| Size | Data数据区域的长度 |
| 4-7| Checksum | 只有在FLASH_DATA 和 MEM_DATA两个指令有效，其他指令时都为0 |
| 8..n| Data | 数据传输区域，当在Command为FLASH_DATA 和 MEM_DATA时，该区域遵守Data协议，其他指令则都直接将数据按位放在该区域 |

#### 回应数据格式

| Byte| Name | Comment |
| ----| ---- | ---- |
| 0| Direction | 总是0x01 |
| 1| Command | 参考[指令列表](#26指令列表) |
| 2-3| Size | Data数据区域的长度 |
| 4-7| Value | 0x00 |
| 8| Error | 0x00表示成功，0x01表示失败 |
| 9| Status | 如果传输失败时候的失败原因，否则为0x00 |
| 10-17| MD5 | 只有当发送过来的Command为SPI_FLASH_MD5时该区域才有效 |

#### 错误状态码

| Name| Data | Comment |
| ----| ---- | ---- |
| TRANSMIT_PASS| 0x0 | 传输成功 |
| DATA_STREAM_OVERFLOW| 0x1 | 数据缓冲区溢出错误 |
| TRANSFORM_FORMAT_ERROR| 0x2 | 格式转化错误 |
| ILLEGAL_DATA_PACKET| 0x3 | 非法数据 |
| CHECKSUM_FAILED| 0x4 | 数据校验错误 |
| COMMAND_SEQUENCE_ERROR| 0x5 | 指令顺序错误 |
| DATA_ID_SEQUENCE_ERROR| 0x6 | 数据指令ID顺序错误 |
| FLASH_ERROR| 0x8 | FLASH写入错误 |
| UNSUPPORT_COMMAND| 0x9 | 未支持指令 |

#### Data区域数据格式

| Byte| Name | Comment |
| ----| ---- | ---- |
| 0-3| Data Length | Data To Write区域的数据长度 |
| 4-7| Number | 从0开始的数据编号 |
| 8-15| 0|  |
| 16..n| Data To Write | 数据负载，最大负载为PROXY_UART_RX_MAX ROM通讯时则为 ROM_UART_RX_MAX|

 #### 指令列表

 | Command| Data | Description | Input Data|
 | ----| ---- | ---- |---- |
 | FLASH_BEGIN| 0x02 | 开始FLASH下载 |总共4个WORD数据，分别为：总传输大小；传输PACKET数量；每个PACKET大小；起始地址（绝对地址） |
| FLASH_DATA| 0x03 | FLASH下载数据 |参考[Data区域](#25data区域数据格式) |
| FLASH_END| 0x04 | FLASH下载结束 |只有1个WORD数据<br/>0x00：表示下载完成后下位机自动重启<br/>0x02：表示下载完成后下位机仍然运行|
| MEM_BEGIN| 0x05 | 开始Memory下载 |总共4个WORD数据，分别为：总传输大小；传输PACKET数量；每个PACKET大小；起始地址（绝对地址） |
| MEM_END| 0x06 | Memory下载结束 |总共2个WORD数据，第一个WORD<br/>0x00：表示下载完成后下位机自动重启<br/>0x01：表示下载完成后跳转到第二个WORD数据的地址<br/>第二个WORD只有在第一个WORD为0x01时有效<br/>0x02：表示下载完成后下位机仍然运行|
| MEM_DATA| 0x07 | Memory下载数据 |参考[Data区域](#25data区域数据格式) |
| SYNC|0x08 | 同步 | 同步信号，总共36 WORD数据：0x07 0x07 0x12 0x20 在跟32个 0x55 |
| CHANGE_BAUDRATE| 0x0f | 改变波特率 |总共有2个WORD 参数，分别为改变的波特率；当前的波特率 |
| SPI_FLASH_MD5|0x13 | MD5校验 |总共有4个WORD参数，分别是：校验起始位置（绝对地址）；校验大小；0；0； |
| ERASE_FLASH| 0xd0 | 擦除整个FLASH | 无 |

### 传输过程

串口下载的整个过程，分为ROM通讯、建立代理、数据下载三个部分，每个部分都会涉及上一章提及的传输格式。

#### ROM通讯

CSK4002芯片上电，会直接进入ROM程序，在ROM程序未检出FLASH上面有image文件时，会自动进入UART接收等待，


在ROM阶段发送SYNC指令，可以检查ROM是否进入UART等待接收阶段，这样便于后续的代理建立。

#### 建立代理


代理文件源码，见本文目录下的fireware文件夹，下载代理的目的在于将程序运行控制权，从ROM区域转移到代理区域，并支持FLASH下载，波特率切换，MD5校验等功能。


上位机可以通过发送MEM_BEGIN、MEM_DATA将代理文件发送至ROM侧，ROM UART接收代码会将该文件加载到SRAM区域，最后通过MEM_END，在发送结束的时候将程序的控制权完全交给代理。

#### 数据下载


当控制权完全由下载代理掌控后，指令列表里的所有指令都可以使用，用户可以在这个阶段进行FLASH下载，RAM下载，切换波特率，MD5校验等。


下面几节都会介绍各个指令的数据格式内容，但是都未进行SLIP处理，在实际数据发送的时候都需要进行SLIP处理，相关SLIP处理代码详见pc_tool文档内protocol目录下的slip文件夹。


#### FLASH下载

FLASH下载过程中，可以使用 FLASH_BEGIN、FLASH_DATA、FLASH_END三个指令。每发送一包数据，都需要上位机等待接收回应。

##### FLASH_BEGIN

| Byte| Name | Data |
| ----| ---- | ---- |
| 0| Direction | 0x00 |
| 1| Command | 0x02 |
| 2-3| Size | 0x00 0x18 |
| 4-7| Checksum | 0xXX 0xXX 0xXX 0xXX |
| 8-11| Total | 0xXX 0xXX 0xXX 0xXX（根据需要传输的数据量来定，无对齐要求） |
| 12-15| Packet Number | 0xXX 0xXX 0xXX 0xXX（需要传输的Packet数据量） |
| 16-19| Packet Size | 0xXX 0xXX 0xXX 0xXX（每一个Packet的负载大小） |
| 20-23| Address | 0xXX 0xXX 0xXX 0xXX（FLASH下载数据的起始地址，使用CSK4002芯片，该起始地址大于0x8000 0000 小于 0x8080 0000） |

该数据包只需要传输一次，将接下来需要传输的信息通知代理

##### FLASH_DATA

| Byte| Name | Data |
| ----| ---- | ---- |
| 0| Direction | 0x00 |
| 1| Command | 0x03 |
| 2-3| Size | 0xXX 0xXX |
| 4-7| Checksum | 0xXX 0xXX 0xXX 0xXX |
| 8-11| Data Length | 0xXX 0xXX 0xXX 0xXX（根据需要传输的数据量来定，无对齐要求） |
| 12-15| Number | 0xXX 0xXX 0xXX 0xXX（默认从0开始，每发送一个FLASH_DATA则加一，直到发送FLASH_END才清空） |
| 16-23| NULL | 0x0 |
| 24..n| Data To Write | 需要发送的数据 |

该指令会根据数据大小发送多次，每次该数据包的负载都是固定且不会特别巨大，避免因为数据错误导致重传浪费时间

##### FLASH_END

| Byte| Name | Data |
| ----| ---- | ---- |
| 0| Direction | 0x00 |
| 1| Command | 0x04 |
| 2-3| Size | 0xXX 0xXX |
| 4-7| Checksum | 0xXX 0xXX 0xXX 0xXX |
| 8-11| Flag | 根据需求发送，详见 指令列表 |

该指令只需要发送一次，发送完成及表示数据发送完成

#### RAM 下载

类似于FLASH下载，只是将FLASH_BEGIN、 FLASH_DATA、 FLASH_END换成MEM_BEGIN 、MEM_DATA、 MEM_END。

##### 波特率切换

| Byte| Name | Data |
| ----| ---- | ---- |
| 0| Direction | 0x00 |
| 1| Command | 0x0f |
| 2-3| Size | 0x00 0x10 |
| 4-7| Checksum | 0xXX 0xXX 0xXX 0xXX |
| 8-11| New | 0xXX 0xXX 0xXX 0xXX（需要更改的波特率） |
| 12-15| Old | 0xXX 0xXX 0xXX 0xXX（当前波特率） |

切换波特率需要注意的地方在于，该指令的数据发送和接收都依旧采用老的波特率，所以上位机需要在下位机回应完成后再切换当前波特率。默认的通讯波特率是115200，最高可以切换到3Mb的波特率。

##### MD5校验

| Byte| Name | Data |
| ----| ---- | ---- |
| 0| Direction | 0x00 |
| 1| Command | 0x13 |
| 2-3| Size | 0x00 0x18 |
| 4-7| Checksum | 0xXX 0xXX 0xXX 0xXX |
| 8-11| Address | 0xXX 0xXX 0xXX 0xXX（校验起始地址） |
| 12-15| Size | 0xXX 0xXX 0xXX 0xXX（需要校验的大小） |
| 16-19| 0 | NULL |
| 20-23| 0 | NULL |

### 代理性能评估

<table>
   <tr>
      <th rowspan="3" align="center">含下载代理、无MD5校验</th>
      <th  align="center">波特率</th>
      <th  align="center">1M</th>
      <th  align="center">2M</th>
      <th  align="center">3M</th>
      <th  align="center">速度</th>
   </tr>
    <tr>
      <th  align="center">1536000</th>
      <th  align="center">24s</th>
      <th  align="center">42s</th>
      <th  align="center">60s</th>
      <th  align="center">21s/M</th>
   </tr>
   <tr>
      <th  align="center">3000000</th>
      <th  align="center">21s</th>
      <th  align="center">37s</th>
      <th  align="center">52s</th>
      <th  align="center">18.3s/M</th>
   </tr>
   <tr>
      <th rowspan="2" align="center">测试同上，传输大小为8K一包</th>
      <th  align="center">1536000</th>
      <th  align="center">20s</th>
      <th  align="center">33s</th>
      <th  align="center">46s</th>
      <th  align="center">16.5s/M</th>
   </tr>
    <tr>
      <th  align="center">3000000</th>
      <th  align="center">20s</th>
      <th  align="center">34s</th>
      <th  align="center">46-47s</th>
      <th  align="center">16.6s/M</th>
   </tr> 
    <tr>
      <th rowspan="3" align="center">含下载代理、MD5校验</th>
      <th  align="center">波特率</th>
      <th  align="center">1M</th>
      <th  align="center">2M</th>
      <th  align="center">3M</th>
      <th  align="center">速度</th>
   </tr>
    <tr>
      <th  align="center">1536000</th>
      <th  align="center">25s</th>
      <th  align="center">43s</th>
      <th  align="center">61s</th>
      <th  align="center">21.5s/M</th>
   </tr>
   <tr>
      <th  align="center">3000000</th>
      <th  align="center">22s</th>
      <th  align="center">37s</th>
      <th  align="center">53s</th>
      <th  align="center">18.67s/M</th>
   </tr>
   <tr>
      <th rowspan="2" align="center">测试同上，传输大小为8K一包</th>
      <th  align="center">1536000</th>
      <th  align="center"></th>
      <th  align="center"></th>
      <th  align="center">48s</th>
      <th  align="center"></th>
   </tr>
    <tr>
      <th  align="center">3000000</th>
      <th  align="center"></th>
      <th  align="center"></th>
      <th  align="center"></th>
      <th  align="center"></th>
   </tr>
    <tr>
      <th rowspan="3" align="center">不含代理、无MD5校验</th>
      <th  align="center">波特率</th>
      <th  align="center">1M</th>
      <th  align="center">2M</th>
      <th  align="center">3M</th>
      <th  align="center">速度</th>
   </tr>
    <tr>
      <th  align="center">1536000</th>
      <th  align="center">19s</th>
      <th  align="center">36s</th>
      <th  align="center">54s</th>
      <th  align="center">18.17s/M</th>
   </tr>
   <tr>
      <th  align="center">3000000</th>
      <th  align="center">17s</th>
      <th  align="center">32s</th>
      <th  align="center">47s</th>
      <th  align="center">16s/M</th>
   </tr>
   <tr>
      <th rowspan="2" align="center">测试同上，传输大小为8K一包</th>
      <th  align="center">1536000</th>
      <th  align="center"></th>
      <th  align="center"></th>
      <th  align="center">45s</th>
      <th  align="center">15s/M</th>
   </tr>
      <tr>
      <th  align="center">3000000</th>
      <th  align="center">16s</th>
      <th  align="center">29s</th>
      <th  align="center">42s</th>
      <th  align="center">14.5s/M</th>
   </tr>
    <tr>
      <th rowspan="3" align="center">不含代理、有MD5校验</th>
      <th  align="center">波特率</th>
      <th  align="center">1M</th>
      <th  align="center">2M</th>
      <th  align="center">3M</th>
      <th  align="center">速度</th>
   </tr>
    <tr>
      <th  align="center">1536000</th>
      <th  align="center">20s</th>
      <th  align="center">37s</th>
      <th  align="center">55s</th>
      <th  align="center">18.67s/M</th>
   </tr>
   <tr>
      <th  align="center">3000000</th>
      <th  align="center">17s</th>
      <th  align="center">33s</th>
      <th  align="center">48s</th>
      <th  align="center">16.3s/M</th>
   </tr>
    <tr>
      <th colspan="6" align="left">Note:3M波特率传输存在一定的不稳定性，会有重传现象，所以测量时间会有一定的波动</th>
   </tr>
    <tr>
      <th colspan="6" align="left">当采用8K数据包的时候，明显下位机的烧录远远慢于传输，在传输flash end会有很长的时间去等待下位机去烧写数据</th>
   </tr>
</table>

### 参数

代理程序内的数据通讯BUFFER大小参数，通讯数据包不能大于这个值

PROXY_UART_RX_MAX 16384 Bytes

ROM程序内的数据通讯BUFFER大小参数，通讯数据包不能大于这个值


ROM_UART_RX_MAX 2048 Bytes







