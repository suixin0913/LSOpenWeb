---
id: hardware_guide
title: CSK项目开发快速入门
slug: /hardware_guide
---

## 1.结构设计

语音唤醒与识别能力除了与软件的算法相关外，还与产品的结构设计息息相关。为了保证良好的声学效果，我们建议结构设计先于硬件设计。



## 2. PCBA设计

### 2.1 准备工作

点击下载CSK芯片封装

点击下载CSK硬件设计指南
本文档主要介绍CSK芯片基于语音方案硬件设计的要点及注意事项，旨在帮助聆思客户缩短产品的设计周期、提高产品的设计稳定性及降低故障率。请客户参考本指导文档的要求进行硬件设计，如有疑问或者如因特殊原因需要更改文档中的软件接口连接定义，请及时和我司FAE工程师联系


### 2.2 需求判断与参考方案选择

:::note
点击可下载参考设计
:::

#### 纯离线

| 麦克风数量 | 回声消除需求 | 命令词数量n | 推荐方案 |
| -- | -- | -- | -- |
| 1 | Y | / | 软件暂不支持 |
| 1 | N | n<50 | [CSK3001+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br>[CSK3001+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)|
| 1 | N | 50<n<200 | [CSK4002+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br>[CSK4002+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| 2 | Y | n<200 | [CSK4002+ES7210+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK4002%2BES7210%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| 2 | N | n<50 | [CSK3002+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br>[CSK4002+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| 2 | N | 50<n<200 | [CSK4002+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br>[CSK4002+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |


#### 在离线

| BT | 推荐方案 |
| N | [CSK4002+ES7210+XR872AT+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK4002%2BES7210%2BXR872_%E5%9C%A8%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| Y | [CSK4002+ES7210+XR872AT+AC6956C+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK4002%2BES7210%2BXR872%2BBT6956C_%E9%9F%B3%E7%AE%B1%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)<br> [CSK4002+ES7210+BK7251(WIFI/BT)+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83CSK4002%2BBK7251.zip)|


### 2.3 checklist

点击下载CSK芯片硬件设计审核_checklist

### 2.4 量产准备

语音模组产线生产测试流程指导

语音类产品产线流程参考：

### 拓展材料下载

[关键元器件参考清单](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%85%B3%E9%94%AE%E5%99%A8%E4%BB%B6%E6%B8%85%E5%8D%95%E5%85%B3%E9%94%AE%E5%85%83%E4%BB%B6%E5%8F%82%E8%80%83%E6%B8%85%E5%8D%95.xlsx)