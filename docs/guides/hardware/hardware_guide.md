---
id: hardware_guide
title: 快速设计CSK硬件
slug: /hardware_guide
---

>本篇介绍如果进行CSK芯片的硬件设计。
读完本文后，你将学习到：
- 声学结构设计。
- 如何进行 CSK 硬件选型和设计。
- 进行语音模组量产的注意事项。



## 1.结构设计

语音唤醒与识别能力除了与软件的算法相关外，还与产品的结构设计息息相关。为了保证良好的声学效果，我们建议结构设计先于硬件设计。

| 文件                             | 更新时间   | 操作                                                         |
| -------------------------------- | ---------- | ------------------------------------------------------------ |
| **麦克风阵列设计参考手册_v1.4.pdf** | 2021.02.03 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E9%BA%A6%E5%85%8B%E9%A3%8E%E9%98%B5%E5%88%97%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%E6%89%8B%E5%86%8C_v1.4.pdf)|
| **麦克风阵列录音标准实施指导手册_v1.0.pdf** | 2021.02.03 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E9%BA%A6%E5%85%8B%E9%A3%8E%E9%98%B5%E5%88%97%E5%BD%95%E9%9F%B3%E6%A0%87%E5%87%86%E5%AE%9E%E6%96%BD%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C_v1.0.pdf)|



## 2. 原理图/PCBA设计

### 2.1 准备工作

| 文件            | 更新时间   | 操作                                                         |
| --------------- | ---------- | ------------------------------------------------------------ |
| **allegro.zip** | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E6%A0%B8%E5%BF%83%E8%8A%AF%E7%89%87%E5%B0%81%E8%A3%85%E5%8F%82%E8%80%83%2Fallegro.zip) |
| **pads.zip**    | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E6%A0%B8%E5%BF%83%E8%8A%AF%E7%89%87%E5%B0%81%E8%A3%85%E5%8F%82%E8%80%83%2Fpads.zip) |
| **CSK硬件设计指南** | 2021.01.21 |  [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK%E8%AF%AD%E9%9F%B3%E6%96%B9%E6%A1%88%20HW%20Design%20Notes.pdf) |
| **01 CSK PCB设计离线基础篇.pdf** | 2021.03.04 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2F01%20CSK%20PCB%E8%AE%BE%E8%AE%A1%E7%A6%BB%E7%BA%BF%E5%9F%BA%E7%A1%80%E7%AF%87.pdf)|
| **02 CSK PCB设计离在线进阶篇.pdf** | 2021.03.04 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2F02%20CSK%20PCB%E8%AE%BE%E8%AE%A1%E7%A6%BB%E5%9C%A8%E7%BA%BF%E8%BF%9B%E9%98%B6%E7%AF%87.pdf)|



### 2.2 需求判断与参考方案选择

:::note
点击可下载参考设计
:::

#### 纯离线

| 麦克风数量 | 回声消除需求 | 命令词数量n | 推荐方案 |
| -- | -- | -- | -- |
| 1 | 需支持 | / | 软件暂不支持 |
| 1 | 无需支持 | n<50 | [CSK3001+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br/>[CSK3001+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)|
| 1 | Y | 50<n<200 | [CSK4002+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br/>[CSK4002+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| 2 | Y | n<200 | [CSK4002+ES7210+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK4002%2BES7210%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| 2 | N | n<50 | [CSK3002+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br/>[CSK3002+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| 2 | N | 50<n<200 | [CSK4002+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br/>[CSK4002+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |


#### 在离线

| BT | 推荐方案 |
| -- | -- |
| N | [CSK4002+ES7210+XR872AT+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK4002%2BES7210%2BXR872_%E5%9C%A8%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| Y | [CSK4002+ES7210+XR872AT+AC6956C+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK4002%2BES7210%2BXR872%2BBT6956C_%E9%9F%B3%E7%AE%B1%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br/> [CSK4002+ES7210+BK7251(WIFI/BT)+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK4002%2BBK7251.zip)|


### 2.3 自检与评审支持

#### 2.3.1 相关文档

硬件评审过程中可能存在以下问题：
1. 资料缺失、需求不明确、采用物料在参考设计中没有等问题；
2. 设计的原理和PCB资料事先没有自检，存在基础问题错误，如单网络、重命名网络、未连接网络、安全间距问题；
3. 送样协助调试验证的样品，物料配备不齐，事先未有基本功能验证等等。

**为了达成设计有效、快速落地、降低人力沟通成本，同时兼顾到一次设计的正确性、完整性、可生产性，我们拟出硬件评审指南保证硬件设计工作顺利完成。请硬件工程师务必阅读:**

| 文件| 更新时间 | 操作 |
| ----| ---- | ---- |
| **硬件评审指南.pdf** | 2021.03.04 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%A1%AC%E4%BB%B6%E8%AF%84%E5%AE%A1%E6%8C%87%E5%8D%97.pdf)|
| **Castor语音方案硬件设计审核 checklist V0.91.xlsx** | 2021.01.20 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCastor%E8%AF%AD%E9%9F%B3%E6%96%B9%E6%A1%88%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E5%AE%A1%E6%A0%B8%20checklist%20V0.91.xlsx)|


#### 2.3.2 线上获取硬件评审支持

你可以登录[LSCloud](https://cloud.listenai.com/)创建硬件评审工单，获取结构设计、原理图设计、PCB设计评审支持。你可以阅读[创建工单获取技术支持](https://open.listenai.com/cloud_project)了解工单功能。


### 2.4 量产准备

| 文件                                        | 更新时间   | 操作                                                         |
| ------------------------------------------- | ---------- | ------------------------------------------------------------ |
| **语音模组产线操作规范参考文档.pdf**        | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%2F%E8%AF%AD%E9%9F%B3%E6%A8%A1%E7%BB%84%E4%BA%A7%E7%BA%BF%E6%93%8D%E4%BD%9C%E8%A7%84%E8%8C%83%E5%8F%82%E8%80%83%E6%96%87%E6%A1%A3.pdf) |
| **语音模组产线生产测试流程指导.pdf**        | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%2F%E8%AF%AD%E9%9F%B3%E6%A8%A1%E7%BB%84%E4%BA%A7%E7%BA%BF%E7%94%9F%E4%BA%A7%E6%B5%8B%E8%AF%95%E6%B5%81%E7%A8%8B%E6%8C%87%E5%AF%BC.pdf) |
| **Soundcheck使用说明.pdf**                  | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%2FSoundcheck%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.pdf) |
| **castor-factory-tool-setup-v1.0.0.10.exe** | 2021.01.20 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%2Fcastor-factory-tool-setup-v1.0.0.10.exe)|
| **产测工具使用指导手册.docx** | 2021.01.20 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%2F%E4%BA%A7%E6%B5%8B%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C.docx)|


### 拓展材料下载

- [关键元器件参考清单](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%85%B3%E9%94%AE%E5%99%A8%E4%BB%B6%E6%B8%85%E5%8D%95.zip)

- [LSKits硬件使用指导手册.pdf](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%E7%A1%AC%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C.pdf)

- [LSKits参考设计](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)

- [LSKits BOM.zip](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%20BOM.zip)