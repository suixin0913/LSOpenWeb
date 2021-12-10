---
sidebar_label: 扫描笔上位机通信协议
sidebar_position: 3
---

# 扫描笔上位机通信协议

| 版本 |	变更内容	 |编写人 | 	日期|
| :-| :- | :- | :- |
|V1.0|	First Release	|叶康	|2021.1|
|V1.1	|完善文档格式和示例测量数据	|曹思宇	|2021.4
|V1.2|	增加查询版本和调试串口指令|	冷红林|	2021.5
|V1.3	|增加老化测试命令|	冷红林|	2021.6
|V1.4|	增加查询chipid命令|	冷红林|	2021.6.22
|V1.5|	增加系统初始化完成  <br />摄像头初始化异常  <br />摄像头解析异常  <br />算法初始化异常指令。|	冷红林|	2021.7.21
|V1.6	|增加标定协议|	冷红林|	2021.7.29
|V1.7	|优化文档说明|	曹思宇|	2021.8.03
|V1.8	|更新SPI协议说明，X轴/Y轴坐标偏移量的类型以及数值有效范围	|曹思宇	|2021.8.06
|V1.9	|补充协议中模式说明|	曹思宇|	2021.8.16
|V1.10|	UART协议添加合成文本指令  <br />工作模式添加离线单行扫描模式|	田丰|	2021.09.02
|V1.11|	SPI协议添加语音和文本传输	|田丰  <br />施国强|	2021.09.15
|V1.12|	UART协议增加设置TTS合成语速  <br />左手模式|	施国强|	2021.09.30
|V1.13|	UART协议增加合成认证码和反馈的加密码	|田丰|	2021.11.11
|V1.14|	UART协议添加帧反馈和开机提示指令|	田丰	|2021.12.06

## 概述

CSK通过SPI和UART与上位机完成相关数据通信，包括图像数据，运行状态等。此文档用于约束SPI和UART通信的时序和协议格式。

## SPI通信 


SPI通讯协议用于交互图像、音频、文本数据和参数。该协议包含三个协议格式分别用于图像、音频、文本传输，用TAG字段区别。协议采用小端模式。

### 图像协议格式


<table class="tg">
<thead>
  <tr>
    <th class="tg-c3ow" rowspan="2"><span   >帧格式</span></th>
    <th class="tg-c3ow" colspan="11"><span   >帧头</span></th>
    <th class="tg-c3ow"><span   >帧数据</span></th>
  </tr>
  <tr>
    <th class="tg-ya0j"><span   >标记</span></th>
    <th class="tg-ya0j"><span   >版本</span></th>
    <th class="tg-ya0j"><span   >图像编号</span></th>
    <th class="tg-ya0j"><span   >图像类型</span></th>
    <th class="tg-ya0j"><span   >图像格式</span></th>
    <th class="tg-ya0j"><span   >X轴坐标偏移</span></th>
    <th class="tg-ya0j"><span   >Y轴坐标偏移</span></th>
    <th class="tg-ya0j"><span   >图像宽度</span></th>
    <th class="tg-ya0j"><span   >图像高度</span></th>
    <th class="tg-ya0j"><span   >像素字长</span></th>
    <th class="tg-ya0j"><span   >帧数据校验和</span></th>
    <th class="tg-ya0j"><span   >图像数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td   ><span   >简称</span></td>
    <td   ><span   >TAG</span></td>
    <td   ><span   >VER</span></td>
    <td   ><span   >FUID</span></td>
    <td   ><span   >TYPE</span></td>
    <td   ><span   >FMT</span></td>
    <td   ><span   >XSFT</span></td>
    <td   ><span   >YSFT</span></td>
    <td   ><span   >WIDTH</span></td>
    <td   ><span   >HEIGHT</span></td>
    <td   ><span   >DEPTH</span></td>
    <td   ><span   >CHECKSUM</span></td>
    <td   ><span   >DATA</span></td>
  </tr>
  <tr>
    <td   ><span   >长度</span></td>
    <td   ><span   >2字节</span></td>
    <td   ><span   >1字节</span></td>
    <td   ><span   >2字节</span></td>
    <td   ><span   >1字节</span></td>
    <td   ><span   >1字节</span></td>
    <td   ><span   >1字节</span></td>
    <td   ><span   >1字节</span></td>
    <td   ><span   >2字节</span></td>
    <td   ><span   >2字节</span></td>
    <td   ><span   >1字节</span></td>
    <td   ><span   >2字节</span></td>
    <td   ><span   >WIDTH*HEIGHT*DEPTH字节</span></td>
  </tr>
  <tr>
    <td   ><span   >数据类型</span></td>
    <td   ><span   >uint16</span></td>
    <td   ><span   >uint8</span></td>
    <td   ><span   >uint16</span></td>
    <td   ><span   >uint8</span></td>
    <td   ><span   >uint8</span></td>
    <td   ><span   >char</span></td>
    <td   ><span   >char</span></td>
    <td   ><span   >uint16</span></td>
    <td   ><span   >uint16</span></td>
    <td   ><span   >uint8</span></td>
    <td   ><span   >uint16</span></td>
    <td   ><span   >uint8[]</span></td>
  </tr>
  <tr>
    <td   ><span   >描述</span></td>
    <td   ><span   >固定值0x5A46</span></td>
    <td   ><span   >当前版本号0x00</span></td>
    <td   ><span   >图像编号</span></td>
    <td   ><span   >0x00:增量图像0x01:原始图像</span>   </td>
    <td ><span   >0x00:灰度图<br />0x10：RGB888<br />0x11:RGB565<br />0x20:YUYV422<br />0x21:YVYU422<br />0x22:UYVY422</span></td>
    <td   ><span   >增量图片X轴坐标偏移量有效范围</span>  <span   >（-128，0）</span></td>
    <td   ><span   >增量图片Y轴坐标偏移量有效范围</span>  <span   >（-20 ，20 ）</span></td>
    <td   ><span   >图像宽度</span></td>
    <td   ><span   >图像高度</span></td>
    <td   ><span   >每个像素点长度</span></td>
    <td   ><span   >图像数据每个像素点数据的累加和</span></td>
    <td   ><span   >图像数据</span></td>
  </tr>
</tbody>
</table>

#### 场景1：传输裁剪后的增量图像和偏移量（正常模式）

<table class="tg">
<thead>
  <tr>
    <th class="tg-c3ow" rowspan="2"><span   >帧格式</span></th>
    <th class="tg-c3ow" colspan="11"><span   >帧头</span></th>
    <th class="tg-c3ow"><span   >帧数据</span></th>
  </tr>
  <tr>
    <th class="tg-ya0j"><span   >标记</span></th>
    <th class="tg-ya0j"><span   >版本</span></th>
    <th class="tg-ya0j"><span   >图像编号</span></th>
    <th class="tg-ya0j"><span   >图像类型</span></th>
    <th class="tg-ya0j"><span   >图像格式</span></th>
    <th class="tg-ya0j"><span   >X轴坐标偏移</span></th>
    <th class="tg-ya0j"><span   >Y轴坐标偏移</span></th>
    <th class="tg-ya0j"><span   >图像宽度</span></th>
    <th class="tg-ya0j"><span   >图像高度</span></th>
    <th class="tg-ya0j"><span   >像素字长</span></th>
    <th class="tg-ya0j"><span   >帧数据校验和</span></th>
    <th class="tg-ya0j"><span   >图像数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-baqh"><span   >简称</span></td>
    <td class="tg-baqh"><span   >TAG</span></td>
    <td class="tg-baqh"><span   >VER</span></td>
    <td class="tg-baqh"><span   >FUID</span></td>
    <td class="tg-baqh"><span   >TYPE</span></td>
    <td class="tg-baqh"><span   >FMT</span></td>
    <td class="tg-baqh"><span   >XSFT</span></td>
    <td class="tg-baqh"><span   >YSFT</span></td>
    <td class="tg-baqh"><span   >WIDTH</span></td>
    <td class="tg-baqh"><span   >HEIGHT</span></td>
    <td class="tg-baqh"><span   >DEPTH</span></td>
    <td class="tg-baqh"><span   >CHECKSUM</span></td>
    <td class="tg-baqh"><span   >DATA</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >长度</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >WIDTH*HEIGHT*DEPTH字节</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >数据类型</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >char</span></td>
    <td class="tg-baqh"><span   >char</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8[]</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >描述</span></td>
    <td class="tg-baqh"><span   >固定值0x5A46</span></td>
    <td class="tg-baqh"><span   >当前版本号</span></td>
    <td class="tg-baqh"><span   >编号15</span></td>
    <td class="tg-baqh"><span   >增量图像</span></td>
    <td class="tg-baqh"> <span   >灰度图</span></td>
    <td class="tg-baqh"><span   >增量图X轴偏移量-10</span></td>
    <td class="tg-baqh"><span   >增量图Y轴偏移量-10</span></td>
    <td class="tg-baqh"><span   >图像宽度128</span></td>
    <td class="tg-baqh"><span   >图像高度180</span></td>
    <td class="tg-baqh"><span   >每个像素点长度位1字节</span></td>
    <td class="tg-baqh"><span   >图像数据每个像素点数据的累加和</span></td>
    <td class="tg-baqh"><span   >图像数据，长度为128*180*1</span></td>
  </tr>
  <tr>
    <td class="tg-5en1"><span   >数据</span></td>
    <td class="tg-5en1"><span   >0x5A46</span></td>
    <td class="tg-5en1"><span   >0x00</span></td>
    <td class="tg-5en1"><span   >0x0015</span></td>
    <td class="tg-5en1"><span   >0x00</span></td>
    <td class="tg-5en1"><span   >0x00</span></td>
    <td class="tg-5en1"><span   >0xF6</span></td>
    <td class="tg-5en1"><span   >0xF6</span></td>
    <td class="tg-5en1"><span   >0x0080</span></td>
    <td class="tg-5en1"><span   >0x00b4</span></td>
    <td class="tg-5en1"><span   >0x01</span></td>
    <td class="tg-5en1"><span   >0x0000</span></td>
    <td class="tg-5en1"><span   >...</span></td>
  </tr>
</tbody>
</table>

#### 场景2：传输原始图像（产测模式）


<table class="tg">
<thead>
  <tr>
    <th class="tg-c3ow" rowspan="2"><span   >帧格式</span></th>
    <th class="tg-c3ow" colspan="11"><span   >帧头</span></th>
    <th class="tg-c3ow"><span   >帧数据</span></th>
  </tr>
  <tr>
    <th class="tg-ya0j"><span   >标记</span></th>
    <th class="tg-ya0j"><span   >版本</span></th>
    <th class="tg-ya0j"><span   >图像编号</span></th>
    <th class="tg-ya0j"><span   >图像类型</span></th>
    <th class="tg-ya0j"><span   >图像格式</span></th>
    <th class="tg-ya0j"><span   >X轴坐标偏移</span></th>
    <th class="tg-ya0j"><span   >Y轴坐标偏移</span></th>
    <th class="tg-ya0j"><span   >图像宽度</span></th>
    <th class="tg-ya0j"><span   >图像高度</span></th>
    <th class="tg-ya0j"><span   >像素字长</span></th>
    <th class="tg-ya0j"><span   >帧数据校验和</span></th>
    <th class="tg-ya0j"><span   >图像数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-baqh"><span   >简称</span></td>
    <td class="tg-baqh"><span   >TAG</span></td>
    <td class="tg-baqh"><span   >VER</span></td>
    <td class="tg-baqh"><span   >FUID</span></td>
    <td class="tg-baqh"><span   >TYPE</span></td>
    <td class="tg-baqh"><span   >FMT</span></td>
    <td class="tg-baqh"><span   >XSFT</span></td>
    <td class="tg-baqh"><span   >YSFT</span></td>
    <td class="tg-baqh"><span   >WIDTH</span></td>
    <td class="tg-baqh"><span   >HEIGHT</span></td>
    <td class="tg-baqh"><span   >DEPTH</span></td>
    <td class="tg-baqh"><span   >CHECKSUM</span></td>
    <td class="tg-baqh"><span   >DATA</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >长度</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >WIDTH*HEIGHT*DEPTH字节</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >数据类型</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >char</span></td>
    <td class="tg-baqh"><span   >char</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8[]</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >描述</span></td>
    <td class="tg-baqh"><span   >固定值0x5A46</span></td>
    <td class="tg-baqh"><span   >当前版本号</span></td>
    <td class="tg-baqh"><span   >编号15</span></td>
    <td class="tg-baqh"><span   >原始图像</span></td>
    <td class="tg-baqh"> <span   >灰度图</span></td>
    <td class="tg-baqh"><span   >无X轴偏移量</span></td>
    <td class="tg-baqh"><span   >无Y轴偏移量</span></td>
    <td class="tg-baqh"><span   >图像宽度128</span></td>
    <td class="tg-baqh"><span   >图像高度180</span></td>
    <td class="tg-baqh"><span   >每个像素点长度位1字节</span></td>
    <td class="tg-baqh"><span   >图像数据每个像素点数据的累加和</span></td>
    <td class="tg-baqh"><span   >图像数据，长度为128*180*1</span></td>
  </tr>
  <tr>
    <td class="tg-5en1"><span   >数据</span></td>
    <td class="tg-5en1"><span   >0x5A46</span></td>
    <td class="tg-5en1"><span   >0x00</span></td>
    <td class="tg-5en1"><span   >0x0015</span></td>
    <td class="tg-5en1"><span   >0x00</span></td>
    <td class="tg-5en1"><span   >0x00</span></td>
    <td class="tg-5en1"><span   >0x00</span></td>
    <td class="tg-5en1"><span   >0x00</span></td>
    <td class="tg-5en1"><span   >0x0080</span></td>
    <td class="tg-5en1"><span   >0x00b4</span></td>
    <td class="tg-5en1"><span   >0x01</span></td>
    <td class="tg-5en1"><span   >0x0000</span></td>
    <td class="tg-5en1"><span   >...</span></td>
  </tr>
</tbody>
</table>

### TTS音频传输协议


<table class="tg">
<thead>
  <tr>
    <th class="tg-c3ow" rowspan="2"><span   >帧格式</span></th>
    <th class="tg-c3ow" colspan="7"><span   >帧头</span></th>
    <th class="tg-c3ow"><span   >帧数据</span></th>
  </tr>
  <tr>
    <th class="tg-ya0j"><span   >标记</span></th>
    <th class="tg-ya0j"><span   >音频格式</span></th>
    <th class="tg-ya0j"><span   >通道数</span></th>
    <th class="tg-ya0j"><span   >采样率</span></th>
    <th class="tg-ya0j"><span   >采样深度</span></th>
    <th class="tg-ya0j"><span   >音频长度</span></th>
    <th class="tg-ya0j"><span   >帧数据校验和</span></th>
    <th class="tg-ya0j"><span   >音频数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-baqh"><span   >简称</span></td>
    <td class="tg-baqh"><span   >TAG</span></td>
    <td class="tg-baqh"><span   >FMT</span></td>
    <td class="tg-baqh"><span   >CHANNEL</span></td>
    <td class="tg-baqh"><span   >SAMPLE</span></td>
    <td class="tg-baqh"><span   >SAMPLE DEPTH</span></td>
    <td class="tg-baqh"><span   >LENGTH</span></td>
    <td class="tg-baqh"><span   >CHECKSUM</span></td>
    <td class="tg-baqh"><span   >DATA</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >长度</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >1字节</span></td>
    <td class="tg-baqh"><span   >4字节</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >LENGTH字节</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >数据类型</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >uint8</span></td>
    <td class="tg-baqh"><span   >uint32</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8[]</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >描述</span></td>
    <td class="tg-baqh"><span   >固定值0x5B46</span></td>
    <td class="tg-0lax"><span   >0x00:PCM</span>  <span   >0x01：mp3</span>  <span   >...</span></td>
    <td class="tg-baqh"><span   >0x01:单声道</span>  <span   >0x02：双声道</span>  <span   >0x04：四声道</span></td>
    <td class="tg-0lax"><span   >0x00:8KHz</span>  <span   >0x01:16KHz</span>  <span   >...</span></td>
    <td class="tg-0lax"><span   >0x10:16bit</span>  <span   >0x18:24bit</span>  <span   >0x20:32bit</span>  <span   >...</span></td>
    <td class="tg-baqh"><span   >音频数据长度</span></td>
    <td class="tg-baqh"><span   >音频数据单字节累加和</span></td>
    <td class="tg-baqh"><span   >音频数据</span></td>
  </tr>
</tbody>
</table>


### OCR文本传输协议


<table class="tg">
<thead>
  <tr>
    <th class="tg-baqh" rowspan="2"><span   >帧格式</span></th>
    <th class="tg-baqh" colspan="3"><span   >帧头</span></th>
    <th class="tg-baqh"><span   >帧数据</span></th>
  </tr>
  <tr>
    <th class="tg-ya0j"><span   >标记</span></th>
    <th class="tg-ya0j"><span   >文本长度</span></th>
    <th class="tg-ya0j"><span   >帧数据校验和</span></th>
    <th class="tg-ya0j"><span   >文本数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-baqh"><span   >简称</span></td>
    <td class="tg-baqh"><span   >TAG</span></td>
    <td class="tg-baqh"><span   >LENGTH</span></td>
    <td class="tg-baqh"><span   >CHECKSUM</span></td>
    <td class="tg-baqh"><span   >DATA</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >长度</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >4字节</span></td>
    <td class="tg-baqh"><span   >2字节</span></td>
    <td class="tg-baqh"><span   >LENGTH字节</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >数据类型</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint32</span></td>
    <td class="tg-baqh"><span   >uint16</span></td>
    <td class="tg-baqh"><span   >uint8[]</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span   >描述</span></td>
    <td class="tg-baqh"><span   >固定值0x5C46</span></td>
    <td class="tg-baqh"><span   >文本数据长度</span></td>
    <td class="tg-baqh"><span   >文本数据单字节累加和</span></td>
    <td class="tg-baqh"><span   >文本数据</span></td>
  </tr>
</tbody>
</table>


### 接口参数

<table class="tg">
<thead>
  <tr>
    <th class="tg-ya0j"><span   >主从模式</span></th>
    <th class="tg-ya0j"><span   >极性相位</span></th>
    <th class="tg-ya0j"><span   >速率</span></th>
    <th class="tg-ya0j"><span   >数据大小端</span></th>
    <th class="tg-ya0j"><span   >选通信号有效电平</span></th>
    <th class="tg-ya0j"><span   >特殊说明</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-baqh"><span   >CSK做主上位机做从</span></td>
    <td class="tg-baqh"><span   >Polarity 0 Phase 0</span></td>
    <td class="tg-baqh"><span   >40M （后续可能提升至48M）</span></td>
    <td class="tg-baqh"><span   >LSB 低位先传输</span></td>
    <td class="tg-baqh"><span   >CS低电平有效</span></td>
    <td class="tg-baqh"><span   >由于CSK特性，SPI最大传输512字节，所以如果图像帧长度大于512字节，是分包传输</span></td>
  </tr>
</tbody>
</table>

##  UART通信

用于交互当前工作状态和信息

### 协议格式

基于CSK标准UART串口通信协议文档 扩展命令帧和响应帧

传输协议的数据帧格式如下：

<table class="tg">
<thead>
  <tr>
    <th class="tg-ya0j" colspan="6">帧头</th>
    <th class="tg-ya0j" colspan="5">帧数据</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-7yig" colspan="2">固定标记</td>
    <td class="tg-7yig" colspan="2">帧长度</td>
    <td class="tg-7yig">帧编号</td>
    <td class="tg-7yig">帧头校验</td>
    <td class="tg-7yig">类型</td>
    <td class="tg-7yig">地址</td>
    <td class="tg-7yig">命令字</td>
    <td class="tg-7yig">命令数据</td>
    <td class="tg-7yig">帧数据校验</td>
  </tr>
  <tr>
    <td class="tg-7yig">FTAGL</td>
    <td class="tg-7yig">FTAGH</td>
    <td class="tg-7yig">FLENL</td>
    <td class="tg-7yig">FLENH</td>
    <td class="tg-7yig">FUID</td>
    <td class="tg-7yig">LCHK</td>
    <td class="tg-7yig">TYPE</td>
    <td class="tg-7yig">REG</td>
    <td class="tg-7yig">CMD</td>
    <td class="tg-7yig">DATA</td>
    <td class="tg-7yig">DCHK</td>
  </tr>
</tbody>
</table>

帧头说明：

<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38"><span   >名称</span></th>
    <th class="tg-amwm"><span   >长度(byte)</span></th>
    <th class="tg-amwm"><span   >说明</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j">固定标记</td>
    <td class="tg-baqh">2</td>
    <td class="tg-0lax">固定为FTAGL = 0x58，FTAGH = 0x46。</td>
  </tr>
  <tr>
    <td class="tg-ya0j">帧长度</td>
    <td class="tg-baqh">2</td>
    <td class="tg-0lax">由两个字节组成，低字节在前，高字节在后；表示整个命令帧的长度。</td>
  </tr>
  <tr>
    <td class="tg-ya0j">帧序号</td>
    <td class="tg-baqh">1</td>
    <td class="tg-0lax">表示命令帧的序号，确保短时唯一。</td>
  </tr>
  <tr>
    <td class="tg-ya0j">帧头校验</td>
    <td class="tg-baqh">1</td>
    <td class="tg-0lax">采用按字节累加和校验；即：（FTAGL + FTAGH + FLENL + FLENH + FUID + LCHK）% 256 = 0</td>
  </tr>
</tbody>
</table>

帧数据说明：

<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38"><span   >名称</span></th>
    <th class="tg-amwm"><span   >长度(byte)</span></th>
    <th class="tg-amwm"><span   >说明</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j">类型</td>
    <td class="tg-baqh">1</td>
    <td class="tg-0lax">命令帧为0xF0，响应帧（from CSK）为0xFF。</td>
  </tr>
  <tr>
    <td class="tg-ya0j">地址</td>
    <td class="tg-baqh">1</td>
    <td class="tg-0lax">预留，固定为0x00。</td>
  </tr>
  <tr>
    <td class="tg-ya0j">命令字</td>
    <td class="tg-baqh">1</td>
    <td class="tg-0lax">表示命令帧/响应帧的命令字。</td>
  </tr>
  <tr>
    <td class="tg-ya0j"><span   >命令数据</span></td>
    <td class="tg-baqh">X</td>
    <td class="tg-0lax">不同命令类型，有不同的命令数据结构，具体见：业务协议。</td>
  </tr>
  <tr>
    <td class="tg-ya0j"><span   >帧数据校验</span></td>
    <td class="tg-baqh">1</td>
    <td class="tg-0lax">采用按字节累加和校验；即：  （TYPE + REG + CMD + DATA + DCHK）% 256 = 0</td>
  </tr>
</tbody>
</table>

### 命令帧

### 0x19查询软件版本

用于上位机查询CSK的当前版本：包括固件版本、算法版本，以及chipid。

<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38" colspan="5"><span  >帧数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j">类型</td>
    <td class="tg-ya0j">地址</td>
    <td class="tg-ya0j">命令字</td>
    <td class="tg-ya0j">命令数据</td>
    <td class="tg-ya0j">帧数据校验</td>
  </tr>
  <tr>
    <td class="tg-ya0j">TYPE</td>
    <td class="tg-baqh">REG</td>
    <td class="tg-baqh">CMD</td>
    <td class="tg-baqh">DATA</td>
    <td class="tg-baqh">DCHK</td>
  </tr>
  <tr>
    <td class="tg-ya0j">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
  </tr>
  <tr>
    <td class="tg-ya0j">0xF0命令帧</td>
    <td class="tg-baqh">0x00</td>
    <td class="tg-baqh">0x19</td>
    <td class="tg-baqh">0x00:查询固件和拼接算法固件  <br />0x01:查询固件版本   <br /> 0x02:查询拼接算法版本   <br /> 0x03:查询chipid   <br /> 0x04:查询切行算法版本  <br />  0x05:查询OCR算法版本  <br />  0x06:查询TTS引擎版本  <br />  0x07:查询TTS发音人ID  <br />  0x10: 查询以上的所有信息</td>
    <td class="tg-baqh">帧数据校验</td>
  </tr>
</tbody>
</table>

:::note使用示例

命令帧:查询01固件版本

```
58 46 0B 00 04 53 F0 00 19 01 F6
```

响应帧：版本信息返回

```
58 46 0B 00 04 53 FF 00 01 10 F0， 58 46 0E 00 05 4F FF 00 04 01 01 01 15 E5 
```

> 查看[响应帧 0x01 命令帧反馈](#0x01命令帧反馈)
> 查看[响应帧 0x04 反馈软件版本](#0x04反馈软件版本)

:::


### 0x50设置工作模式

用于上位机设置CSK的当前工作模式：单行扫描模式、多行扫描模式、录音模式等。

<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38" colspan="6"><span >帧数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j">类型</td>
    <td class="tg-ya0j">地址</td>
    <td class="tg-ya0j">命令字</td>
    <td class="tg-ya0j">命令数据</td>
    <td class="tg-ya0j">说明</td>
    <td class="tg-ya0j">帧数据校验</td>
  </tr>
  <tr>
    <td class="tg-ya0j">TYPE</td>
    <td class="tg-baqh">REG</td>
    <td class="tg-baqh">CMD</td>
    <td class="tg-baqh">DATA</td>
    <td class="tg-baqh"> </td>
    <td class="tg-baqh">DCHK</td>
  </tr>
  <tr>
    <td class="tg-ya0j">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh"> </td>
    <td class="tg-baqh">1字节</td>
  </tr>
  <tr>
    <td class="tg-ya0j">0xF0命令帧</td>
    <td class="tg-baqh">0x00</td>
    <td class="tg-baqh">0x50工作模式</td>
    <td class="tg-baqh">0x00:单行扫描模式0x01:多行扫描模式<span >0x02:录音模式</span>  <br />0x03:产测模式  <br />0x04:调试模式  <br />0x05:老化模式  <br />0x06:标定模式  <br />0x07：离线单行扫描模式</td>
    <td class="tg-amwm"><span >产测模式</span>：按压后，算法不运行，输出128*180的原图，其中输出的是第10帧图片，以供上位机UI显示原图，产测是否有遮挡或摄像头正常出图。  <br /><span >调试模式</span>：按压后，算法不运行，输出128*180的原图，持续输出，为算法优化提供原图。  <br /><span >老化模式</span>：无需按压，补光灯打开，算法运行，输出128*180的原图，持续输出图片。</td>
    <td class="tg-baqh">帧数据校验</td>
  </tr>
</tbody>
</table>

:::note使用示例

命令帧:设置成在线单行扫描模式

```
58 46 0b 00 04 53 f0 00 50 00 C0
```

响应帧：设置成功返回

```
58 46 0B 00 04 53 FF 00 01 10 F0 
```

> 查看[响应帧 0x01 命令帧反馈](#0x01命令帧反馈)

:::


### 0x51设置功能参数


<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38" colspan="7"><span >帧数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j">类型</td>
    <td class="tg-ya0j">地址</td>
    <td class="tg-ya0j">命令字</td>
    <td class="tg-ya0j" colspan="3">命令数据</td>
    <td class="tg-ya0j">帧数据校验</td>
  </tr>
  <tr>
    <td class="tg-ya0j">TYPE</td>
    <td class="tg-baqh">REG</td>
    <td class="tg-baqh">CMD</td>
    <td class="tg-baqh" colspan="3">DATA</td>
    <td class="tg-baqh">DCHK</td>
  </tr>
  <tr>
    <td class="tg-ya0j">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh" colspan="2">2字节</td>
    <td class="tg-baqh">1字节</td>
  </tr>
  <tr>
    <td class="tg-ya0j" rowspan="6">0xF0命令帧</td>
    <td class="tg-baqh" rowspan="6">0x00</td>
    <td class="tg-baqh" rowspan="6">0x51设置参数</td>
    <td class="tg-baqh">参数类型</td>
    <td class="tg-amwm" colspan="2">数据</td>
    <td class="tg-baqh"> </td>
  </tr>
  <tr>
    <td class="tg-baqh">0x00多行扫描时间间隔</td>
    <td class="tg-baqh" colspan="2">单位0.1S</td>
    <td class="tg-baqh" rowspan="5">帧数据校验</td>
  </tr>
  <tr>
    <td class="tg-baqh">0x01  <br />TTS合成基线语速</td>
    <td class="tg-0lax">语种（1字节）  <br />0：英文  <br />1：中文（暂不支持）</td>
    <td class="tg-baqh">语速（1字节）  <br />50-150</td>
  </tr>
  <tr>
    <td class="tg-baqh">0x02  <br />TTS合成语速</td>
    <td class="tg-baqh">语种，同上</td>
    <td class="tg-0lax">0：慢速，0.6倍基线语速  <br />1：中速，0.7倍基线语速  <br />2：快速，1.0倍基线语速</td>
  </tr>
  <tr>
    <td class="tg-baqh">0x03  <br />左手模式</td>
    <td class="tg-baqh" colspan="2">0：右手（默认值）  <br />1：左手</td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >...</span></td>
    <td class="tg-baqh" colspan="2"><span >...</span></td>
  </tr>
</tbody>
</table>

:::note使用示例

命令帧:设置左手持笔

```
58 46 0d 00 04 51 f0 00 51 03 01 00 bb
```

响应帧：设置成功返回

```
58 46 0B 00 04 53 FF 00 01 10 F0 
```

> 查看[响应帧 0x01 命令帧反馈](#0x01命令帧反馈)

:::

### 0x53下发合成文本


<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38" colspan="6"><span >帧数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j">类型</td>
    <td class="tg-ya0j">地址</td>
    <td class="tg-ya0j">命令字</td>
    <td class="tg-ya0j" colspan="2">命令数据</td>
    <td class="tg-ya0j">帧数据校验</td>
  </tr>
  <tr>
    <td class="tg-baqh">TYPE</td>
    <td class="tg-baqh">REG</td>
    <td class="tg-baqh">CMD</td>
    <td class="tg-baqh">DATA LEN</td>
    <td class="tg-baqh" colspan="2">DATA </td>
  </tr>
  <tr>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-0lax">4字节</td>
    <td class="tg-0lax"> </td>
    <td class="tg-baqh">1字节</td>
  </tr>
  <tr>
    <td class="tg-baqh">0xF0命令帧</td>
    <td class="tg-baqh">0x00</td>
    <td class="tg-baqh">0x53合成文本</td>
    <td class="tg-0lax"><span >合成文本长度</span></td>
    <td class="tg-0lax"><span >文本字符串</span></td>
    <td class="tg-baqh">帧数据校验</td>
  </tr>
</tbody>
</table>

:::note使用示例

命令帧:下发合成文本（文本为abcd）

```
58 46 17 00 04 47 f0 00 53 09 00 00 00 E4 B8 80 E4 BA 8C E4 B8 89 49
```

响应帧：设置成功返回

```
58 46 0B 00 04 53 FF 00 01 10 F0 ，58 46 0B 00 05 52 FF 00 50 0B A6 ，58 46 0B 00 05 52 FF 00 50 0C A5
```

> 查看[响应帧 0x01 命令帧反馈](#0x01命令帧反馈)

:::

### 0x54下发合成认证码

<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38" colspan="6"><span >帧数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j">类型</td>
    <td class="tg-ya0j">地址</td>
    <td class="tg-ya0j">命令字</td>
    <td class="tg-ya0j" colspan="2">命令数据</td>
    <td class="tg-ya0j">帧数据校验</td>
  </tr>
  <tr>
    <td class="tg-baqh">TYPE</td>
    <td class="tg-baqh">REG</td>
    <td class="tg-baqh">CMD</td>
    <td class="tg-baqh">DATA LEN</td>
    <td class="tg-baqh" colspan="2">DATA </td>
  </tr>
  <tr>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-0lax">4字节</td>
    <td class="tg-0lax"> </td>
    <td class="tg-baqh">1字节</td>
  </tr>
  <tr>
    <td class="tg-baqh">0xF0命令帧</td>
    <td class="tg-baqh">0x00</td>
    <td class="tg-baqh">0x54合成认证</td>
    <td class="tg-0lax"><span >认证码长度</span></td>
    <td class="tg-0lax"><span >认证码字符串</span></td>
    <td class="tg-baqh">帧数据校验</td>
  </tr>
</tbody>
</table>


### 响应帧

### 0x01命令帧反馈

系统正常启动、接收到命令帧后，CSK会发送本响应。


<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38" colspan="5"><span >帧数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j"><span >类型</span></td>
    <td class="tg-ya0j"><span >地址</span></td>
    <td class="tg-ya0j"><span >命令字</span></td>
    <td class="tg-ya0j" colspan="2"><span >命令数据</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >TYPE</span></td>
    <td class="tg-baqh"><span >REG</span></td>
    <td class="tg-baqh"><span >CMD</span></td>
    <td class="tg-baqh"><span >DATA</span></td>
    <td class="tg-baqh"><span >DCHK</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >0xFF响应帧</span></td>
    <td class="tg-baqh"><span >0x00</span></td>
    <td class="tg-baqh"><span >0x01命令帧反馈</span></td>
    <td class="tg-baqh"><span >0x00:系统初始化成功（系统正常启动后，会主动发送该响应）</span>  <br /><span > 0x10:收到正确的命令<br />0x11:数据帧格式错误<br />0x12:数据帧参数错误</span></td>
    <td class="tg-baqh"><span >帧数据校验</span></td>
  </tr>
</tbody>
</table>


### 0x50反馈工作状态

用于CSK反馈上位机当前的工作状态：待机状态，扫描状态，等待状态，拒绝状态等。


<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38" colspan="5"><span >帧数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j"><span >类型</span></td>
    <td class="tg-ya0j"><span >地址</span></td>
    <td class="tg-ya0j"><span >命令字</span></td>
    <td class="tg-ya0j" colspan="2"><span >命令数据</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >TYPE</span></td>
    <td class="tg-baqh"><span >REG</span></td>
    <td class="tg-baqh"><span >CMD</span></td>
    <td class="tg-baqh"><span >DATA</span></td>
    <td class="tg-baqh"><span >DCHK</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >0xFF响应帧</span></td>
    <td class="tg-0lax">0x00</td>
    <td class="tg-baqh"><span >0x50工作状态</span></td>
    <td class="tg-baqh"><span >0x00:待机状态0x01:扫描状态0x02:等待状态0x03:拒绝状态</span><br /><span >0x04;标定状态</span><br /><span >0x05:系统初始化完成</span><br /><span >0x06：摄像头初始化异常</span><br /><span >0x07：摄像头解析异常</span><br /><span >0x08：算法初始化异常</span><br /><span >0x09：OCR文本输出中</span><br /><span >0x0A：OCR文本输出结束</span><br /><span >0x0B：TTS合成输出中</span><br /><span >0x0C：TTS合成输出结束</span></td>
    <td class="tg-baqh"><span >帧数据校验</span></td>
  </tr>
</tbody>
</table>

### 0x51反馈标定状态

<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38" colspan="7"><span >帧数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j"><span >类型</span></td>
    <td class="tg-ya0j"><span >地址</span></td>
    <td class="tg-ya0j"><span >命令字</span></td>
    <td class="tg-ya0j" colspan="3"><span >命令数据</span></td>
    <td class="tg-ya0j"><span >帧数据校验</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >TYPE</span></td>
    <td class="tg-baqh"><span >REG</span></td>
    <td class="tg-baqh"><span >CMD</span></td>
    <td class="tg-baqh" colspan="3"><span >DATA</span></td>
    <td class="tg-baqh"><span >DCHK</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >0xFF响应帧</span></td>
    <td class="tg-baqh"><span >0x00</span></td>
    <td class="tg-baqh"><span >0x51标定状态</span></td>
    <td class="tg-baqh"><span >标定状态值</span></td>
    <td class="tg-baqh"><span >X坐标</span></td>
    <td class="tg-baqh"><span >Y坐标</span></td>
    <td class="tg-baqh"><span >帧数据校验</span></td>
  </tr>
</tbody>
</table>


<table class="tg">
<thead>
  <tr>
    <th class="tg-ya0j">标定状态值</th>
    <th class="tg-ya0j"><span >value</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">ADJUST_OK</td>
    <td class="tg-baqh">0</td>
  </tr>
  <tr>
    <td class="tg-0lax">ERROR_FULL_BLACK</td>
    <td class="tg-baqh">(0b01 &lt;&lt; 1)</td>
  </tr>
  <tr>
    <td class="tg-0lax">ERROR_CENTER_WHITE</td>
    <td class="tg-baqh">(0b01 &lt;&lt; 2)</td>
  </tr>
  <tr>
    <td class="tg-0lax">ERROR_UPON_LIGHT_OFF</td>
    <td class="tg-baqh">(0b01 &lt;&lt; 3)</td>
  </tr>
  <tr>
    <td class="tg-0lax">ERROR_DOWN_LIGHT_OFF</td>
    <td class="tg-baqh">(0b01 &lt;&lt; 4)</td>
  </tr>
</tbody>
</table>

### 0x04反馈软件版本

用于CSK反馈上位机当前软件版本。

<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38" colspan="5"><span >帧数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j"><span >类型</span></td>
    <td class="tg-ya0j"><span >地址</span></td>
    <td class="tg-ya0j"><span >命令字</span></td>
    <td class="tg-ya0j"><span >命令数据</span></td>
    <td class="tg-ya0j"><span >帧数据校验</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >TYPE</span></td>
    <td class="tg-baqh"><span >REG</span></td>
    <td class="tg-baqh"><span >CMD</span></td>
    <td class="tg-baqh"><span >DATA</span></td>
    <td class="tg-baqh"><span >DCHK</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
    <td class="tg-baqh"><span >4字节</span></td>
    <td class="tg-baqh"><span >1字节</span></td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >0xFF响应帧</span></td>
    <td class="tg-baqh"><span >0x00</span></td>
    <td class="tg-baqh"><span >0x04软件版本</span></td>
    <td class="tg-baqh"><span >0x01:固件版本0x02:拼接算法版本</span><br /><span >0x03:CHIPID</span><br /><span >0x04:切行算法版本</span><br /><span >0x05:OCR算法版本</span><br /><span >0x06:TTS引擎版本</span><br /><span >0x07:TTS发音人ID</span><br /><span >0x10:以上信息汇总</span><br /><span >VER_1:主版本</span><br /><span >VER_2:次版本号</span><br /><span >VER_3:保留</span></td>
    <td class="tg-baqh"><span >帧数据校验</span></td>
  </tr>
</tbody>
</table>

### 0x52反馈合成加密码


<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38" colspan="6"><span >帧数据</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j">类型</td>
    <td class="tg-ya0j">地址</td>
    <td class="tg-ya0j">命令字</td>
    <td class="tg-ya0j" colspan="2">命令数据</td>
    <td class="tg-ya0j">帧数据校验</td>
  </tr>
  <tr>
    <td class="tg-baqh">TYPE</td>
    <td class="tg-baqh">REG</td>
    <td class="tg-baqh">CMD</td>
    <td class="tg-baqh">DATA LEN</td>
    <td class="tg-baqh">DATA </td>
    <td class="tg-baqh">DCHK</td>
  </tr>
  <tr>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-baqh">1字节</td>
    <td class="tg-0lax">4字节</td>
    <td class="tg-0lax"> </td>
    <td class="tg-baqh">1字节</td>
  </tr>
  <tr>
    <td class="tg-baqh"><span >0xFF响应帧</span></td>
    <td class="tg-baqh">0x00</td>
    <td class="tg-baqh">0x52合成加密</td>
    <td class="tg-0lax"><span >加密码长度</span></td>
    <td class="tg-0lax"><span >加密码字符串</span></td>
    <td class="tg-baqh">帧数据校验</td>
  </tr>
</tbody>
</table>

### 接口参数


<table class="tg">
<thead>
  <tr>
    <th class="tg-ll38"><span >波特率</span></th>
    <th class="tg-ll38"><span >数据位</span></th>
    <th class="tg-ll38"><span >校验位</span></th>
    <th class="tg-ll38"><span >停止位</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-ya0j"><span >115200</span></td>
    <td class="tg-ya0j"><span >8</span></td>
    <td class="tg-ya0j"><span >无</span></td>
    <td class="tg-ya0j"><span >1</span></td>
  </tr>
</tbody>
</table>