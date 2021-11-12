---
title: 基于Lisa的Zephyr开发
sidebar_position: 2
---

### 设置sdk

```shell
lisa zep use-sdk [path]
```

### 设置编译环境

```shell
lisa zep use-env [env]
```

#### 当前已支持的env：

__csk6__ [@lisa-env/csk6](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fcsk6)

```shell
lisa zep use-env csk6
```

__esp32-c3__ [@lisa-env/esp32-c3](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fesp32-c3)

```shell
lisa zep use-env esp32-c3
```

### 固件编译

#### 命令:
```shell
lisa zep build [project_path] -b [board] --clean
```

#### 参数解析

| 参数 | 解析 | 必填 |
| -- | -- | -- |
| project_path | 项目相对或绝对目录，若不带该参，默认为执行命令当前目录 | 否 |
| board | 板型 | 是 |
| clean | 清除编译产物 | 否 |

其余参数与__west__保持一致

#### demo：
```shell
lisa zep build .\samples\hello_world -b esp32c3_devkitm
```

### 固件烧录

#### 命令
```shell
lisa zep flash [project_path]
```

#### 参数解析

| 参数 | 解析 | 必填 |
| -- | -- | -- |
| project_path | 项目相对或绝对目录，若不带该参，默认为执行命令当前目录 | 否 |

#### demo：
```shell
lisa zep flash .\samples\hello_world
```
