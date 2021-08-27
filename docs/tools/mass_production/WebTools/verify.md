---
sidebar_label: 芯片烧录包校验工具
sidebar_position: 3
---

# 芯片烧录包校验工具

#### 1 背景说明

芯片烧录包校验工具能够将芯片中烧录的固件与PC端的原始固件做对比，判断是否一致。

#### 2 适用范围

该工具仅支持校验聆思生态工具制作的lpk格式芯片烧录包，校验者需要配置树莓派与聆思2.0以上版本的芯片烧录座。

#### 3 入口
入口1：点击链接https://tool.listenai.com/verify

入口2：打开需要校验烧录包的LSCloud项目，通过项目侧边栏菜单进入，如图

<div  align="center"><img
  src={require('./files/image-20210720223100071.png').default}
  width="50%"
  alt="Example banner"
/></div>

:::info 

如工具打开为空白页，请将浏览器更新至最新版本后再使用（建议使用v89以上的Chrome版本）

:::

#### 4 使用方法

使用前，请准备好：

1. 聆思2.0及以上版本的芯片烧录座*1
2. 2.0USB转串口线*1

- 通过USB转串口线将芯片烧录座与PC连接，此时烧录座上的红绿蓝三色灯会亮起。如图

![](./files/校验工具连接.jpg)

- 打开校验小工具，上传需要校验的原始lpk包，点击`开始校验`
- 选择对应的COM口，点击`连接`，开始校验
- 弹窗显示的即为校验结果，如图

![](./files/校验工具_校验结果.png)

- 如需更换芯片、COM口或原始固件，请关闭校验结果弹窗，根据提示更换

<div  align="center"><img
  src={require('./files/校验工具_更换.png').default}
  width="50%"
  alt="Example banner"
/></div>

