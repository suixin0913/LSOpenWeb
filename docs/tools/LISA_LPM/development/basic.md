---
title: 基础
sidebar_position: 1
---

### lpm包是什么

lpm包实际上就是npm的软件包，它包含了npm软件包的一切特性，因此每个lpm包，都通过**pakcage.json**来描述项目和软件包信息。

### lisa体系下的lpm包基本结构

下列lpm包的目录结构，由 lisa create xxx -t @generator/lpm-pkg 进行创建。

```
.
├── lib
│   ├── config.d.ts
│   ├── config.js
│   ├── index.d.ts
│   ├── index.js
│   ├── task.d.ts
│   └── task.js
├── src
│   ├── config.ts
│   ├── index.ts
│   └── task.ts
├── .gitignore
├── jest.config.js
├── package.json
├── readme.md
└── tsconfig.json
```

:::info

并非所有lisa体系下的lpm包结构都如此，阅读本篇后，你也能根据自己喜好设计出具有lisa能力的lpm包。

:::

## 核心

### package.json

```json
    {
        "name": "@tool/xxx", // lpm包名
        "version": "2.0.1", // lpm包版本号
        "description": "xxx", // lpm包描述
        "lisa": {
            "configPath": "./lib/config.js",
            "taskPath": "./lib/task.js"
        },
        "files": [  // 该包发布时，上传的文件/文件夹
            "lib"
        ],
        "keywords": [], // 关键字
        "dependencies": { // lpm包所需要的依赖包
    		"@listenai/lisa_core": "^2"
        }
    }

```

包含注释的，都是package.json的基本通用字段，具体还有什么用法，可以通过该[网站](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)查看。

未包含注释部分，为定义该lpm包为lisa体系的核心。

#### configPath

该字段的值为一份js文件的相对路径，实例中指向的是**./lib/config.js**

config.js里面描述的是当前lpm包的配置信息，更多详细内容可查看[config文件](./config_file)文档。


#### taskPath

该字段的值为一份js文件的相对路径，实例中指向的是**./lib/task.js**

task.js里面描述的是当前lpm包的task信息，更多详细内容可查看[task文件](https://docs.npmj)文档。


:::info

configPath和taskPath都是**非必要**的，该lpm包可以无config配置和task信息。

:::

- 由于实例中用了typescript作为开发语言，所以需要编译出js文件，如目录结构看出，lib文件夹存放的，都是src目录文件编译后的结果，供最终lpm包使用。

了解到这一核心后，最简单的一个lpm包结构可为:

```
.
├── src
│   ├── config.js
│   └── task.js
├── .gitignore
├── package.json
└── readme.md
```

```json
package.json:
    {
        ...,
        "lisa": {
            "configPath": "./src/config.js",
            "taskPath": "./src/task.js"
        },
        ...
    }

```