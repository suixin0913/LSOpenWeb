---
id: air_condition_algo
title: 音频传输
slug: /air_condition_algo
---

面向空调品类的AI模型，仅支持CSK4002芯片使用。



## 能力介绍

1. 用户唤醒时，可判断用户的唤醒方位：3方向可选。
2. 面向常见家居场景、空调运行风噪 进行AI模型针对性优化。
3. 设备播音（提示音或音乐等）时用户可语音打断。
4. 空调行业深定制命令词（176词）



## 设备场景介绍

1. 空调一般在家居客厅、卧室场景使用，环境中会有人交流、电视、音乐、家居活动等产生的噪声。
2. 大部分空调在线下卖场成交，作为新型功能，销售人员一般会为用户演示语音功能。
3. 空调运行过程中存在风噪，不同模式、不同风挡设备运行的噪声不同。

基于以上场景，聆思空调品类AI模型针对家居环境、空调运行和卖场均进行了针对性的优化。



## 场景支持情况

- √ 代表识别率90%以上，主观体验良好。

- ○ 代表识别率85%以上，主观体验可用。

- ×代表识别率85%以下，主观体验不可用。

| 环境情况 | 设备运行情况 | 交互距离 | 人声音量<br/>（麦克风出处测量） | 信噪比 | 双麦支持 | 单麦支持 |
| -------- | ------------ | -------- | ------------------------------ | ------ | -------- | -------- |
| 家居安静 | 不运行       | 1m       | 60db                           | 20db   | √        | √        |
| 家居安静 | 不运行       | 3m       | 60db                           | 20db   | √        | √        |
| 家居安静 | 不运行       | 5m       | 60db                           | 20db   | √        | √        |
| 家居常噪 | 不运行       | 1m       | 60db                           | 10db   | √        | √        |
| 家居常噪 | 不运行       | 3m       | 60db                           | 10db   | √        | √        |
| 家居常噪 | 不运行       | 5m       | 60db                           | 10db   | √        | ○        |
| 家居高噪 | 不运行       | 1m       | 60db                           | 5db    | √        | ○        |
| 家居高噪 | 不运行       | 3m       | 60db                           | 5db    | √        | ○        |
| 家居高噪 | 不运行       | 5m       | 60db                           | 5db    | ○        | ○        |
| 家居高噪 | 不运行       | 1m       | 60db                           | 0db    | ○        | ○        |
| 家居高噪 | 不运行       | 3m       | 60db                           | 0db    | ○        | ×        |
| 家居高噪 | 不运行       | 5m       | 60db                           | 0db    | ×        | ×        |
| 家居安静 | 最低风挡运行 | 1m       | 60db                           | 20db   | √        | √        |
| 家居安静 | 最低风挡运行 | 3m       | 60db                           | 20db   | √        | √        |
| 家居安静 | 最低风挡运行 | 5m       | 60db                           | 20db   | √        | √        |
| 家居常噪 | 最低风挡运行 | 1m       | 60db                           | 10db   | √        | √        |
| 家居常噪 | 最低风挡运行 | 3m       | 60db                           | 10db   | √        | ○        |
| 家居常噪 | 最低风挡运行 | 5m       | 60db                           | 10db   | √        | ○        |
| 家居高噪 | 最低风挡运行 | 1m       | 60db                           | 5db    | √        | ○        |
| 家居高噪 | 最低风挡运行 | 3m       | 60db                           | 5db    | ○        | ○        |
| 家居高噪 | 最低风挡运行 | 5m       | 60db                           | 5db    | ○        | ○        |
| 家居高噪 | 最低风挡运行 | 1m       | 60db                           | 0db    | ○        | ○        |
| 家居高噪 | 最低风挡运行 | 3m       | 60db                           | 0db    | ○        | ×        |
| 家居高噪 | 最低风挡运行 | 5m       | 60db                           | 0db    | ×        | ×        |
| 家居安静 | 中间风挡运行 | 1m       | 60db                           | 20db   | √        | √        |
| 家居安静 | 中间风挡运行 | 3m       | 60db                           | 20db   | √        | √        |
| 家居安静 | 中间风挡运行 | 5m       | 60db                           | 20db   | √        | √        |
| 家居常噪 | 中间风挡运行 | 1m       | 60db                           | 10db   | √        | √        |
| 家居常噪 | 中间风挡运行 | 3m       | 60db                           | 10db   | √        | ○        |
| 家居常噪 | 中间风挡运行 | 5m       | 60db                           | 10db   | √        | ○        |
| 家居高噪 | 中间风挡运行 | 1m       | 60db                           | 5db    | ○        | ○        |
| 家居高噪 | 中间风挡运行 | 3m       | 60db                           | 5db    | ○        | ○        |
| 家居高噪 | 中间风挡运行 | 5m       | 60db                           | 5db    | ○        | ○        |
| 家居高噪 | 中间风挡运行 | 1m       | 60db                           | 0db    | ○        | ×        |
| 家居高噪 | 中间风挡运行 | 3m       | 60db                           | 0db    | ×        | ×        |
| 家居高噪 | 中间风挡运行 | 5m       | 60db                           | 0db    | ×        | ×        |
| 家居安静 | 最高风挡运行 | 1m       | 60db                           | 20db   | √        | √        |
| 家居安静 | 最高风挡运行 | 3m       | 60db                           | 20db   | √        | √        |
| 家居安静 | 最高风挡运行 | 5m       | 60db                           | 20db   | √        | √        |
| 家居常噪 | 最高风挡运行 | 1m       | 60db                           | 10db   | √        | ○        |
| 家居常噪 | 最高风挡运行 | 3m       | 60db                           | 10db   | √        | ○        |
| 家居常噪 | 最高风挡运行 | 5m       | 60db                           | 10db   | ○        | ○        |
| 家居高噪 | 最高风挡运行 | 1m       | 60db                           | 5db    | ○        | ○        |
| 家居高噪 | 最高风挡运行 | 3m       | 60db                           | 5db    | ○        | ○        |
| 家居高噪 | 最高风挡运行 | 5m       | 60db                           | 5db    | ○        | ○        |
| 家居高噪 | 最高风挡运行 | 1m       | 60db                           | 0db    | ×        | ×        |
| 家居高噪 | 最高风挡运行 | 3m       | 60db                           | 0db    | ×        | ×        |
| 家居高噪 | 最高风挡运行 | 5m       | 60db                           | 0db    | ×        | ×        |
| 卖场常噪 | 不运行       | 1m       | 70dB                           | 5dB    | √        | ×        |
| 卖场常噪 | 不运行       | 3m       | 70dB                           | 5dB    | ○        | ×        |
| 卖场常噪 | 最低风挡运行 | 1m       | 70dB                           | 5dB    | √        | ×        |
| 卖场常噪 | 最低风挡运行 | 3m       | 70dB                           | 5dB    | ×        | ×        |
| 卖场常噪 | 中间风挡运行 | 1m       | 70dB                           | 5dB    | √        | ×        |
| 卖场常噪 | 中间风挡运行 | 3m       | 70dB                           | 5dB    | ×        | ×        |
| 卖场常噪 | 最高风挡运行 | 1m       | 70dB                           | 5dB    | √        | ×        |
| 卖场常噪 | 最高风挡运行 | 3m       | 70dB                           | 5dB    | ×        | ×        |

## 深定制词表

由于以下词条均使用十万级音频训练，综合效果在95%以上，为了保证实际体验效果，建议尽量在以下词表中选词。

<table>
<thead>
  <tr>
    <th width="100">功能</th>
    <th width="100">分组</th>
    <th>词条</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>唤醒</td>
    <td></td>
    <td>你好哈利</td>
  </tr>
  <tr>
    <td rowspan="8">开关机</td>
    <td rowspan="2">组1</td>
    <td>打开空调</td>
  </tr>
  <tr>
    <td>关闭空调</td>
  </tr>
  <tr>
    <td rowspan="2">组2</td>
    <td>开机</td>
  </tr>
  <tr>
    <td>关机</td>
  </tr>
  <tr>
    <td rowspan="2">组3</td>
    <td>开启空调</td>
  </tr>
  <tr>
    <td>关掉空调</td>
  </tr>
  <tr>
    <td rowspan="2">组4</td>
    <td>空调开机</td>
  </tr>
  <tr>
    <td>空调关机</td>
  </tr>
  <tr>
    <td rowspan="21">温度</td>
    <td rowspan="15">组0</td>
    <td>十六度</td>
  </tr>
  <tr>
    <td>十七度</td>
  </tr>
  <tr>
    <td>十八度</td>
  </tr>
  <tr>
    <td>十九度</td>
  </tr>
  <tr>
    <td>二十度</td>
  </tr>
  <tr>
    <td>二十一度</td>
  </tr>
  <tr>
    <td>二十二度</td>
  </tr>
  <tr>
    <td>二十三度</td>
  </tr>
  <tr>
    <td>二十四度</td>
  </tr>
  <tr>
    <td>二十五度</td>
  </tr>
  <tr>
    <td>二十六度</td>
  </tr>
  <tr>
    <td>二十七度</td>
  </tr>
  <tr>
    <td>二十八度</td>
  </tr>
  <tr>
    <td>二十九度</td>
  </tr>
  <tr>
    <td>三十度</td>
  </tr>
  <tr>
    <td rowspan="2">组1</td>
    <td>太冷了</td>
  </tr>
  <tr>
    <td>太热了</td>
  </tr>
  <tr>
    <td rowspan="2">组2</td>
    <td>调低一度</td>
  </tr>
  <tr>
    <td>调高一度</td>
  </tr>
  <tr>
    <td rowspan="2">组3</td>
    <td>有点冷</td>
  </tr>
  <tr>
    <td>有点热</td>
  </tr>
  <tr>
    <td rowspan="11">模式</td>
    <td rowspan="5">组1</td>
    <td>打开送风</td>
  </tr>
  <tr>
    <td>打开制冷</td>
  </tr>
  <tr>
    <td>打开制热</td>
  </tr>
  <tr>
    <td>打开抽湿</td>
  </tr>
  <tr>
    <td>打开除湿</td>
  </tr>
  <tr>
    <td rowspan="6">组2</td>
    <td>抽湿模式</td>
  </tr>
  <tr>
    <td>除湿模式</td>
  </tr>
  <tr>
    <td>送风模式</td>
  </tr>
  <tr>
    <td>制冷模式</td>
  </tr>
  <tr>
    <td>制热模式</td>
  </tr>
  <tr>
    <td>自动模式</td>
  </tr>
  <tr>
    <td rowspan="20">摆风</td>
    <td rowspan="5">组1</td>
    <td>风往上吹</td>
  </tr>
  <tr>
    <td>风往下吹</td>
  </tr>
  <tr>
    <td>风往右吹</td>
  </tr>
  <tr>
    <td>风往中间吹</td>
  </tr>
  <tr>
    <td>风往左吹</td>
  </tr>
  <tr>
    <td rowspan="5">组2</td>
    <td>风向上吹</td>
  </tr>
  <tr>
    <td>风向下吹</td>
  </tr>
  <tr>
    <td>风向右吹</td>
  </tr>
  <tr>
    <td>风向中间吹</td>
  </tr>
  <tr>
    <td>风向左吹</td>
  </tr>
  <tr>
    <td rowspan="4">组3</td>
    <td>上下摆风</td>
  </tr>
  <tr>
    <td>上下风</td>
  </tr>
  <tr>
    <td>左右摆风</td>
  </tr>
  <tr>
    <td>左右风</td>
  </tr>
  <tr>
    <td rowspan="3">组4</td>
    <td>关闭摆风</td>
  </tr>
  <tr>
    <td>关闭上下摆风</td>
  </tr>
  <tr>
    <td>关闭左右摆风</td>
  </tr>
  <tr>
    <td rowspan="3">组5</td>
    <td>停止摆风</td>
  </tr>
  <tr>
    <td>关掉上下摆风</td>
  </tr>
  <tr>
    <td>关掉左右摆风</td>
  </tr>
  <tr>
    <td rowspan="6">风速</td>
    <td rowspan="2">组1</td>
    <td>风速大点</td>
  </tr>
  <tr>
    <td>风速小点</td>
  </tr>
  <tr>
    <td rowspan="2">组2</td>
    <td>增大风速</td>
  </tr>
  <tr>
    <td>减小风速</td>
  </tr>
  <tr>
    <td rowspan="2">组3</td>
    <td>调大风速</td>
  </tr>
  <tr>
    <td>调小风速</td>
  </tr>
  <tr>
    <td rowspan="3">均匀风</td>
    <td rowspan="3">组1</td>
    <td>均匀风</td>
  </tr>
  <tr>
    <td>关闭均匀风</td>
  </tr>
  <tr>
    <td>关掉均匀风</td>
  </tr>
  <tr>
    <td rowspan="3">远距风</td>
    <td rowspan="3">组1</td>
    <td>远距风</td>
  </tr>
  <tr>
    <td>关闭远距风</td>
  </tr>
  <tr>
    <td>关掉远距风</td>
  </tr>
  <tr>
    <td rowspan="4">风模式</td>
    <td rowspan="4">组1</td>
    <td>中等风</td>
  </tr>
  <tr>
    <td>自动风</td>
  </tr>
  <tr>
    <td>最大风</td>
  </tr>
  <tr>
    <td>最小风</td>
  </tr>
  <tr>
    <td rowspan="19">定时</td>
    <td rowspan="9">组1</td>
    <td>一小时后关机</td>
  </tr>
  <tr>
    <td>二小时后关机</td>
  </tr>
  <tr>
    <td>两小时后关机</td>
  </tr>
  <tr>
    <td>三小时后关机</td>
  </tr>
  <tr>
    <td>四小时后关机</td>
  </tr>
  <tr>
    <td>五小时后关机</td>
  </tr>
  <tr>
    <td>六小时后关机</td>
  </tr>
  <tr>
    <td>七小时后关机</td>
  </tr>
  <tr>
    <td>八小时后关机</td>
  </tr>
  <tr>
    <td rowspan="9">组2</td>
    <td>一小时后开机</td>
  </tr>
  <tr>
    <td>二小时后开机</td>
  </tr>
  <tr>
    <td>两小时后开机</td>
  </tr>
  <tr>
    <td>三小时后开机</td>
  </tr>
  <tr>
    <td>四小时后开机</td>
  </tr>
  <tr>
    <td>五小时后开机</td>
  </tr>
  <tr>
    <td>六小时后开机</td>
  </tr>
  <tr>
    <td>七小时后开机</td>
  </tr>
  <tr>
    <td>八小时后开机</td>
  </tr>
  <tr>
    <td>组0</td>
    <td>取消定时</td>
  </tr>
  <tr>
    <td rowspan="4">电辅热</td>
    <td rowspan="2">组1</td>
    <td>电辅热</td>
  </tr>
  <tr>
    <td>关掉电辅热</td>
  </tr>
  <tr>
    <td rowspan="2">组2</td>
    <td>打开电辅热</td>
  </tr>
  <tr>
    <td>关闭电辅热</td>
  </tr>
  <tr>
    <td rowspan="5">屏显</td>
    <td rowspan="3">组1</td>
    <td>打开屏显</td>
  </tr>
  <tr>
    <td>关闭屏显</td>
  </tr>
  <tr>
    <td>关掉屏显</td>
  </tr>
  <tr>
    <td rowspan="2">组2</td>
    <td>打开显示</td>
  </tr>
  <tr>
    <td>关闭显示</td>
  </tr>
  <tr>
    <td rowspan="3">单风口</td>
    <td rowspan="3">组1</td>
    <td>单风口</td>
  </tr>
  <tr>
    <td>关闭单风口</td>
  </tr>
  <tr>
    <td>关掉单风口</td>
  </tr>
  <tr>
    <td rowspan="4">智清洁</td>
    <td rowspan="2">组1</td>
    <td>智清洁</td>
  </tr>
  <tr>
    <td>关掉智清洁</td>
  </tr>
  <tr>
    <td rowspan="2">组2</td>
    <td>打开智清洁</td>
  </tr>
  <tr>
    <td>关闭智清洁</td>
  </tr>
  <tr>
    <td rowspan="5">除菌</td>
    <td rowspan="2">组1</td>
    <td>打开除菌</td>
  </tr>
  <tr>
    <td>关闭除菌</td>
  </tr>
  <tr>
    <td rowspan="3">组2</td>
    <td>打开杀菌</td>
  </tr>
  <tr>
    <td>关闭杀菌</td>
  </tr>
  <tr>
    <td>关掉杀菌</td>
  </tr>
  <tr>
    <td rowspan="27">无风感</td>
    <td rowspan="3">组0</td>
    <td>无风感</td>
  </tr>
  <tr>
    <td>关闭无风感</td>
  </tr>
  <tr>
    <td>关掉无风感</td>
  </tr>
  <tr>
    <td rowspan="12">组1</td>
    <td>一挡无风感</td>
  </tr>
  <tr>
    <td>二档无风感</td>
  </tr>
  <tr>
    <td>三挡无风感</td>
  </tr>
  <tr>
    <td>四挡无风感</td>
  </tr>
  <tr>
    <td>五挡无风感</td>
  </tr>
  <tr>
    <td>六挡无风感</td>
  </tr>
  <tr>
    <td>七挡无风感</td>
  </tr>
  <tr>
    <td>八挡无风感</td>
  </tr>
  <tr>
    <td>九挡无风感</td>
  </tr>
  <tr>
    <td>十挡无风感</td>
  </tr>
  <tr>
    <td>增大无风感</td>
  </tr>
  <tr>
    <td>减小无风感</td>
  </tr>
  <tr>
    <td rowspan="12">组2</td>
    <td>无风感一挡</td>
  </tr>
  <tr>
    <td>无风感二挡</td>
  </tr>
  <tr>
    <td>无风感三挡</td>
  </tr>
  <tr>
    <td>无风感十挡</td>
  </tr>
  <tr>
    <td>无风感四挡</td>
  </tr>
  <tr>
    <td>无风感五挡</td>
  </tr>
  <tr>
    <td>无风感六挡</td>
  </tr>
  <tr>
    <td>无风感七挡</td>
  </tr>
  <tr>
    <td>无风感八挡</td>
  </tr>
  <tr>
    <td>无风感九挡</td>
  </tr>
  <tr>
    <td>无风感大点</td>
  </tr>
  <tr>
    <td>无风感小点</td>
  </tr>
  <tr>
    <td rowspan="23">新风</td>
    <td rowspan="3">组0</td>
    <td>打开新风</td>
  </tr>
  <tr>
    <td>关闭新风</td>
  </tr>
  <tr>
    <td>关掉新风</td>
  </tr>
  <tr>
    <td rowspan="11">组1</td>
    <td>一挡新风</td>
  </tr>
  <tr>
    <td>二挡新风</td>
  </tr>
  <tr>
    <td>三挡新风</td>
  </tr>
  <tr>
    <td>四挡新风</td>
  </tr>
  <tr>
    <td>增大新风</td>
  </tr>
  <tr>
    <td>减小新风</td>
  </tr>
  <tr>
    <td>调大新风</td>
  </tr>
  <tr>
    <td>调小新风</td>
  </tr>
  <tr>
    <td>最大新风</td>
  </tr>
  <tr>
    <td>最小新风</td>
  </tr>
  <tr>
    <td>强劲新风</td>
  </tr>
  <tr>
    <td rowspan="9">组2</td>
    <td>新风一挡</td>
  </tr>
  <tr>
    <td>新风二挡</td>
  </tr>
  <tr>
    <td>新风三挡</td>
  </tr>
  <tr>
    <td>新风四挡</td>
  </tr>
  <tr>
    <td>新风大点</td>
  </tr>
  <tr>
    <td>新风小点</td>
  </tr>
  <tr>
    <td>新风强劲</td>
  </tr>
  <tr>
    <td>新风最大</td>
  </tr>
  <tr>
    <td>新风最小</td>
  </tr>
  <tr>
    <td rowspan="8">音量</td>
    <td rowspan="2">组0</td>
    <td>最大音量</td>
  </tr>
  <tr>
    <td>最小音量</td>
  </tr>
  <tr>
    <td rowspan="2">组1</td>
    <td>增大音量</td>
  </tr>
  <tr>
    <td>减小音量</td>
  </tr>
  <tr>
    <td rowspan="2">组2</td>
    <td>调大音量</td>
  </tr>
  <tr>
    <td>调小音量</td>
  </tr>
  <tr>
    <td rowspan="2">组3</td>
    <td>调高音量</td>
  </tr>
  <tr>
    <td>调低音量</td>
  </tr>
</tbody>
</table>

## 使用

```sh-session
$ lisa install @algo/air_condition
```

