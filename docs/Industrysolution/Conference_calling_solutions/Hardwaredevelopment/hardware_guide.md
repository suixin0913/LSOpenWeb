
# 硬件参考设计

### 原理图/PCBA设计

原理图设计6个模拟驻极体MIC，设计采用3颗ES7202 ADC获取MIC模拟信号（开发者可根据产品定义修改原理图设计），内部模数转换后通过PDM接口连接到CSK，采用1颗ES7202 ADC做喇叭硬回采，采用一颗DAC ES7148/ES7149，将从CSK发出的标准IIS信号转换为模拟信号给到喇叭播音。

| 文件                | 更新时间   | 操作                       |
| ------------------- | ---------- | -------------------------- |
| **CSK硬件设计参考** | 2021.10.16 | [下载](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/%E9%80%9A%E8%AF%9D%E9%99%8D%E5%99%AA/hardware-0ff1a6044ee40bed52fbdf47e890c053.zip) |
