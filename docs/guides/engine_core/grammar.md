---
id: engine_core_grammar
title: 快速熟悉常用语法
slug: /guides/EngineCore/grammar
---

> 本文介绍实现业务的常用语法

## 1.类型转换

### 1.1 数值转字符串

```ruby
num1 = 1
num2 = 1.5

str1 = num1.to_s
str2 = num2.to_s

EngineCore.logger.info(str1) # => "1"
EngineCore.logger.info(str2) # => "1.5"
```

### 1.2 字符串转数值

```ruby
str1 = "1"
str2 = "1.5"

num1 = str1.to_i
num2 = str2.to_i
num3 = str2.to_f

EngineCore.logger.info(num1) # => 1
EngineCore.logger.info(num2) # => 1
EngineCore.logger.info(num3) # => 1.5
```

## 2.字符串操作

### 2.1 字符串插值

```ruby
name = "john"
str = "my name is #{name}, hello"
EngineCore.logger.info(str) # => "my name is john, hello"
```

### 2.2 字符串拼接

```ruby
str1 = "this is"
str2 = " docs"
str = str1 + str2
EngineCore.logger.info(str) # => "this is docs"
```

## 3.数值运算

```ruby
1 + 1 # => 2
10 - 1 # => 9
2 * 3 # => 6
5 / 3 # => 1
5.0 / 3 # => 1.66667
5.to_f / 3 # => 1.66667
```

## 4.数组

```ruby
arr = [1, 2, 3]
first = arr.first
last = arr.last

EngineCore.logger.info(first) # => 1
EngineCore.logger.info(last) # => 3

arr << 4
EngineCore.logger.info(arr) # => [1, 2, 3, 4]
```

## 5.哈希

```ruby
hash_1 = { a: 1, b: 2 }
hash_2 = { "a" => 3, "b" => 4 }

val_1 = hash_1[:a]
val_2 = hash_2["a"]

EngineCore.logger.info(val_1) # => 1
EngineCore.logger.info(val_2) # => 3

hash_1[:c] = 10
val_3 = hash_1[:c]

EngineCore.logger.info(val_3) # => 10
```

## 6.流程控制

### 6.1 if..else

```ruby
a = 1
b = 2

if a == 2 || b != 2
  EngineCore.logger.info("若a等于2或b不等于2, 运行这里")
elsif a == 1 && b == 2
  EngineCore.logger.info("若a等于1且b等于1, 运行这里")
else
  EngineCore.logger.info("上述条件不满足, 运行这里")
end
```

### 6.2 unless

```ruby
a = 1

unless a == 2
  EngineCore.logger.info("若a不等于2")
else
  EngineCore.logger.info("上述条件不满足, 运行这里")
end
```

### 6.3 case..when

```ruby
a = 10

case a
when 1
  EngineCore.logger.info("当a等于1，运行这里")
when 2
  EngineCore.logger.info("当a等于2，运行这里")
else
  EngineCore.logger.info("上述条件不满足, 运行这里")
end
```

## 7.循环

### 7.1 指定范围循环

```ruby
sum1 = 0

(0..3).each do |i|
  sum1 += i
end

sum2

(2..4).each do |i|
  sum2 += i
end

EngineCore.logger.info(sum1) # => 6
EngineCore.logger.info(sum2) # => 9
```

### 7.2 数组循环

```ruby
sentence = ''

['this ', 'is ', 'doc'].each do |word|
  sentence += word
end

EngineCore.logger.info(sentence) # => "this is doc"
```