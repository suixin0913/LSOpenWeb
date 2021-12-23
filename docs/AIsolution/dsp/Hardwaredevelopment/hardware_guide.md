
# 硬件参考设计

>通过本篇文章你将了解到：
- 声学结构设计。
- 如何进行 CSK 硬件选型和设计。
- 进行语音模组量产的注意事项。

## 声学结构设计指导

| 文件| 更新时间 | 操作 |
| ----| ---- | ---- |
| **声学器件选型Checklist.xlsx** | 2021.01.20 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2F01.CSK%E6%96%B9%E6%A1%88%E4%BA%A7%E5%93%81Checklist.xlsx)|
| **声学结构设计指南.pdf** | 2021.04.19 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2F%E5%A3%B0%E5%AD%A6%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97.pdf)|
| **语音产品声学结构相关测试参考方法.pdf** | 2021.04.19 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2F%E8%AF%AD%E9%9F%B3%E4%BA%A7%E5%93%81%E5%A3%B0%E5%AD%A6%E7%BB%93%E6%9E%84%E7%9B%B8%E5%85%B3%E6%B5%8B%E8%AF%95%E5%8F%82%E8%80%83%E6%96%B9%E6%B3%95.pdf)|
|



## CSK原理图和PCB设计指导

| 文件| 更新时间 | 操作 |
| ----| ---- | ---- |
| **CSK硬件设计指南** | 2021.01.21 |  [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCSK%E8%AF%AD%E9%9F%B3%E6%96%B9%E6%A1%88%20HW%20Design%20Notes.pdf) |
| **02 CSK PCB设计离在线进阶篇.pdf** | 2021.03.09 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2F02%20CSK%20PCB%E8%AE%BE%E8%AE%A1%E7%A6%BB%E5%9C%A8%E7%BA%BF%E8%BF%9B%E9%98%B6%E7%AF%87.pdf)|
| **常用物料封装（allegro版本）.zip** | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E6%A0%B8%E5%BF%83%E8%8A%AF%E7%89%87%E5%B0%81%E8%A3%85%E5%8F%82%E8%80%83%2Fallegro.zip) |
| **常用物料封装（pads版本）.zip**    | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E6%A0%B8%E5%BF%83%E8%8A%AF%E7%89%87%E5%B0%81%E8%A3%85%E5%8F%82%E8%80%83%2Fpads.zip) |



### 需求判断与参考方案选择

:::note
点击可下载参考设计
:::


#### 离在线


| 文件| 更新时间 | 操作 |
| ----| ---- | ---- |
| **CSK4002+ES7210+XR872+BT6956C_音箱类标案参考设计C11-1.zip** | 2021.04.19 |[下载](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/%E5%9C%A8%E7%A6%BB%E7%BA%BF%E8%AF%AD%E9%9F%B3/Ref07-CSK4002%2BES7210%2BXR872%2BBT6956C_%E9%9F%B3%E7%AE%B1%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1C11-1.rar)|
| **CSK4002+ES7210+XR872_离在线模块类标案参考设计C11-1.zip** | 2021.04.19 |[下载](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/%E5%9C%A8%E7%A6%BB%E7%BA%BF%E8%AF%AD%E9%9F%B3/Ref06-CSK4002%2BES7210%2BXR872_%E5%9C%A8%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1C11-1.rar)|

| BT | 推荐方案 |
| -- | -- |
| N | [CSK4002+ES7210+XR872AT+功放](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/%E5%9C%A8%E7%A6%BB%E7%BA%BF%E8%AF%AD%E9%9F%B3/Ref06-CSK4002%2BES7210%2BXR872_%E5%9C%A8%E7%A6%BB%E7%BA%BF%E6%A8%A1%E5%9D%97%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1C11-1.rar) |
| Y | [CSK4002+ES7210+XR872AT+AC6956C+功放](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/%E5%9C%A8%E7%A6%BB%E7%BA%BF%E8%AF%AD%E9%9F%B3/Ref07-CSK4002%2BES7210%2BXR872%2BBT6956C_%E9%9F%B3%E7%AE%B1%E7%B1%BB%E6%A0%87%E6%A1%88%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1C11-1.rar)<br/> [CSK4002+ES7210+BK7251(WIFI/BLE)+功放](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/%E5%9C%A8%E7%A6%BB%E7%BA%BF%E8%AF%AD%E9%9F%B3/CSK%2BBK7251%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1C11-1.rar)|

### 自检与评审支持

####  相关文档

硬件评审过程中可能存在以下问题：
1. 资料缺失、需求不明确、采用物料在参考设计中没有等问题；
2. 设计的原理和PCB资料事先没有自检，存在基础问题错误，如单网络、重命名网络、未连接网络、安全间距问题；
3. 送样协助调试验证的样品，物料配备不齐，事先未有基本功能验证等等。

**为了达成设计有效、快速落地、降低人力沟通成本，同时兼顾到一次设计的正确性、完整性、可生产性，我们拟出硬件评审指南保证硬件设计工作顺利完成。请硬件工程师务必阅读:**

| 文件| 更新时间 | 操作 |
| ----| ---- | ---- |
| **硬件评审指南.pdf** | 2021.03.04 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E7%A1%AC%E4%BB%B6%E8%AF%84%E5%AE%A1%E6%8C%87%E5%8D%97.pdf)|
| **Castor语音方案硬件设计审核 checklist V0.91.xlsx** | 2021.03.09 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FCastor%E8%AF%AD%E9%9F%B3%E6%96%B9%E6%A1%88%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E5%AE%A1%E6%A0%B8%20checklist%20V0.91.xlsx)|


#### 线上获取硬件评审支持

你可以登录[LSCloud](https://cloud.listenai.com/)创建硬件评审工单，获取结构设计、原理图设计、PCB设计评审支持。你可以阅读[创建工单获取技术支持](https://open.listenai.com/cloud_project)了解工单功能。


### 量产准备

| 文件                                        | 更新时间   | 操作                                                         |
| ------------------------------------------- | ---------- | ------------------------------------------------------------ |
| **语音模组产线操作规范参考文档.pdf**        | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%2F%E8%AF%AD%E9%9F%B3%E6%A8%A1%E7%BB%84%E4%BA%A7%E7%BA%BF%E6%93%8D%E4%BD%9C%E8%A7%84%E8%8C%83%E5%8F%82%E8%80%83%E6%96%87%E6%A1%A3.pdf) |
| **语音模组产线生产测试流程指导.pdf**        | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%2F%E8%AF%AD%E9%9F%B3%E6%A8%A1%E7%BB%84%E4%BA%A7%E7%BA%BF%E7%94%9F%E4%BA%A7%E6%B5%8B%E8%AF%95%E6%B5%81%E7%A8%8B%E6%8C%87%E5%AF%BC.pdf) |
| **Soundcheck使用说明.pdf**                  | 2021.01.21 | [下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%2FSoundcheck%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.pdf) |
| **产测工具使用指导手册.docx** | 2021.01.20 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95%2F%E4%BA%A7%E6%B5%8B%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C.docx)|
| **芯片烧录.zip** | 2021.04.09 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E8%8A%AF%E7%89%87%E7%83%A7%E5%BD%95.zip)|
| **模组烧录.zip** | 2021.01.21 |[下载](https://open.listenai.com/resource/open/doc_resource%2F%E9%87%8F%E4%BA%A7%E6%8C%87%E5%8D%97%2F%E6%A8%A1%E7%BB%84%E7%83%A7%E5%BD%95.zip)|




## 拓展材料下载

- [关键元器件参考清单](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%85%B3%E9%94%AE%E5%99%A8%E4%BB%B6%E6%B8%85%E5%8D%95.zip)

- [LSKits硬件使用指导手册.pdf](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%E7%A1%AC%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C.pdf)

- [LSKits参考设计](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1.zip)

- [LSKits BOM.zip](https://open.listenai.com/resource/open/doc_resource%2F%E7%A1%AC%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%2F%E5%8E%9F%E7%90%86%E5%9B%BE%26PCB%E8%AE%BE%E8%AE%A1%E5%8F%82%E8%80%83%2FLSKits%20BOM.zip)
