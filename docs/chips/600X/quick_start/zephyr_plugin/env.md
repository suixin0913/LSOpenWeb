---
title: env 设置
sidebar_position: 3
---

## 命令

```shell
lisa zep use-env
```

__选项__

|  参数   | 描述  |
|  ----   | ----  |
| -h | 打印帮助 |
|  <env\>   | 编译环境 |
| --clear  | 清除环境设置 |
| --update | 更新已设置的环境 |

## 示例

### 查看当前设置的 env

__命令__

```shell
lisa zep use-env
```

__解释__

该命令会输出当前已设置的编译环境 env。

### 清除 env

__命令__

```shell
lisa zep use-env --clear
```

__解释__

该命令会清除已设置的编译环境 env。

### 设置 env

__命令__

```shell
lisa zep use-env csk6
```

__解释__

该命令会将当前编译环境设置为 csk6 ，将编译csk6时所需的编译链，环境变量等设置进沙盒环境中。

__已支持的 env__

[__csk6__](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fcsk6)

[__csk6-dsp__](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fcsk6-dsp)

[__esp32-c3__](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fesp32-c3)

[__nucleo-l552ze-q__](https://lpm.listenai.com/lpm/info?keyword=%40lisa-env%2Fnucleo-l552ze-q)

### 设置多个 env

__命令__

```shell
lisa zep use-env csk6 csk-dsp
```

__解释__

该命令会将当前编译环境设置为 [csk6, csk-dsp]，将编译 csk6, csk-dsp 时所需的编译链，环境变量等设置进沙盒环境中，并以第一个编译环境作为主编译环境。

