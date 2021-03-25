---
id: lisa_tutorial
title: 开发者教程：从零开发一个lisa包
slug: /lisa_tutorial
---

<p style={{color: "#6d6d6d", fontSize: "24px"}}>阅读该教程不需要你预先掌握任何 lisa 知识。</p>

## 课前准备

我们将会在这个教程中开发一个小工具包。你将在该教程中学到如何使用lisa去创建并开发实现一个lpm包，以及使用者如何使用该lpm包。掌握这些知识后，你将会对 lisa 有更加深刻的理解。

:::info

这篇教程适用于更喜欢边学边做的开发者，如果你更喜欢从头开始学习一些概念，请参考lisa相关的api文档。

:::

这篇教程分为以下几个部分：
- 环境准备

### 我们会做出什么东西？

背景：lisa框架内置了能够跨平台的固件烧录命令，可烧录的固件类型是.lpk。但非lisa创建的csk项目，打包出来的固件并不能被lisa进行烧录。
<br/>
接下来，我们一起用lisa来开发一个工具包，用于帮助非lisa创建的csk项目，打包出.lpk类型的固件包，以此能够使用lisa的烧录。

## 环境准备

完成这篇教程有两种方式：可以直接在LStudio中开发，也可以在你电脑上搭建lisa的开发环境。

### 方式一：在LStudio中进行开发<span style={{color: "var(--ifm-color-info)"}}>（推荐）</span>

这是上手最快的一种方式了！LStudio内置了所有所需要的环境以及开发工具。我们也强烈推荐你直接使用LStudio来进行开发。

如果你选择这种方式，就可以跳过方式二，直接阅读教程啦。

### 方式二：搭建本地开发环境

如果你因为其他原因无法安装LStudio，你可以按照下列步骤进行搭建本地开发环境：

1、确保你安装了较新版本的Node.js。

2、全局安装yarn。

```shell
npm install yarn -g
```

3、全局安装lisa。

```shell
npm install @listenai/lisa -g
```

4、配置LISA_ACCESS_TOKEN环境变量。

<ShowToken></ShowToken>

export const ShowToken = ({children, color}) => {
  
  function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
  }
  const token = getCookie('token')
  return (
    <span>
      你的LISA_ACCESS_TOKEN为：{token}
    </span>
  )
};

<br/>
<br/>

现在，运行下lisa的命令看看吧～

```shell
lisa -v
```