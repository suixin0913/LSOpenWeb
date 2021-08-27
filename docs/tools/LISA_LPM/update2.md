---
title: 升级：从1.0升级到2.0
---

LISA 已经发布了2.0版本，本文档主要指导使用者从 1.0 版本升级到 2.0 版本的操作。

### 检查当前版本

```shell
lisa -v
```

若显示为 1.x.x ，则当前环境的lisa版本为 1.0 （当前1.x.x的最新版本为 v1.4.9）

若显示为 2.x.x ，则当前环境的lisa版本为 2.0 （当前latest版本为 v2.x.x）

### 如何更新

可以参考[更新](./installation#%E6%9B%B4%E6%96%B0)文档，更新到latest版本即可。

### 非兼容变更

- 登录

    lisa v2.0 版本需要进行登录，当然登录会非常简易，只需要执行下登录命令即可，可查看[文档](./instance/login)。

- csk工程项目

    lisa v2.0 对于task的绑定优化，@generator/csk的引用存在非兼容的变更。

    当升级了lisa 到v2.0版本后，执行`lisa build`出现如下情况:

    ![](./files/update/1.png)

    解决办法：
    
    1、打开项目中的package.json, 找到 @generator/csk ，并修改为 "@generator/csk": "^2", 修改后保存。

    2、删除项目中的yarn.lock，然后执行 `lisa install`。

    3、执行 `lisa build` 即可。