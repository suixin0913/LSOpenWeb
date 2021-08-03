---
sidebar_label: 方案介绍
sidebar_position: 1
---

# 方案介绍

> 通过本篇文章你将了解到：
- 离线语音交互方案的原理、使用场景
- 聆思离线语音交互方案说明和方案优势
- 使用聆思离线语音交互方案的落地案例

> 观看视频课程：[离线语音交互方案介绍](https://www.bilibili.com/video/BV1JV411H763)

## 离线语音交互控制优势

传统家电控制方式有以下缺点：
- 按键控制：需要走近产品，按键复杂，不方便老人和小孩使用；
- 遥控控制：找不到遥控器，并且容易丢失和损坏；
- APP控制：需要给设备配网，每次控制都需要打开APP；
- 智能音箱控制：需要给设备配网，依赖智能音箱，响应慢，不保护隐私。

:::info
使用离线语音交互方案，综合用户体验最佳，是极具性价比的智能解决方案。
:::

## 离线语音交互场景

通常语音模组（CSK）承担前端声学处理、唤醒词/命令词识别等工作，并将识别结果通过串口指令发送到产品原MCU上，随后由原MCU实现产品控制。
![](./files_new/files_Scheme_introduction/Interactive_scenario.png)


## 离线语音交互处理逻辑

![](./files_new/files_Scheme_introduction/Interaction_principle.png)

## 聆思离线语音交互方案

基于CSK4002芯片打造，方案满足多种环境降噪需求，拥有强大的语音交互效果。

| 方案名称 | **C4203-L02C** |
|----|-----------------|
| 芯片       | 4002                               |
| 麦克风阵列   | 2mic                               |
| 命令词数量 | 最多200条                          |
| 功耗        | 130mA@5V                           |
| 适用环境   | 客卧、卫浴、厨房、阳台、会议、卖场 |
| 综合唤醒率        | 95%                                |
| 综合识别率   | 93%                                |
| 误唤醒  | ≤1次/72小时                        |
| 全双工交互       | 支持                               |
| 外语交互   | 英语、日语                         |
| 在线语音交互    | 支持                               |

:::info
- 唤醒率 ≥ 95% 
- 识别率 ≥ 93% 
- 误唤醒 ≤ 1次/72小时
- 支持200条命令词
:::

![](./files_new/files_Scheme_introduction/effect.png)


### 核心优势一：业界首发全栈神经网络的声学算法

- 支持由客卧场景扩展到家庭全场景语音交互
- 支持波束形成、声源定位、去混响、回声消除、语音分离 

![](./files_new/files_Scheme_introduction/algorithm.png)

:::info 风扇降噪音频示例
降噪前：
<audio id="audio" controls preload>
      <source id="mp3" src="/audio/audio1.mp3"/>
</audio>

降噪后：
<audio id="audio" controls preload>
      <source id="mp3" src="/audio/audio2.mp3"/>
</audio>
:::

:::info 厨房降噪音频示例
降噪前：
<audio id="audio" controls preload>
      <source id="mp3" src="/audio/audio3.mp3"/>
</audio>

降噪后：
<audio id="audio" controls preload>
      <source id="mp3" src="/audio/audio4.mp3"/>
</audio>
:::

### 核心优势二：全新离线语音唤醒识别架构

机器自动搜索和设计最优网络和参数，效果优于人工设计网络；
:::info 
- 全场景唤醒率>95%；语音识别率>93%;
- 误唤醒率：连续电视冲击<1次/72H；
- 睡眠场景，0次/7*24H
:::

## 落地案例

### 智能空调（C4203-L02C）
背景：
- 空调行业知名品牌HR、YM，一直有智能空调规划战略，在当前竞争激烈的市场中通过创新方案进一步提高产品竞争力。

主要需求：
- 高标准的唤醒识别率
- 72小时家居场景误唤醒低于3次

推荐方案：
![](./files_new/files_Scheme_introduction/conditioner.png)

### 智能中控面板（C4203-L02C）
背景：
- 面板行业头部品牌，成立智能中控面板部门，专门对接CSK语音智能面板方案。

主要需求：
- 面板作为本地中控，通过2.4G协议控制其他家电
- 5m嘈杂环境88%唤醒识别率
- 190+命令词

推荐方案：
![](./files_new/files_Scheme_introduction/mianban.png)



