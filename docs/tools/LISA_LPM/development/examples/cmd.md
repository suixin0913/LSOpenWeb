---
title: 子进程使用
sidebar_position: 2
---

## 1、cmd

### 方法

**cmd(file, arg, options)**

### 使用

**异步调用**

```javascript
const res = cmd('lisa', ['-v'])
res.stdout.pipe(process.stdout)
await res
```

### options

可查阅[api文档](https://www.npmjs.com/package/execa#options)查看。下面列举几个常用的参数

|     | 类型  | 描述  |
|  ----   | ----  | ---- |
| cwd  | string | 执行的路径 |
| env  | object | 环境变量 |
| encoding | string / null | 默认为utf8，若为null，则stdout为Buffer |
| timeout | number | 超时时间 |

## 2、exec

### 方法

**exec(file, arg, options, onProcess)**

### 使用

**同步调用**

```javascript
const code = await exec('lisa', ['-v'], {}, (line) => {
    console.log(line)
})
```

### 返回

返回该进程的exitCode

### options

与cmd的options一致