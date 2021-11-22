---
title: config文件
sidebar_position: 2
---

## 介绍

### config文件的用处

目前比较常见的用法是:
- 从入参中解构出**application**，进行新增额外的**config**配置。
- 也可以对**application**中的字段，进行初始化赋值。
- 或其他额外的设置。

我们从一份相对简单的config.js代码进行分析：(上述的第一点用法)

```javascript
const path = require('path')

module.exports = (core) => {
    const {application} = core
    application.configuration(config => {
        config.addContext('xxx', {
            srcRoot: path.join(application.root, 'src'),
        })
    })
}
```

### 基础架子

config.js 有固定的格式，需要**export**一个**fucntion**，入参为**core**。

入参的**core**，可理解为 **lisa-core**，实际上它也是**lisa-core**的引入。

```javascript
module.exports = (core) => {
    // ...
}
```

### 解构application

是**config.js**的核心，基本所有**config.js**都使用该代码架，介绍中的用法也基本需要写该代码架。

```javascript
    const {application} = core // 从参数core中解构出application
    application.configuration(config => {
        // ...
    })
```

**application.configuration**是application的一个function，其用处是在一个入参为**config**的function中，对**config**进行介绍中的用法使用。

## 使用

### 新增本包配置

使用**config.addContext**方法，该方法入参为:

|  参数   | 类型  | 描述  |
|  ----   | ----  | ---- |
| 参数一  | string | 要存的config配置的key，通常为本包自己定义的名 |
| 参数二  | object | 要存的key对应的value，类型是一个对象，该对象内可存多个自定义配置 |

```javascript
config.addContext('xxx', {
    srcRoot: path.join(application.root, 'src'),
})
```

如例子中，定义了key为**xxx**，对应的object包含了**srcRoot**配置。

**application.root**的默认值为当前执行的cli的目录。

#### 解惑

在本篇中，出现了**path**的使用

```javascript
const path = require('path')
// ...
    srcRoot: path.join(application.root, 'src'),
// ...
```

**path**为node的一个默认api，可直接require引用。如例子中，**path.join**方法为，将参数中的值，拼接返回一个字符串路径。