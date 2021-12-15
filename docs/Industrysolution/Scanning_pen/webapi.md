---
sidebar_label: 云端协议接口说明
sidebar_position: 4
---

# 扫描笔云端协议接口说明


## 更新记录

| 版本 | 更新说明                                                     | 责任人 | 日期      |
| ---- | ------------------------------------------------------------ | ------ | --------- |
| 1.0  | 初版定义                                                     | 李逸卿 | 2021.1.14 |
| 1.1  | 新增文本翻译接口，用于收藏夹中的句子翻译                     | 李逸卿 | 2021.1.19 |
| 1.2  | 修改语音翻译和文本翻译协议，新增`translation`字段            | 李逸卿 | 2021.1.25 |
| 1.3  | 新增图像帧数据协议说明                                       | 梁展晖 | 2021.2.02 |
| 1.4  | 新增多行扫描请求方式                                         | 李逸卿 | 2021.3.2  |
| 1.5  | 多行扫描请求更改为实时扫描参数，修改多行扫描交互方式         | 梁展晖 | 2021.3.7  |
| 1.6  | 增加翻译语种字段：recognizer.visual_result增加data.from、data.to字段，recognizer.trans_result增加data.from、data.to字段 | 梁展晖 | 2021.3.9  |
| 1.7  | 更新单词查询接口地址 | 梁展晖 | 2021.3.11  |
| 1.8  | 增加jpeg格式协议说明。帧头数据格式FMT增加JPEG: 0x30，保留数据添加jpeg说明 | 梁展晖 | 2021.3.22  |
| 1.9  | visuale_in请求增加参数image_metadata.reverse，支持竖向拼接图片 | 梁展晖 | 2021.3.24 |
| 1.10 | visual_in请求添加debug, image_debug字段用于调试 | 梁展晖 | 2021.5.27 |
| 1.11 | 增加请求上限限制：翻译上限：256字符，ocr上限：4090px | 李逸卿 | 2021.6.3 |
| 1.12 | 1. visual_in增加tokenization字段，用于**开启/关闭中文分词**；2. visual_result增加segs字段，用于返回中文分词结果 | 胡星晨 | 2021.7.16 |
| 1.13 | 1. 更新**词典接口**，支持中文单字、单词、成语以及英文单词查询；2. 优化中文分词逻辑 | 胡星晨 | 2021.8.11 |
| 1.14 | 1. 请求协议visual_in新增**词典开关**`dictionary`和**教育内容开关**`resources` ，返回结果`profile`新增`DICTIONARY`代表词典内容返回，`RESOURCES`代表教育内容返回。；2. 词典中文单字接口返回新增字典`strokes.gif`，供分辨率低屏幕展示笔画。 | 刘钟蔚 | 2021.9.17 |
| 1.15 | 1. 修正`image_metadata.tokenization`字段 | 刘钟蔚 | 2021.9.18 |
| 1.16 | **词典查询**的英文单词返回新增`details_us_pronunce`美式发音字段。 | 刘钟蔚 | 2021.9.28 |
| 1.17 | 更新**口语练习**相关协议和接口说明 | 张毅 | 2021.10.22 |
| 1.18 | 更新词典**诗词**返回相关协议和接口说明 | 刘钟蔚 | 2021.12.13 |
| 1.19 | 增加语速设置接口说明 | 刘钟蔚 | 2021.12.15 |




## 已有能力

在开始对接iFLYOS之前，请先查阅[线上文档](https://doc.iflyos.cn/device/evs/)的已有能力，本文档主要描述新增能力。

在扫描笔的实现过程中，主要需要实现以下能力：

| name                                                         | 说明                                            | 实现要求 |
| ------------------------------------------------------------ | ----------------------------------------------- | -------- |
| [recognizer](https://doc.iflyos.cn/device/evs/reference/recognizer.html) | 识别器，这是iFLYOS交互的基础                    | 必须实现 |
| [audio_player](https://doc.iflyos.cn/device/evs/reference/audio_player.html) | 音频播放器，在扫描笔项目中播放的内容是TTS语音   | 必须实现 |
| [system](https://doc.iflyos.cn/device/evs/reference/system.html) | 系统相关                                        | 必须实现 |
| [speaker](https://doc.iflyos.cn/device/evs/reference/speaker.html) | 扬声器控制                                      | 必须实现 |
| [screen](https://doc.iflyos.cn/device/evs/reference/screen.html) | 屏幕控制                                        | 可选实现 |
| [interceptor](https://doc.iflyos.cn/device/evs/reference/interceptor.html) | 自定义拦截器，是iFLYOS 实现自定义语义理解的基础 | 可选实现 |


## 扫描翻译

#### 业务流程图

![](./files/21.png)

在流程图中可以看出：

1. 设备端一次请求会收到至少4个iFLYOS的回复
2. 设备端通过流的方式传输图片至iFLYOS云端
3. 若开启中文分词，且原文包含中文时，iFLYOS将返回原文分词结果，否则返回原文原始文本

### 请求协议visual_in

```json
{
  "iflyos_header": {...},
  "iflyos_context": {...},
  "iflyos_request": {
    "header": {
      "name": "recognizer.visual_in",
      "request_id": "xxxxxxxx"
    },
    "payload": {
      "profile": "OCR_TRANS_TTS",
      "realtime": true,
      "image_metadata":{
        "reverse": true,
        "tokenization":true,
        "dictionary":true, // 0917新增: 词典开关
        "resources":true, // 0917新增: 教育内容开关
      	"height": 128,
      	"image_data_debug": false,
      	"debug": false
      }
    }
  }
}

```



| 参数                  | 类型    | 说明                                                         | 必填 |
| :-------------------- | :------ | :----------------------------------------------------------- | :--- |
| iflyos_header         | Object  | 构建的通用 iflyos_header                                     | 是   |
| iflyos_context        | Object  | 构建的通用 iflyos_context                                    | 是   |
| profile               | String  | 请求操作，具体取值见下表                                     | 是   |
| realtime              | Boolean | 实时识别，多行扫描时必须开启，会实时返回识别结果。实时识别也支持单行扫描，与原单行扫描协议一致。 | 是   |
| image_metadata        | Object  | 图像相关信息                                                 | 是   |
| image_metadata.height | Int     | 图片高度，单位是px                                           | 是   |
| image_metadata.reverse | boolean     | 竖向拼接图片，默认为`false`                                           | 否   |
| image_metadata.tokenization | Boolean | 中文分词，设置为`true`且原文为中文，则返回中文分词结果。若未开启或原文为英文，则返回原文原始文本。 |  |
| image_metadata.dictionary | Boolean | 词典开关，设置为`true`时调用词典接口 | 否 |
| image_metadata.resources | Boolean | 教育内容开关，设置为`true`时调用教育内容接口 | 否 |
| image_metadata.image_debug | boolean     | 设置为`true`时，云端暂存设备上报的数据用于从调试接口获取图片等数据，仅供开发调试使用。此时请务必将原图使用jpeg算法压缩后传输。默认为`false`      | 否   |
| image_metadata.debug | boolean     | 设置为`true`时，云端收集ocr相关信息用于算法调试，仅供开发调试使用，默认为`false` 。处于debug模式时扫描图片，云端不会返回识别结果，只会将采集后的图片保存，用于后续算法优化。 | 否   |

`profile`取值

| `profile` 取值 | 说明                                   |
| :------------- | :------------------------------------- |
| OCR            | 图像识别，返回识别结果                 |
| OCR_TTS        | 图像识别，语音合成识别结果             |
| OCR_TRANS      | 图像识别，翻译识别结果                 |
| OCR_TRANS_TTS  | 图像识别，翻译识别结果，合成原文和译文 |
| TEXTBOOK       | 教材指读，暂未开放                     |

##### 发送图像数据

在发送`image_in`请求后，客户端流传图像二进制元数据。通过`__END__`标记数据发送完成。

> 注意：
>
> - 传输图片时，按列从上到下，从左到右传输。
> - 多行扫描时，开始扫描发一个`visual_in`请求，发送图片数据，换行时发送换行帧。当用户在超时时间（建议2s）内没有扫描新的数据，发送`__END__`标记结束识别。

##### 图像帧数据协议说明

![1](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/tmp/1.png)

##### 多行扫描换行帧

协议格式与图像帧数据协议一致，仅`图像类型`固定为`0xFF`，其他字段任意，无帧数据。

**换行帧示例**

![2](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/tmp/2.png)

##### 帧头保留数据说明

###### JPEG

当图像格式为JPEG（0x30）时，保留数据为数据帧长度: uint16, 小端字节序

### 返回示例


##### OCR结果/翻译结果

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "recognizer.visual_result"
      },
      "payload": {
        "is_last": true,
        "profile": "OCR",
        "data": {
          "code": 0,
          "description": "success",
          "sid": "xxxxxxx",
          "content":"null",
           segs：['欢迎','购买','聆','思','智能','扫描','笔',]
          "from": null,
          "to": null
        }
      }
    }
  ]
}
```


| 参数             | 类型   | 说明                                                         | 必有 |
| ---------------- | ------ | ------------------------------------------------------------ | ---- |
| is_last          | Bool   | 是否为最终结果，`true`表示当前文本为最终结果，`false`表示当前文本不是最终状态，只有在原文识别，实时扫描的情况下会出现取值为`false` | 是   |
| profile          | String | AI引擎名称，取值为`OCR`，`TRANS`或`TEXTBOOK`（暂未开放）     | 是   |
| data             | Object | 引擎处理结果                                                 | 是   |
| data.code        | Int    | 请求结果代码，0代表成功。[错误码查询](https://www.xfyun.cn/document/error-code) | 是   |
| data.description | String | 请求结果说明                                                 | 是   |
| data.sid         | String | 图像识别请求的唯一标识                                       | 是   |
| data.content     | String | 1. 若`profile`取值为`OCR`，`is_last`为 `false` 时，返回扫描识别的文本结果。；`is_last`为 `true` 时，返回`null`；2. 若`profile`取值为`TRANS`，则这里返回的是翻译的结果。；3. 若设备处于`debug`模式，则这里固定返回”原图已采集完成“ | 是   |
| Data.segs | String | 1. 若设备开启分词，处于单行扫描模式，且原文包含中文；或处于多行扫描， 且 `is_last`为 `true` 时，返回分词结果，词与词之间通过英文逗号隔开；2. 其余情况此处返回`null` | 是 |
| data.from     | String | 1. 若`profile`为`TRANS`时表示翻译原语种。取值:；**cn**(中文)；**en**(英文)；2. 若`profile`为其他时值为`null` | 否   |
| data.to     | String | 1. 若`profile`为`TRANS`时表示翻译结果语种。取值:；**cn**(中文)；**en**(英文)；2. 若`profile`为其他时值为`null` | 否  |

##### 词典结果

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "recognizer.visual_result"
      },
      "payload": {
        // 新增profile: "DICTIONARY"
        "profile": "DICTIONARY",
        // data中内容与词典接口返回结果相同
        "data": {
	    	"content":"愚公移山",
    		"type":"idiom",
	    	"details":[
	        {
            "pronunce":[
                {
                    "symbol":[
                        "yú",
                        "gōng",
                        "yí",
                        "shān"
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "definition":[
                {
                    "description":[
                        "比喻坚持不懈地改造自然和坚定不移地进行斗争。"
                    ]
                }
            ],
            "origin":"《列子·汤问》记载：愚公家门前有两大座山挡着路，他决...",
            "synonyms":[
                "锲而不舍",
                "持之以恒"
            ],
            "antonyms":[
                "虎头蛇尾",
                "有头无尾"
            ],
            "story":"传说古代有两座大山间住着一个90岁的愚公，他每次出门因大山阻隔，要绕很大的弯子......",
            "poem":[
                "太行、王屋二山，方七百里，高万仞，本在冀州之南，河阳之北。",
                "北山愚公者，年且九十，面山而居...",
                "河曲智叟笑而止之曰..."
            ]
        }
    ]
}
```

| 参数    | 类型   | 说明                                                         | 必有 |
| ------- | ------ | ------------------------------------------------------------ | ---- |
| profile | String | `DICTIONARY`为词典返回内容                                   | 是   |
| data    | Object | data中内容与词典接口返回结果相同，可参考本文档[词典查询接口](#中文单字返回示例) | 是   |

##### 教育内容结果

```json
{
    "iflyos_meta": {
											……
    },
    "iflyos_responses": [
        {
            "header": {
                "name": "recognizer.visual_result"
            },
            "payload": {
                "is_last": true,
                "profile": "RESOURCES",
                "data": {
                    "resources": [
                        {
                            "type": "poem",
                            "title": "静夜思",
                            "score": 10001.4380398989,
                            "extra": {
                                "review": [
                                    [
                                        {
                                            "url": "https://cdn.iflyos.cn/public/ocr_resources/poem_review/7a53928fa4dd31e82c6ef826f341daec.mp3",
                                            "title": "创作背景",
                                            "content_url": "https://console.iflyos.cn/api/v1/ocr/resources/value?type=poem&id=10&key=review_0"
                                        }
                                    ],
                                    [
                                        {
                                            "url": "https://cdn.iflyos.cn/public/ocr_resources/poem_review/1905aedab9bf2477edc068a355bba31a.mp3",
                                            "title": "赏析",
                                            "content_url": "https://console.iflyos.cn/api/v1/ocr/resources/value?type=poem&id=10&key=review_1"
                                        }
                                    ],
                                    [
                                        {
                                            "url": "https://cdn.iflyos.cn/public/ocr_resources/poem_review/28267ab848bcf807b2ed53c3a8f8fc8a.mp3",
                                            "title": "版本说明",
                                            "content_url": "https://console.iflyos.cn/api/v1/ocr/resources/value?type=poem&id=10&key=review_2"
                                        }
                                    ],
                                    [
                                        {
                                            "url": "https://cdn.iflyos.cn/public/ocr_resources/poem_review/1141938ba2c2b13f5505d7c424ebae5f.mp3",
                                            "title": "评析",
                                            "content_url": "https://console.iflyos.cn/api/v1/ocr/resources/value?type=poem&id=10&key=review_3"
                                        }
                                    ]
                                ],
                                "explain": [
                                    [
                                        {
                                            "url": "https://cdn.iflyos.cn/public/ocr_resources/poem_explain/7f5d04d189dfb634e6a85bb9d9adf21e.mp3",
                                            "title": "译文及注释",
                                            "content_url": "https://console.iflyos.cn/api/v1/ocr/resources/value?type=poem&id=10&key=explain_0"
                                        }
                                    ]
                                ],
                                "author": "李白",
                                "audio_url": "https://cdn.iflyos.cn/public/ocr_resources/poem_audio/1d8cf949089ce92c96a3e8e60c6cc19e.mp3"
                            },
                            "content": "床前明月光，疑是地上霜。举头望明月，低头思故乡。"
                        },
                        {
                            "type": "poem",
                            "title": "满庭芳·静夜思",
                            "score": 10000.9036120772,
                            "extra": {
                                "review": [],
                                "explain": [],
                                "author": "辛弃疾",
                                "audio_url": "https://cdn.iflyos.cn/public/ocr_resources/poem_audio/16537a893ccfbec9727293bb3cdd4962.mp3"
                            },
                            "content": "云母屏开，珍珠帘闭，防风吹散沉香。离情抑郁，金缕织硫黄。柏影桂枝交映，从容起，弄水银堂。连翘首，惊过半夏，凉透薄荷裳。一钩藤上月，寻常山夜，梦宿沙场。早已轻粉黛，独活空房。欲续断弦未得，乌头白，最苦参商。当归也！茱萸熟，地老菊花黄。"
                        },
                        {
                            "type": "audio",
                            "title": "静夜思",
                            "score": 10001.4380398989,
                            "extra": {
                                "audio_url": "http://mp3play.61gequ.com/audio/33/1604-1532945740516.mp3"
                            },
                            "content": null
                        }
                    ]
                }
            }
        }
    ]
}
```

| 参数                      | 类型   | 说明                                         | 必有 |
| ------------------------- | ------ | -------------------------------------------- | ---- |
| profile                   | String | `RESOURCES`为教育内容库的内容返回            | 是   |
| data                      | Object | 返回结果                                     | 是   |
| resources                 | Object | 资源结果                                     | 是   |
| type                      | String | 单词、词语、四字成语、文言文、古诗词、歇后语 | 是   |
| title                     | String | 内容标题                                     | 是   |
| score                     | float  | 内容匹配置信度                               | 是   |
| content                   | String | 详细内容                                     | 是   |
| extra                     | Object | 更多的内容，不同类型资源不同                 | 否   |
| extra.review              | Object | 故事、文言文复习相关内容                     | 否   |
| extra.review.title        | String | 内容类型                                     | 否   |
| extra.review.url          | String | 复习音频链接                                 | 否   |
| extra.review.content_url  | String | 复习音频文本                                 | 否   |
| extra.explain             | Object | 故事、文言文译文                             | 否   |
| extra.explain.title       | String | 内容类型                                     | 否   |
| extra.explain.url         | String | 译文音频链接                                 | 否   |
| extra.explain.content_url | String | 译文音频文本                                 | 否   |

##### TTS

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "audio_player.audio_out"
      },
      "payload": {
        "type": "TTS",
        "url": "http://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "secure_url": "https://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "behavior": "SERIAL",
        "resource_id": "e52e7xxxxxxxxxxxe52e7"
		"content_type": "original"
      }
    }
  ]
}

```


| 参数         | 类型   | 说明                                                         | 必有 |
| :----------- | :----- | :----------------------------------------------------------- | :--- |
| type         | String | 播放器类型，此处取值`TTS`                                    | 是   |
| behavior     | String | 资源播放方式。&lt;br&gt;当`type`取值为`TTS`时，`behavior`取值：&lt;br&gt;- SERIAL：串行TTS，执行时阻塞，播完TTS才可以执行下一个指令）&lt;br&gt;- PARALLEL：并行，执行不阻塞，开始播放TTS时可以同时执行后续指令。若该字段未出现，默认为SERIAL | 否   |
| url          | String | 内容播放地址，可能放的是http的链接，设备解析速度会更快，但有可能会被劫持 | 否   |
| secure_url   | String | 内容播放的安全地址，放的是不会被劫持的https链接，但设备解析速度可能会相对慢一些 | 否   |
| resource_id  | String | 内容ID                                                       | 否   |
| content_type | String | TTS类型，取值为` original`代表原文，取值为`translation`代表译文。仅在图片/语音/文本翻译过程中会出现 | 否   |

#### 上限说明

- OCR识别服务最长支持`4090px`长度的图片，若扫描内容超长，云端将会回复报错的TTS。
- 翻译服务最多支持256字符的翻译长度，若翻译内容超长，云端会在译文文本和TTS处返回报错提示。

> 注意：
>
> 当设备端处于debug模式时，每次完成扫描，云端均会下发”原图已采集完成“的TTS音频，表示本次数据采集已完成。





## 语音翻译

流程图

![](./files/22.png)


### 请求示例

语音翻译请求
```json
{
  "iflyos_header": {...},
  "iflyos_context": {...},
  "iflyos_request": {
    "header": {
      "name": "recognizer.audio_in",
      "request_id": "xxxxxxxx"
    },
    "payload": {
      "enable_vad": false,
      "profile": "CLOSE_TALK",
      "format": "AUDIO_L16_RATE_16000_CHANNELS_1",
      "translation": true
    }
  }
}
```




| 参数           | 类型   | 说明                                                         | 必填 |
| :------------- | :----- | :----------------------------------------------------------- | :--- |
| iflyos_header  | Object | 构建的通用 iflyos_header                                     | 是   |
| iflyos_context | Object | 构建的通用 iflyos_context                                    | 是   |
| enable_vad     | Bool   | 是否使用云端VAD，此处需取值为`false`。                       | 否   |
| profile        | String | 音频输入的处理引擎。近场取值`CLOSE_TALK`，远场取值`FAR_FIELD`。 | 是   |
| format         | String | 音频编码类型，取值见下表                                     | 是   |
| translation    | Bool   | 本次请求是否需要翻译。默认取值为FALSE，若取值为TRUE，将只翻译不请求NLU | 否   |


### 返回示例

##### 语音识别结果

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "recognizer.intermediate_text"
      },
      "payload": {
        "text": "明天的天气怎么样",
        "is_last": false
      }
    }
  ]
}
```
##### 语音翻译结果

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "recognizer.trans_result"
      },
      "payload": {
        "code": 0,
        "description": "success",
        "sid": "xxxxxxx",
        "data":{
          "dst": "Hello World ",
          "src": "你好世界",
          "from": "cn",
          "to": "en"
        }
      }
    }
  ]
}
```
| 参数        | 类型   | 说明                                                         | 必有 |
| ----------- | ------ | ------------------------------------------------------------ | ---- |
| code        | Int    | 请求结果代码，0代表成功。[错误码查询](https://www.xfyun.cn/document/error-code) | 是   |
| description | String | 请求结果说明                                                 | 是   |
| sid         | String | 图像识别请求的唯一标识                                       | 是   |
| data        | Object | 图像识别请求的结果                                           | 是   |
| data.dst    | String | 译文文本                                                     | 是   |
| data.src    | String | 原文文本                                                     | 是   |
| data.from     | String | 翻译原语种。取值:；**cn**(中文)；**en**(英文) | 是 |
| data.to     | String | 翻译结果语种。取值:；**cn**(中文)；**en**(英文) | 是 |

##### TTS

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "audio_player.audio_out"
      },
      "payload": {
        "type": "TTS",
        "url": "http://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "secure_url": "https://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "behavior": "SERIAL",
        "resource_id": "e52e7xxxxxxxxxxxe52e7"
		"content_type": "translation"
      }
    }
  ]
}

```
| 参数         | 类型   | 说明                                                         | 必有 |
| :----------- | :----- | :----------------------------------------------------------- | :--- |
| type         | String | 播放器类型，此处取值`TTS`                                    | 是   |
| behavior     | String | 资源播放方式。&lt;br&gt;当`type`取值为`TTS`时，`behavior`取值：&lt;br&gt;- SERIAL：串行TTS，执行时阻塞，播完TTS才可以执行下一个指令）&lt;br&gt;- PARALLEL：并行，执行不阻塞，开始播放TTS时可以同时执行后续指令。若该字段未出现，默认为SERIAL | 否   |
| url          | String | 内容播放地址，可能放的是http的链接，设备解析速度会更快，但有可能会被劫持。 | 否   |
| secure_url   | String | 内容播放的安全地址，放的是不会被劫持的https链接，但设备解析速度可能会相对慢一些 | 否   |
| resource_id  | String | 内容ID                                                       | 否   |
| content_type | String | TTS类型，取值为` original`代表原文，取值为`translation`代表译文。仅在图片/语音/文本翻译过程中会出现 | 否   |

#### 上限说明

翻译服务最多支持256字符的翻译长度，若翻译内容超长，云端会在译文文本和TTS处返回报错提示。

## 文本翻译

### 请求示例

```json
{
  "iflyos_header": {...},
  "iflyos_context": {...},
  "iflyos_request": {
    "header": {
      "name": "recognizer.text_in",
      "request_id": "xxxxxxxx"
    },
    "payload": {
      "query": "请求的文本",
      "with_tts": true,
      "translation": true
    }
  }
}
```



| 参数           | 类型   | 说明                                                         | 必填 |
| :------------- | :----- | :----------------------------------------------------------- | :--- |
| iflyos_header  | Object | 构建的通用 iflyos_header                                     | 是   |
| iflyos_context | Object | 构建的通用 iflyos_context                                    | 是   |
| query          | String | 请求文本                                                     | 是   |
| with_tts       | Bool   | 是否需要语音回复，如果你希望用户点击按钮的时候，不要出现提示音，那么可以设置为 false，默认为：true | 否   |
| translation        | Bool | 本次请求是否需要翻译。默认取值为FALSE，若取值为TRUE，将只翻译不请求NLU    | 否   |

### 返回示例

##### 文本翻译结果

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "recognizer.trans_result"
      },
      "payload": {
        "code": 0,
        "description": "success",
        "sid": "xxxxxxx",
        "data":{
          "dst": "Hello World ",
          "src": "你好世界",
          "from": "cn",
          "to": "en"
        }
      }
    }
  ]
}
```

| 参数        | 类型   | 说明                                                         | 必有 |
| ----------- | ------ | ------------------------------------------------------------ | ---- |
| code        | Int    | 请求结果代码，0代表成功。[错误码查询](https://www.xfyun.cn/document/error-code) | 是   |
| description | String | 请求结果说明                                                 | 是   |
| sid         | String | 图像识别请求的唯一标识                                       | 是   |
| data        | Object | 图像识别请求的结果                                           | 是   |
| data.dst    | String | 译文文本                                                     | 是   |
| data.src    | String | 原文文本                                                     | 是   |
| data.from     | String | 翻译原语种。取值:；**cn**(中文)；**en**(英文) | 是 |
| data.to     | String | 翻译结果语种。取值:；**cn**(中文)；**en**(英文) | 是 |

##### TTS

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "audio_player.audio_out"
      },
      "payload": {
        "type": "TTS",
        "url": "http://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "secure_url": "https://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "behavior": "SERIAL",
        "resource_id": "e52e7xxxxxxxxxxxe52e7"
		"content_type": "translation"
      }
    }
  ]
}

```

| 参数         | 类型   | 说明                                                         | 必有 |
| :----------- | :----- | :----------------------------------------------------------- | :--- |
| type         | String | 播放器类型，此处取值`TTS`                                    | 是   |
| behavior     | String | 资源播放方式。&lt;br&gt;当`type`取值为`TTS`时，`behavior`取值：&lt;br&gt;- SERIAL：串行TTS，执行时阻塞，播完TTS才可以执行下一个指令）&lt;br&gt;- PARALLEL：并行，执行不阻塞，开始播放TTS时可以同时执行后续指令。若该字段未出现，默认为SERIAL | 否   |
| url          | String | 内容播放地址，可能放的是http的链接，设备解析速度会更快，但有可能会被劫持。 | 否   |
| secure_url   | String | 内容播放的安全地址，放的是不会被劫持的https链接，但设备解析速度可能会相对慢一些 | 否   |
| resource_id  | String | 内容ID                                                       | 否   |
| content_type | String | TTS类型，取值为` original`代表原文，取值为`translation`代表译文。仅在图片/语音/文本翻译过程中会出现 | 否   |

#### 上限说明

翻译服务最多支持256字符的翻译长度，若翻译内容超长，云端会在译文文本和TTS处返回报错提示。



## 词典查询接口

### 单词查询

你可以在设备上选择一个单词，查询单词释义。

#### 接口地址

```
GET https://api.iflyos.cn/external/ocr/dict
```

#### 请求headers

```
Authorization: Bearer {token}
```

{token}为设备端token

#### 请求参数

| 参数名 | 类型   | 说明               |
| ------ | ------ | ------------------ |
| q      | string | 指定翻译单词、单词 |

### 中文单字返回示例

```json
{
    "content":"好",
    "type":"characters",
    "side":"女",
    "structures":"左右",
    "grade":"1",
    "details":[
        {
            "pronunce":{
                "symbol":"hǎo",
                "url":"http://dict.cn/mp3.php?q=efVw7 "
            },
            "spelling":[
                {
                    "section":[
                        1,
                        2
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "synonyms":[
                "美",
                "佳"
            ],
            "antonyms":[
                "糟",
                "坏",
                "差"
            ],
            "sample":[
                "她画画很好",
                "我们今天的生活很美好"
            ],
            "errorpronewords":[
            ],
            "definition":[
                {
                    "description":"身体强壮的，事事顺心的。",
                    "sample":[
                        "好身手",
                        "您好",
                        "安好",
                        "好身体"
                    ]
                },
                {
                    "description":"方便，便利。",
                    "sample":[
                        "好用",
                        "好办",
                        "好使",
                        "好弄",
                        "拿走东西好让我进去。"
                    ]
                },
                {
                    "description":"和谐，友爱，平和。",
                    "sample":[
                        "交好",
                        "友好",
                        "相好",
                        "和好",
                        "好朋友"
                    ]
                }
            ],
            "related":{
                    "idiom":[
                        "不好意思",
                        "好事多磨",
                        "花好月圆"
                    ],
                    “prefix":[
                        "好像",
                        "好好",
                        "好处",
                        "好多",
                        "好看",
                        "好些"
                    ],
                    "suffix":[
                        "不好",
                        "只好",
                        "良好"
                    ]
                }
        },
        {
            "pronunce":{
                "symbol":"hào",
                "url":"http://dict.cn/mp3.php?q=efVw7 "
            },
            "spelling":[
                {
                    "section":[
                        1,
                        2
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "synonyms":[
            ],
            "antonyms":[
            ],
            "sentences":[
            ],
            "errorpronewords":[
            ],
            "definition":[
                {
                    "description":"喜欢，和“讨厌”相反。",
                    "sample":[
                        "爱好",
                        "好奇",
                        "好动",
                        "好学",
                        "好高骛远"
                    ]
                },
                {
                    "description":"不时，频频发生。",
                    "sample":[
                        "菠萝不快点吃掉就好烂。"
                    ]
                }
            ],
            "related":[
                {
                    "idiom":[
                        "好吃懒做",
                        "好大喜功",
                        "好高骛远",
                        "好为人师"
                    ],
                    "Prefix":[
                        "好事",
                        "好奇",
                        "好奇心"
                    ],
                    "suffix":[
                        "爱好",
                        "嗜好",
                        "洁身自好"
                    ]
                }
            ]
        }
    ],
    "strokes":{
            "strokescount":"6",
            "gif": "https://staging-api.iflyos.cn/external/ocr/stroke_gif/5LqU",
            "strokesorder":[
                "PD",
                "P",
                "H",
                "HP",
                "WG",
                "H"
            ],
            "strokespath":[
                "M 330 202 Q 361 175 399 134 Q 415 119 424 118 Q 433 118 439 128 Q 446 138 442 170 Q 435 206 361 247 L 319 270 Q 292 286 258 304 Q 237 314 240 335 Q 261 393 281 453 L 293 492 Q 317 568 337 644 Q 347 690 366 715 Q 379 737 373 750 Q 360 769 313 797 Q 294 810 276 801 Q 263 794 273 778 Q 303 733 247 486 L 236 442 Q 218 373 195 336 Q 185 314 206 296 Q 254 268 294 233 L 330 202 Z",
                "M 294 233 Q 287 226 281 217 Q 250 180 196 143 Q 183 134 165 124 Q 149 114 133 104 Q 120 95 131 92 Q 212 86 327 199 Q 328 200 330 202 L 361 247 Q 406 322 421 385 Q 449 488 463 510 Q 473 526 458 537 Q 416 576 387 569 Q 374 565 378 550 Q 387 531 387 507 L 385 481 Q 384 469 382 455 Q 375 376 319 270 L 294 233 Z",
                "M 387 507 Q 341 501 293 492 L 247 486 Q 183 479 115 468 Q 94 465 61 471 Q 48 471 45 462 Q 41 450 49 441 Q 68 422 96 400 Q 106 396 118 402 Q 190 436 236 442 L 281 453 Q 320 463 362 474 Q 372 478 385 481 C 414 489 417 511 387 507 Z",
                "M 671 521 Q 788 635 822 648 Q 843 655 835 672 Q 831 688 760 725 Q 739 735 716 725 Q 661 703 575 676 Q 553 669 498 669 Q 473 669 482 648 Q 491 635 511 623 Q 544 605 578 627 Q 597 636 691 676 Q 706 682 719 673 Q 732 664 726 649 Q 693 595 655 531 C 640 505 649 500 671 521 Z",
                "M 717 430 Q 702 497 671 521 L 655 531 Q 648 535 640 538 Q 618 547 608 540 Q 595 533 608 519 Q 645 491 653 444 Q 656 434 659 421 L 668 384 Q 701 204 658 103 Q 643 76 607 83 Q 576 89 548 94 Q 536 97 542 85 Q 546 78 564 65 Q 604 31 618 5 Q 628 -14 645 -11 Q 660 -10 687 17 Q 775 107 726 391 L 717 430 Z",
                "M 726 391 Q 783 397 947 397 Q 966 398 971 406 Q 977 416 960 430 Q 909 467 848 454 Q 793 445 717 430 L 659 421 Q 562 409 452 393 Q 431 392 447 375 Q 460 362 478 357 Q 497 351 514 356 Q 586 375 668 384 L 726 391 Z"
            ],
            "storkes_medians":[
                [
                    [
                        282,
                        788
                    ],
                    [
                        307,
                        769
                    ],
                    [
                        327,
                        733
                    ],
                    [
                        264,
                        465
                    ],
                    [
                        216,
                        321
                    ],
                    [
                        235,
                        298
                    ],
                    [
                        386,
                        194
                    ],
                    [
                        411,
                        166
                    ],
                    [
                        424,
                        133
                    ]
                ],
                [
                    [
                        390,
                        556
                    ],
                    [
                        417,
                        530
                    ],
                    [
                        424,
                        516
                    ],
                    [
                        422,
                        504
                    ],
                    [
                        387,
                        361
                    ],
                    [
                        338,
                        255
                    ],
                    [
                        304,
                        207
                    ],
                    [
                        260,
                        165
                    ],
                    [
                        206,
                        127
                    ],
                    [
                        137,
                        97
                    ]
                ],
                [
                    [
                        59,
                        457
                    ],
                    [
                        107,
                        434
                    ],
                    [
                        373,
                        491
                    ],
                    [
                        380,
                        501
                    ]
                ],
                [
                    [
                        493,
                        656
                    ],
                    [
                        517,
                        646
                    ],
                    [
                        550,
                        644
                    ],
                    [
                        680,
                        692
                    ],
                    [
                        706,
                        699
                    ],
                    [
                        743,
                        696
                    ],
                    [
                        771,
                        669
                    ],
                    [
                        765,
                        657
                    ],
                    [
                        677,
                        546
                    ],
                    [
                        674,
                        535
                    ],
                    [
                        663,
                        536
                    ]
                ],
                [
                    [
                        613,
                        530
                    ],
                    [
                        637,
                        519
                    ],
                    [
                        659,
                        499
                    ],
                    [
                        674,
                        474
                    ],
                    [
                        687,
                        432
                    ],
                    [
                        711,
                        289
                    ],
                    [
                        709,
                        166
                    ],
                    [
                        692,
                        92
                    ],
                    [
                        672,
                        59
                    ],
                    [
                        648,
                        41
                    ],
                    [
                        551,
                        85
                    ]
                ],
                [
                    [
                        449,
                        384
                    ],
                    [
                        504,
                        377
                    ],
                    [
                        860,
                        427
                    ],
                    [
                        906,
                        426
                    ],
                    [
                        960,
                        412
                    ]
                ]
        }
    ]
}
```

| 参数                           | 类型      | 说明                                                         |
| :----------------------------- | :-------- | :----------------------------------------------------------- |
| content                        | String    | 汉字内容                                                     |
| type                           | String    | 汉字类型固定值为【characters】                               |
| side                           | String    | 偏旁                                                         |
| structures                     | String    | 结构                                                         |
| grade                          | String    | 年级                                                         |
| details                        | JSONArray | 汉字详细信息，若汉字有多个发音，且多个发音有不同含义，则此处details会有多个； |
| details_pronunce               | String    | 汉字读音信息                                                 |
| details_pronunce_symbol        | String    | 拼音                                                         |
| details_pronunce_url           | String    | 读音音频链接                                                 |
| details_spelling               | JSONArray | 汉字拼读信息                                                 |
| details_spelling_section       | JSONArray | 拼音分区，如[0,1]表示拼音的前两个字符                        |
| details_spelling_url           | String    | 分区后，各部分对应的发音url                                  |
| details_synonyms               | String    | 近义词                                                       |
| details_antonyms               | String    | 反义词                                                       |
| details_sample                 | String    | 例句                                                         |
| details_errorpronewords        | String    | 易错词                                                       |
| details_definition             | JSONArray | 汉字解释                                                     |
| details_definition_description | String    | 释义                                                         |
| details_definition_sample      | JSONArray | 示例                                                         |
| details_related                | JSONArray | 相关词                                                       |
| details_related_idiom          | JSONArray | 相关成语                                                     |
| details_related_Prefix         | JSONArray | 相关词语（词首）                                             |
| details_related_suffix         | JSONArray | 相关词语（词尾）                                             |
| strokes                        | JSONArray | 汉字笔画信息                                                 |
| strokes_gif                    | String    | 笔画gif图，供分辨率低屏幕展示（未上线）                      |
| strokes_strokescount           | String    | 笔画数                                                       |
| strokes_strokesorder           | JSONArray | 笔画名称                                                     |
| strokes_strokespath            | JSONArray | 每一笔画svg路径                                              |
| strokes_storkes_medians        | JSONArray | 笔画坐标列表，用于展示每一笔画的动画，参见：https://www.skishore.me/makemeahanzi/ |

### 中文词语返回示例

```json
{
    "content":"美丽",
    "type":"word",
    "details":[
        {
            "pronunce":[
                {
                    "symbol":[
                        "měi",
                        "lì"
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "definition":[
                {
                    "description":"喜欢，和“讨厌”相反。",
                    "sample":[
                        "漂亮的住宅"
                    ]
                }
            ],
            "synonyms":[
                "秀丽",
                "奇丽"
            ],
            "antonyms":[
                "难看",
                "丑陋"
            ]
        }
    ]
}
```

| 参数                           | 类型      | 说明                     |
| :----------------------------- | :-------- | :----------------------- |
| content                        | String    | 词语内容                 |
| type                           | String    | 中文词语固定值为【word】 |
| details                        | JSONArray | 词语详情                 |
| details_pronunce               | JSONArray | 词语发音信息             |
| details_pronunce_symbol        | String    | 词语拼音                 |
| details_pronunce_url           | String    | 词语发音url              |
| details_definition             | JSONArray | 词语解释                 |
| details_definition_description | String    | 词语释义                 |
| details_definition_sample      | String    | 词语例句                 |
| details_synonyms               | String    | 近义词                   |
| details_antonyms               | String    | 反义词                   |

#### 中文成语返回示例

```json
{
    "content":"愚公移山",
    "type":"idiom",
    "details":[
        {
            "pronunce":[
                {
                    "symbol":[
                        "yú",
                        "gōng",
                        "yí",
                        "shān"
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "definition":[
                {
                    "description":[
                        "比喻坚持不懈地改造自然和坚定不移地进行斗争。"
                    ]
                }
            ],
            "origin":"《列子·汤问》记载：愚公家门前有两大座山挡着路，他决...",
            "synonyms":[
                "锲而不舍",
                "持之以恒"
            ],
            "antonyms":[
                "虎头蛇尾",
                "有头无尾"
            ],
            "story":"传说古代有两座大山间住着一个90岁的愚公，他每次出门因大山阻隔，要绕很大的弯子......",
            "poem":[
                "太行、王屋二山，方七百里，高万仞，本在冀州之南，河阳之北。",
                "北山愚公者，年且九十，面山而居...",
                "河曲智叟笑而止之曰..."
            ]
        }
    ]
}
```

| 参数                           | 类型      | 说明                  |
| :----------------------------- | :-------- | :-------------------- |
| content                        | String    | 成语内容              |
| type                           | String    | 成语固定值为【idiom】 |
| details                        | JSONArray | 成语详情              |
| details_pronunce               | JSONArray | 成语发音信息          |
| details_pronunce_symbol        | String    | 成语拼音              |
| details_pronunce_url           | String    | 成语发音url           |
| details_definition             | JSONArray | 成语解释              |
| details_definition_description | String    | 成语释义              |
| details_origin                 | String    | 成语来源              |
| details_synonyms               | String    | 近义词                |
| details_antonyms               | String    | 反义词                |
| details_story                  | String    | 成语故事              |
| details_poem                   | JSONArray | 成语相关诗歌          |

### 中文诗词返回示例

```json
{
    "content": "静夜思",
    "details": [
        {
            "poem": [
                "床前明月光，疑是地上霜。",
                "举头望明月，低头思故乡。"
            ]
        }
    ],
    "type": "poem"
}
```


### 英文单词返回示例

```json
{
    "content":"eat",
    "type":"en_word",
    "details":[
        {
            "pronunce":[
                {
                    "symbol":[
                        "iːt"
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "us_pronounce": [
                {
                    "symbol": "iːt",
                    "url": "https://api.iflyos.cn/external/ocr/audio/f02e00e49881ea3b912b99cf48498baa"
                }
            ],
            "spelling":[
                {
                    "section":[
                        1,
                        2
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "definition":[
                {
                    "property":"v.",
                    "description":[
                        "吃；食",
                        "用餐"
                    ],
                    "tag":"动作动词"
                }
            ],
            "derivation":[
                {
                    "word":"eater",
                    "property":"n.",
                    "description":"食者"
                },
                {
                    "word":"eatable",
                    "property":"adj.",
                    "description":"可吃的"
                }
            ],
            "tenses":{
                "presentParticiple":"eating",
                "past":"ate",
                "pastParticiple":"eaten",
                "thirdPersonSingular":"eats"
            },
            "expressions":[
                {
                    "expression":"eat well",
                    "description":[
                        "健康首选；吃得营养；吃的好；胃口好"
                    ]
                },
                {
                    "expression":"eat well",
                    "description":[
                        "健康首选；吃得营养；吃的好；胃口好"
                    ]
                }
            ],
            "related":[
                {
                    "word":"drove",
                    "description":"驾驶、人群"
                },
                {
                    "word":"eater",
                    "description":"食者"
                }
            ],
            "picture":"http://oimagec5.ydstatic.com/image?id=8035347685817079127&amp;product=kid-dict "
        }
    ]
}
```

| 参数                               | 类型      | 说明                                  |
| :--------------------------------- | :-------- | :------------------------------------ |
| content                            | String    | 单词文本内容                          |
| type                               | String    | 英文单词类型固定为【en_word】         |
| details                            | JSONArray | 英文单词详情                          |
| details_pronunce                   | JSONArray | 发音信息                              |
| details_pronunce_symbol            | JSONArray | 音标                                  |
| details_pronunce_url               | String    | 单词发音url                           |
| details_us_pronunce                   | JSONArray | 美式发音信息                              |
| details_us_pronunce_symbol            | JSONArray | 美式音标                                  |
| details_us_pronunce_url               | String    | 单词美式发音url                           |
| details_spelling                   | JSONArray | 拼读信息                              |
| details_spelling_section           | String    | 音标分区，如[0,1]表示音标的前两个字符 |
| details_spelling_url               | String    | 分区后，各部分对应的发音url           |
| details_definition                 | JSONArray | 单词解释                              |
| details_definition_property        | String    | 词性                                  |
| details_definition_description     | String    | 释义                                  |
| details_definition_tag             | String    | 标签                                  |
| details_derivation                 | JSONArray | 派生词信息                            |
| details_derivation_word            | String    | 派生词内容                            |
| details_derivation_property        | String    | 派生词词性                            |
| details_derivation_description     | String    | 派生词释义                            |
| details_tenses                     | JSONArray | 时态                                  |
| details_tenses_presentParticiple   | String    | 现在分词                              |
| details_tenses_past                | String    | 过去时态                              |
| details_tenses_pastParticiple      | String    | 过去分词                              |
| details_tenses_thirdPersonSingular | String    | 第三人称单数                          |
| details_expressions                | JSONArray | 短语                                  |
| details_expressions_expression     | String    | 短语内容                              |
| details_expressions_description    | String    | 短语解释                              |
| details_related                    | JSONArray | 相关词汇                              |
| details_related_word               | String    | 相关词汇内容                          |
| details_related_description        | String    | 相关词汇描述                          |
| details_picture                    | String    | 单词主题图片                          |

## 口语练习

### 获取难度列表

##### 接口地址

```
GET https://api.iflyos.cn/external/ocr/evaluate/levels
```

##### 请求headers

```
Authorization: Bearer {token}
```

##### 返回示例

```json
{
    "levels": [
        {
            "level_id": "1",
            "title": "初级"
        },
        {
            "level_id": "2",
            "title": "中级"
        },
        {
            "level_id": "3",
            "title": "高级"
        }
    ]
}
```

| 参数     | 类型   | 说明                          |
| :------- | :----- | :---------------------------- |
| level_id | String | 难度ID                        |
| title    | String | 英文单词类型固定为【en_word】 |

### 获取随机题目

##### 接口地址

```
GET https://api.iflyos.cn/external/ocr/evaluate/get_question
```

##### 请求headers

```
Authorization: Bearer {token}
```

##### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| level_id | String | 难度ID | 是   |

##### 返回示例

```json
{
    "question": {
        "keyword": "Saturday.",
        "answers": [
            "Saturday.",
            "It is Saturday.",
            "It's Saturday today.",
            "It is Saturday today.",
            "It's Saturday.",
            "Today is Saturday."
        ],
        "audio_url": "https://etbox.oss-accelerate.aliyuncs.com/sourceaudio/se/102243ques1askaudio.wav",
        "id": 865,
        "text": "今天是星期六，现在是早上九点钟，你和妈妈一起在家打扫卫生。"
    }
}
```

| 参数      | 类型   | 说明               |
| :-------- | :----- | :----------------- |
| keyword   | String | 题目答案           |
| answers   | String | 题目答案           |
| audio_url | String | 题目音频url        |
| text      | String | 问题文本，可能为空 |

### 请求协议（新增）

请求协议复用EVS口语评测协议，完整的请求体可参考[线上文档](https://doc.iflyos.cn/device/upgrades/evaluate.html#%E8%AF%B7%E6%B1%82%E8%AF%B4%E6%98%8E)

#### 请求新增参数

| 参数              | 类型   | 说明                                          | 必填 |
| :---------------- | :----- | :-------------------------------------------- | :--- |
| evaluate.category | String | 评测题型，取值见下表。                        | 是   |
| evaluate.text     | String | 评测题目文本，写法样例[请点击](#试题text格式) | 是   |

`evaluate.category` 取值

| `category` 取值 | 含义     | 备注       | 内容支持                      |
| --------------- | -------- | ---------- | ----------------------------- |
| read_choice     | 口语练习 | 仅英文可用 | 一句话，英文建议100个字符以内 |

#### 返回说明

```json
{
    "read_choice":{
        "version":"7.0.0.1008",
        "type":"study",
        "rec_paper":{
            "free_choice":{
                "total_score":"0.000000",
                "except_info":"0",
                "end_pos":"998",
                "content":"1. A book. 2. They are going to buy a book for Mike. 3. They are going to buy Mike a book.",
                "beg_pos":"0"
            }
        },
        "lan":"en"
    }
}
```

| 参数        | 类型   | 说明                        |
| ----------- | ------ | --------------------------- |
| version     | String | 评测引擎版本                |
| type        | String | 评测类型，固定取值为`study` |
| total_score | Int    | 评测总分                    |
| content     | String | 参考回答                    |
| beg_pos     | String | 朗读开始时间                |
| end_pos     | String | 朗读结束时间                |

## 语速设置

**endpoint**

https://api.iflyos.cn

**headers**

```http
Content-Type: application/json
Authorization: Bearer {token}
```

token为设备token

### 获取设备语速配置

```
GET /external/ocr/device/voice_config
```

#### 响应示例

```json
{
    "english": "middle",
    "mandarin": "slow"
}
```

####  响应字段

| 参数名   | 说明                           |
| -------- | ------------------------------ |
| english  | 英语语速配置(slow,middle,fast) |
| mandarin | 中文语速配置(slow,middle,fast) |

### 更新设备语速配置

```
POST /external/ocr/device/update_voice_config
```

####  请求参数

| 参数名   | 说明                   | 必填 | 示例    |
| -------- | ---------------------- | ---- | ------- |
| language | 语种(english,mandarin) | 是   | english |
| speed    | 语速(slow,middle,fast) | 是   | fast    |

####  响应示例

```json
Status: 200 OK

{
    "message": "更新成功"
}
```

