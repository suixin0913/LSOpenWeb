# 基础资料包

> 快速启动项目的基础资料包

## 芯片资料

| 文件                                            | 更新时间   | 操作                                                         |
| ----------------------------------------------- | ---------- | ------------------------------------------------------------ |
| **CSK4002 datasheet V2.3(chipsky version).pdf** | 2021.07.23 | [下载](https://open.listenai.com/resource/open/doc_resource%2FCSK%20Datasheet%2FCastor4002%20datasheet%20V2.3(chipsky%20version).pdf) |
| **CSK4002产品规格书V1.2.pdf**      | 2021.02.05 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%2F%E4%BA%A7%E5%93%81%E8%A7%84%E6%A0%BC%E4%B9%A6PDF%2F20210204%2FC4203-L02C%E5%8F%8C%E9%BA%A6%E7%A6%BB%E7%BA%BF%E8%AF%AD%E9%9F%B3%E4%BA%A4%E4%BA%92%E8%8A%AF%E7%89%87%E4%BA%A7%E5%93%81%E8%A7%84%E6%A0%BC%E4%B9%A6V1.2.pdf) |
| **CSK ROHS报告.pdf**   | 2021.06.30 | [下载](https://open.listenai.com/resource/open/doc_resource%2FCSK%20Datasheet%2FCSK%20ROHS%E6%8A%A5%E5%91%8A.pdf) |
| **REACH 检测报告.PDF** | 2021.03.26 |[下载](https://open.listenai.com/resource/open/doc_resource%2FCSK%20Datasheet%2FREACH%20%E6%A3%80%E6%B5%8B%E6%8A%A5%E5%91%8A.PDF)|

> 拓展阅读：[CSK4002](https://docs.listenai.com/chips/4002/Chip_information_4002)

## 硬件资料

### 参考设计
| 麦克风数量 | 回声消除需求 | 命令词数量n | 推荐方案 |
| -- | -- | -- | -- |
| 1 | Y | 50<n<200 | [CSK4002+ES7243E+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK300X%2BES7243%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1C4-18.zip)<br/>[CSK4002+ES7202+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK300X%2BES7202%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97-%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1C4-18.zip)|
| 2 | Y | n<200 | [CSK4002+ES7210+功放](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK4002%2BES7210%E6%A0%87%E5%87%86%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97_%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1C4-18.zip) |

### 声学设计
| 文件| 更新时间 | 操作 |
| ----| ---- | ---- |
| **声学器件选型Checklist.xlsx** | 2021.01.20 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2F01.CSK%E6%96%B9%E6%A1%88%E4%BA%A7%E5%93%81Checklist.xlsx)|
| **声学结构设计指南.pdf** | 2021.04.19 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2F%E5%A3%B0%E5%AD%A6%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97.pdf)|
| **语音产品声学结构相关测试参考方法.pdf** | 2021.04.19 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2F%E8%AF%AD%E9%9F%B3%E4%BA%A7%E5%93%81%E5%A3%B0%E5%AD%A6%E7%BB%93%E6%9E%84%E7%9B%B8%E5%85%B3%E6%B5%8B%E8%AF%95%E5%8F%82%E8%80%83%E6%96%B9%E6%B3%95.pdf)|
| **关键器件清单.zip** | 2021.05.19 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%85%B3%E9%94%AE%E5%99%A8%E4%BB%B6%E6%B8%85%E5%8D%95.zip)|


### LSkits基础开发板
| 文件                                            | 更新时间   | 操作                                                         |
| ----------------------------------------------- | ---------- | ------------------------------------------------------------ |
| **LSKits参考设计** | 2021.07.23 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip) |
| **LSKits BOM.zip** | 2021.07.23 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%20BOM.zip) |
| **LSKits硬件使用指导手册.pdf** | 2021.07.23 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%E7%A1%AC%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C.pdf) |


> 拓展阅读：[硬件参考设计](https://docs.listenai.com/AIsolution/ESR/Hardwaredevelopment/hardware_guide)

## 软件资料

| 文件| 更新时间 | 操作 |
| ----| ---- | ---- |
| **CSK SDK开发checklistV1.0.xlsx** | 2021.01.20 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97%2FCSK%20SDK%E5%BC%80%E5%8F%91checklistV1.0.xlsx)|
| **CSK4002硬件抽象层开发指南 V1.5.pdf** | 2021.01.20 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97%2FCSK4002%E7%A1%AC%E4%BB%B6%E6%8A%BD%E8%B1%A1%E5%B1%82%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97%20V1.5.pdf)|

> 拓展阅读：[SDK开发说明](https://docs.listenai.com/AIsolution/ESR/softwaredevelopment/Advanced_development/csk_sdk_demo)