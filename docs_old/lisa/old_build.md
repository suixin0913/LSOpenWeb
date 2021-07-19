---
id: build_old_project
title: 为旧项目烧录固件
slug: /build_old_project
---

>本文介绍如何如何使用 LISA 提供的软件包，在不破坏性变更旧项目的情况下。使用 LISA 命令行给旧项目进行烧录。
旧项目：指不是通过 `lisa create` 创建的CSK项目。

## 1.确认旧项目的文件夹名称

由于 LISA 命令行工具的限制，使用 LISA 命令行的**项目文件夹名称必须为英文字母、数字、下划线组成**。如果原有项目文件夹名称为中文，需要先进行名称修改。

## 2.初始化旧项目

在旧项目使用 LISA 命令前，请在旧项目目录下执行 `lisa init` 命令，对项目进行 LISA 初始化。该操作不会破坏项目结构，原有所有项目中的操作都可以保留。

```shell
PS C:\Users\oralzl\Desktop\芯片业务\项目工程文件\cskProject> lisa init
  √ 文件初始化
  √ 安装lisa核心库
```

## 3.安装 @tool/csk-old-build

`@tool/csk-old-build` 是一个 LISA 软件包。支持对 CSK 旧项目构建出 LPK 文件。在得到 LPK 文件后才可以使用 `lisa flash` 完成固件烧录。

在项目目录下执行 `lisa install @tool/csk-old-build` ，安装 `@tool/csk-old-build`。

```shell
PS C:\Users\oralzl\Desktop\芯片业务\项目工程文件\cskProject> lisa install @tool/csk-old-build
安装依赖... 成功
```

## 4.构建 LPK 文件

在正式构建 LPK 文件之前，请务必保证 CSK 旧项目已经完成打包目标固件。**工具依赖旧项目的打包产物**生成 LPK 文件。

确保旧项目已经打包后，在命令执行 `lisa task oldBuild:package`

```shell
PS C:\Users\oralzl\Desktop\芯片业务\项目工程文件\cskproject1> lisa task oldBuild:package
  √ 打包lpk包
```

看到以上结果代表 LPK 文件已经构建完成，产物输出为 `.target\output\debug\burner.lpk`。

## 5.使用 LISA 烧录固件

在当前项目中，打开命令行终端，输入 `lisa flash` ，触发固件烧录流程。

```shell
PS C:\Users\oralzl\Desktop\芯片业务\项目工程文件\cskproject1> lisa flash
  √ 解压LPK文件
  √ 解析配置文件
bin list > flashboot(0),master(0x10000),respak(0x100000),script(0xf0000)
[-]设备请进入烧录模式...
烧录分区 1｜ ████████████████████████████████████████ | 17.85 KB/17.85 KB | flashboot(0)
烧录分区 2｜ ████████████████████████████████████████ | 474.36 KB/474.36 KB | master(0x10000)
烧录分区 3｜ ████████████████████████████████████████ | 4369.05 KB/4369.05 KB | respak(0x100000)
烧录分区 4｜ ████████████████████████████████████████ | 3.91 KB/3.91 KB | script(0xf0000)
烧录完成
```

