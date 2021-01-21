---
id: hardware_guide
title: CSK项目开发快速入门
slug: /hardware_guide
---

## 1.结构设计

语音唤醒与识别能力除了与软件的算法相关外，还与产品的结构设计息息相关。为了保证良好的声学效果，我们建议结构设计先于硬件设计。

| 文件                             | 更新时间   | 操作                                                         |
| -------------------------------- | ---------- | ------------------------------------------------------------ |
| **麦克风设计参考V1.4.pdf**       | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%E9%BA%A6%E5%85%8B%E9%A3%8E%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83V1.4.pdf) |
| **麦克风阵列录音标准.pdf**       | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%E9%BA%A6%E5%85%8B%E9%A3%8E%E9%98%B5%E5%88%97%E5%BD%95%E9%9F%B3%E6%A0%87%E5%87%86.pdf) |
| **CSK方案产品Checklist.xlsx** | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%8301.CSK%E6%96%B9%E6%A1%88%E4%BA%A7%E5%93%81Checklist.xlsx) |


## 2. PCBA设计

### 2.1 准备工作

| 文件            | 更新时间   | 操作                                                         |
| --------------- | ---------- | ------------------------------------------------------------ |
| **allegro.zip** | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E6%A0%B8%E5%BF%83%E8%8A%AF%E7%89%87%E5%B0%81%E8%A3%85%E5%8F%82%E8%80%83allegro.zip) |
| **pads.zip**    | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E6%A0%B8%E5%BF%83%E8%8A%AF%E7%89%87%E5%B0%81%E8%A3%85%E5%8F%82%E8%80%83pads.zip) |
| **CSK硬件设计指南** |  [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK%E8%AF%AD%E9%9F%B3%E6%96%B9%E6%A1%88%20HW%20Design%20Notes.pdf) | 



### 2.2 需求判断与参考方案选择

:::note
点击可下载参考设计
:::

#### 纯离线

| 麦克风数量 | 回声消除需求 | 命令词数量n | 推荐方案 |
| -- | -- | -- | -- |
| 1 | Y | / | 软件暂不支持 |
| 1 | N | n<50 | [CSK3001+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br/>[CSK3001+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)|
| 1 | N | 50<n<200 | [CSK4002+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br/>[CSK4002+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| 2 | Y | n<200 | [CSK4002+ES7210+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK4002%2BES7210%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| 2 | N | n<50 | [CSK3002+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br/>[CSK4002+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| 2 | N | 50<n<200 | [CSK4002+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br/>[CSK4002+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |


#### 在离线

| BT | 推荐方案 |
| N | [CSK4002+ES7210+XR872AT+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK4002%2BES7210%2BXR872_%E5%9C%A8%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| Y | [CSK4002+ES7210+XR872AT+AC6956C+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK4002%2BES7210%2BXR872%2BBT6956C_%E9%9F%B3%E7%AE%B1%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br/> [CSK4002+ES7210+BK7251(WIFI/BT)+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK4002%2BBK7251.zip)|


### 2.3 checklist

[点击下载CSK芯片硬件设计审核_checklist](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83Castor%E8%AF%AD%E9%9F%B3%E6%96%B9%E6%A1%88%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E5%AE%A1%E6%A0%B8%20checklist%20V0.91.xlsx)

:::note
为了避免不必要的沟通，造成项目延期，请在提交硬件审核前，先根据checklist检查自己的设计
:::

### 2.4 量产准备

| 文件                                        | 更新时间   | 操作                                                         |
| ------------------------------------------- | ---------- | ------------------------------------------------------------ |
| **语音模组产线操作规范参考文档.pdf**        | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%E8%AF%AD%E9%9F%B3%E6%A8%A1%E7%BB%84%E4%BA%A7%E7%BA%BF%E6%93%8D%E4%BD%9C%E8%A7%84%E8%8C%83%E5%8F%82%E8%80%83%E6%96%87%E6%A1%A3.pdf) |
| **语音模组产线生产测试流程指导.pdf**        | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%E8%AF%AD%E9%9F%B3%E6%A8%A1%E7%BB%84%E4%BA%A7%E7%BA%BF%E7%94%9F%E4%BA%A7%E6%B5%8B%E8%AF%95%E6%B5%81%E7%A8%8B%E6%8C%87%E5%AF%BC.pdf) |
| **Soundcheck使用说明.pdf**                  | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95Soundcheck%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.pdf) |


### 拓展材料下载

- [关键元器件参考清单](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%85%B3%E9%94%AE%E5%99%A8%E4%BB%B6%E6%B8%85%E5%8D%95%E5%85%B3%E9%94%AE%E5%85%83%E4%BB%B6%E5%8F%82%E8%80%83%E6%B8%85%E5%8D%95.xlsx)

- [LSKits参考设计](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83LSKits%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)