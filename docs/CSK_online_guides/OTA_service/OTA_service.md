---

id: developer_guides
title: OTA服务
slug: /CSK_online_guides/OTA_service

---

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

   },
   {
       "version":1001,
       "file_size":417164,
       "md5":"5DEBA6B85BEC67ED8A0C6438BBCAE1F9",
       "file_path":"files/master.bin"
   },
   {
      "version":1001,
      "file_size":3652226,
      "md5":"42EEFF98DD52E0189858C221330A1C85", 
      "file_path":"files/respak.bin"
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



## 2.OTA 业务流程

整体流程见下图：

- 触发检查更新条件时，设备端会请求 iFLYOS 自动更新API
- 云端返回固件 **info.txt** 和固件下载地址。
- 解析 info.txt 文件，将解析出的 `version` 与固件本地的 `version`，若云端 `version` 大于固件 ``version``，则说明有可用更新，进入下一步流程；
- 根据 info.txt 的内容，解析出云端固件包的内容，通常来说，固件包有三种情况：仅 CSK 固件、仅 XR872AT 固件、CSK 固件和  XR872AT 固件均更新。
- 若仅 CSK 更新，则 XR872AT 将固件下载下来后，通过串口传输至 CSK 中，由 CSK 实现固件更新；
- 若仅 XR872AT 更新，则通过 A/B update 的形式实现固件更新；
- 若 CSK 和 XR872AT 均更新，则先完成 XR872AT固件更新，之后 XR872AT再将可用更新传至 CSK 中；

![](./files/OTA_PROCESS.jpg)



## 3.如何在 iFLYOS 上配置OTA文件

你需要在 iFLYOS 平台的【自动更新】菜单栏上传固件包，操作说明如下：

![](./files/iFLYOS_OTA.png)

- 配置 OTA 固件时，索引配置文件必须命名为 **info.txt**。

- 平台配置 OTA，info.txt 中 file_path 必须为 **files/文件名** 的形式。

- CSK 固件升级主要是检查 file_path 为 master.bin 的 `version`，其余子包 `version` 均为预留字段，建议 CSK 固件升级将 CSK 字段下的子包 `version` 均统一增加，如果不需要升级 CSK 固件不用添加 CSK 信息。

- OS平台配置后，可通过重启设备或【小飞在线】APP 检查更新来进行 OTA 升级。

:::tips

1.OTA 服务是可选项，如果你有自己的 OTA 服务，也可自行实现 OTA 功能。

2.请确保固件中的 `OTA_SECRET` 字段与 iFLYOS 中保持一致，否则即使云端有可用更新，也会因校验不通过而 OTA 失败。

:::



## 4.OTA SDK 使用说明

接下来为你介绍 OTA 相关接口，有助于你实现 OTA 模块的二次开发。

- **EVS OTA接口**

固件源码中，与 iFLYOS 平台 OTA 服务交互的相关逻辑在 `listenai_sdk/modules/listenai_evs/evs_ota.c` 中，主要包括以下功能接口

| **函数名**                 | **功能说明**                                             | **参数与备注**                                               |
| -------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| evs_ota_init               | 初始化                                                   | 参数为一些 OTA 事件回调                                      |
| evs_ota_check_version      | 检查版本，可获取具体检查结 果                            |                                                              |
| evs_ota_update_new_version | 检查版本，通过回调的形式通 知是否需要升级                |                                                              |
| evs_ota_start_update       | 开始升级， evs_ota_update_new_version 后可通过此接口升级 | 与 evs_ota_update_new_version 搭配使用，分开是为了在检查和升级中  有一些自定义动作，可控流程 |
| evs_ota_get_state          | 获取当前 OTA 状态                                        |                                                              |
| evs_ota_destroy            | 销毁                                                     |                                                              |

以下为OTA接口调用的过程中，一些回调通知事件

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

Castor_EVB 整套通用 OTA 方案，包括 XR872AT 和 CSK 升级，代码在 `listenai_sdk/drivers/listenai_ota/evs_castor_ota.c` 中，主要包含以下接口

| **函数名**                    | **功能说明**                     | **参数与备注**                                               |
| ----------------------------- | -------------------------------- | ------------------------------------------------------------ |
| evs_ota_process               | OTA 升级接口                     | 参数为OTA配置文件的 url 地址，调用此接口便可通过配置信息进行 OTA 升级。返回 -1 表示检查配置失败，返回 -2 表示不需要更新 |
| evs_xr872_get_info            | 通过配置文件获取XR872AT 固件信息 |                                                              |
| evs_castor_get_info           | 通过配文件获取 CSK 固件信息      |                                                              |
| evs_castor_flashboot_get_info | 通过配置文件获取 CSK 固件信息    |                                                              |
| evs_castor_uart_get_info      | 通过配置文件获取 CSK 固件信息    |                                                              |
| evs_castor_respak_get_info    | 通过配置文件获取 CSK 固件信息    |                                                              |
| evs_get_version               | 获取当前默认 OTA 版本            | 需 flash 存储 OTA 版本号，否则此为默认版 本                  |

以下为 OTA 接口调用的过程中，一些回调通知事件

| **事件名**    | **功能说明**  | **备注**                                       |
| ------------- | ------------- | ---------------------------------------------- |
| e_ota_start   | 开始 OTA 升级 | evs_ota_process 调用后检查需要更新后通知的事件 |
| e_ota_success | OTA 升级成功  | evs_ota_process 调用后升级成功通知的事件       |
| e_ota_failed  | OTA 升级失败  | evs_ota_process 调用后升级失败通知的事件       |

**XR872AT OTA 接口**

XR872AT 固件升级接口，代码在 listenai_sdk/drivers/listenai_ota/evs_xr872_ota.c 中，主要包含以下 接口

| **函数名**            | **功能说明**           | 参数与备注**                                   |
| --------------------- | ---------------------- | ---------------------------------------------- |
| evs_xr872_ota_http    | XR872AT http升级接口   | 参数为 XR872AT 固件包 url，返回-1表示升 级失败 |
| evs_xr872_get_version | XR872AT 当前固件版本号 |                                                |

**Castor_EVB 版本号信息**

Castor_EVB 版本号和版本名信息在 listenai_sdk/listenai_version.h 中

| **字段名**             | **功能说明**       | **备注**                                       |
| ---------------------- | ------------------ | ---------------------------------------------- |
| CASTOR_VERSION_DEFAULT | CSK 默认版本号     |                                                |
| XR872_VERSION          | XR872AT 版本号     | 主版本号+次版本号+修订号形式                   |
| OTA_VERSION_DEFAULT    | OTA 方案默认版本号 | 需 flash 存储在线 OTA 版本号，否则此为默认版本 |