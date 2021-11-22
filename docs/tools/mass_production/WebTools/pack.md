---
sidebar_label: 烧录包制作工具
sidebar_position: 1
---

# 烧录包制作工具

#### 1 背景说明

存在部分非LISA项目（由旧版LStudio打包生成），无法直接在用聆思烧录器进行芯片/模组烧录。烧录包制作工具能够将非LISA固件转换为聆思烧录器可烧录的lpk包。

#### 2 适用范围

该工具支持包含master.bin等bin文件资源的zip格式固件，zip中还可包含定义烧录分区表配置信息的usb_burn.bat。

#### 3 入口

- 通过[cloud.listenai.com](https://cloud.listenai.com/)打开LSCloud（首次使用该工具前请重新登录LSCloud）
- 打开需要制作烧录包的LSCloud项目（如未新建过LSCloud项目，需要新建后使用），通过项目侧边栏菜单进入，如图

<div  align="center"><img
  src={require('./files/打包工具入口.png').default}
  width="100%"
  alt="Example banner"
/></div>

:::info 

如工具打开为空白页，请将浏览器更新至最新版本后再使用（建议使用v89以上的Chrome版本）

:::

#### 4 使用方法

- **首先确认您手中的固件属于以下格式：**


a.包含usb_burn.bat脚本的**zip包**格式固件，可用于脚本烧录。

b.不包含usb_burn.bat脚本的**zip包**形式，可用CastorFactorytool烧录。 

固件目录结构的image目录下包含了固件资源：

| 序号 | 文件名        | 备注                 |
| ---- | ------------- | -------------------- |
| 1    | flashboot.bin | 必须                 |
| 2    | master.bin    | 必须                 |
| 3    | respak.bin    | 必须                 |
| 4    | xxx.bin    | 可能包含的其他资源文件 |

- **打开工具，将待转换的固件上传至首页**，如下图：

   如此过程报错，说明固件不属于聆思固件的目录结构，需要调整后重新上传；或固件并非zip格式压缩包，需要转换格式

<div  align="center"><img
  src={require('./files/打包工具首页.png').default}
  alt="Example banner"
/></div>

- **填写项目ID、项目名称、固件版本等信息**。如不需要切换LSCloud项目，则不需要修改项目ID和项目名称。

  如提示“登录状态已过期”，表示token获取失败，重新登录LSCloud可解决。


<div  align="center"><img
  src={require('./files/打包工具_信息填写.png').default}
  alt="Example banner"
/></div>

:::caution 注意：

由于烧录生产相关的实时情况会上传到该项目中，请如实填写LSCloud项目ID，避免需要分析烧录问题时无法获取日志

:::

- **转换成功，下载lpk包**。

#### 5 烧录包验证方法

- 方法1：使用[烧录包信息打印工具](/tools/Mass_Production/WebTools/print)打印出LPK包中资源文件的MD5，确认与原zip包固件中的资源是否一致

- 方法2：方案商或烧录厂使用聆思烧录器进行烧录，观察是否烧录成功，并使用[烧录包校验工具](/tools/Mass_Production/WebTools/verify)校验，观察烧录进去的固件与原固件是否一致