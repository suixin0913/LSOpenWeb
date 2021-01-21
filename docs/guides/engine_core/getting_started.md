---
id: engine_core_getting_started
title: 快速实现业务逻辑
slug: /guides/EngineCore/getting_started
---

> 本文介绍如何通过EngineCore快速实现业务逻辑

## 1.如何开始

目录下打开`/intent.rb`文件，所有业务逻辑都在该文件中实现

## 2.命令词逻辑

### 2.1 指定命令词逻辑

EngineCore支持通过`on_intent`定义每个命令词的处理逻辑：

```ruby
on_intent "打开空调" do
  EngineCore.logger.info "命中命令词: 打开空调"
  UART.transmit("打开空调")
end

on_intent "关闭空调" do
  EngineCore.logger.info "命中命令词: 关闭空调"
  UART.transmit("关闭空调")
end
```

上面的代码分别定义了"打开空调"和"关闭空调"要执行的逻辑。通过EngineCore打印日记，并发送uart数据

### 2.2 默认的命令词逻辑

假如你想对未定义的命令词逻辑做统一处理，可以通过`default_intent`执行一个兜底的逻辑

```ruby
default_intent do |keyword|
  EngineCore.logger.info "未处理的命令词: #{keyword}"
end
```

上面的代码对所有未定义的命令词逻辑进行了一个打印日志的操作，打印出该命令词

## 3.uart数据处理

通过on_uart定义**每次**接收到uart数据的处理逻辑。

```ruby
on_uart do |data|
  # uart传入数据通过data访问
  EngineCore.logger.info "接收到消息: #{data}"
  case data
  when '1'
    UART.transmit("打开空调")
  when '2'
    UART.transmit("关闭空调")
  end
end
```

上面的代码对收到信息进行判断，执行不同的业务逻辑

## 4.整合一下

将上面实现的逻辑整合到`intents.rb`中，就实现了较简单的业务逻辑

```ruby
on_intent "打开空调" do
  EngineCore.logger.info "命中命令词: 打开空调"
  UART.transmit("打开空调")
end

on_intent "关闭空调" do
  EngineCore.logger.info "命中命令词: 关闭空调"
  UART.transmit("关闭空调")
end

default_intent do |keyword|
  EngineCore.logger.info "未处理的命令词: #{keyword}"
end

on_uart do |data|
  EngineCore.logger.info "接收到消息: #{data}"
  case data
  when '1'
    UART.transmit("打开空调")
  when '2'
    UART.transmit("关闭空调")
  end
end
```

至此就是EngineCore的基础使用方式。

## 5.进一步使用

> 本章节假定你对ruby语法有初步了解

### 5.1 存储

EngineCore提供了键值对存储的工具，可以在设备当次运行过程里持久存储，参考[API文档](/csksdk/csk4002/mruby/EngineStorage.html)。使用示例如下:

```ruby
EngineCore.storage.set("counter", 1)
EngineCore.storage.get("counter") # => 1

EngineCore.storage.set("temp", "my_value")
EngineCore.storage.get("temp") # => "my_value"

EngineCore.storage.clear("temp")
EngineCore.storage.get("temp") # => nil
```

如下示例通过EngineCore实现一个计数功能。示例如下:

```ruby
on_intent "打开空调" do
  count = EngineCore.storage.get("counter") || 1
  EngineCore.logger.info "命中命令词: 打开空调 #{count}次"
  EngineCore.storage.set("counter", count + 1)
  UART.transmit("打开空调")
end
```

### 5.2 自定义数据解析

你除了可以使用最基础的`on_uart`处理解析和业务逻辑，EngineCore还提供了`on_uart_parsed`帮你将协议解析和业务逻辑进行分离，参考[API文档](http://localhost:3102/csksdk/csk4002/mruby/Object.html#method-i-on_uart_parsed)，如下为intents文件示例：

```ruby
# 首先定义自己的解析类
class MyUartParser < ParserCore
  def name
    'my_uart'
  end

  # 每次收到数据的处理逻辑，包解析成功时返回数据触发业务，否则返回nil
  def receive(rec_content)
    if rec_content.start_with('**')
      rec_content
    else
      nil
    end
  end
end

# 然后配置自己的parser
EngineCore.config do |core|
  core.uart = MyUartParser.new
end

# 实现业务逻辑
on_uart_parsed do |data|
  EngineCore.logger.info "接收消息: #{data}"
  UART.transmit("打开空调")
end
```

### 5.3 替换自己的组件

可以替换EngineCore的组件，实现自己的逻辑，在intents.rb文件开头进行配置，参考[API文档](http://localhost:3102/csksdk/csk4002/mruby/EngineCore.html)，例如：

```ruby
class MyLogger
  def info(data)
    log("自定义的log: #{data}")
  end

  def log
    # 实现你的log逻辑
  end
end

EngineCore.config do |core|
  core.logger = MyLogger.new
end
```

通过EngineCore.logger调用，只要支持了原本logger的方法，业务逻辑不需要修改

```ruby
EngineCore.logger.info "my log"
```