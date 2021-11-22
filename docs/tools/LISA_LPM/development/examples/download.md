---
title: 下载文件
sidebar_position: 1
---

## 方法

**fs.project.downloadFile(options)**

## 使用

```javascript

const {fs} = core // 从core中解构出fs

// ...

const downRes = await fs.project.downloadFile({
    url: '', // 下载的地址,
    fileName: '', // 保存的文件名,
    targetDir: '', // 下载到的路径,
    progress: (percentage, transferred, total) => {
        // task.output = `正在下载: ${percentage}% ${transferred}/${total}`
    }
})
```

### 返回

|     | 类型  | 描述  |
|  ----   | ----  | ---- |
| err  | number | 下载成功，值为0，其余均为失败 |
| msg  | string | 下载结果的描述 |
