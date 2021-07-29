---
title: 基于LSCloud的包管理使用指南
---

## 使用前准备

我们将会在这个文档中创建一个基于LSCloud的lisa包，并创建一个项目，对该包进行依赖使用。


## 环境准备

### 方式一：在LStudio中进行使用（推荐）

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

import BrowserOnly from '@docusaurus/BrowserOnly';

export const ShowToken = ({children, color}) => {
  
  return (
    <BrowserOnly
      fallback={<div>The fallback content to display on prerendering</div>}>
      {() => {
        // Something that should be excluded during build process prerendering.
        function getCookie(cname){
          var name = cname + "=";
          var ca = window.document.cookie.split(';');
          for(var i=0; i<ca.length; i++) 
          {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
          }
          return "";
        }
        const token = getCookie('token')
        return (
          <span>你的LISA_ACCESS_TOKEN为：{token}</span>
        )
      }}
    </BrowserOnly>
  )
};

<br/>
<br/>

5、安装git环境。

## 创建一个基于LSCloud的lisa包

1、使用lisa创建一个包，可移步到[`开发者新手教程：从零开发一个lisa包`](https://open.listenai.com/lisa_tutorial)

2、在LSCLoud创建一个项目。该项目请确保在正确的组下。（本指南为方便演示，会在个人组进行创建）

(1)在LSCloud的右上角，点击新建项目
![](./files/cloud_pkg/1.png)

(2)输入你的项目名称，选择该包所在的组，以及可见性级别选择私有。
![](./files/cloud_pkg/2.png)

3、上传发布你的lisa包到LScloud。

(1)在终端，按LSCloud的提示，进行推送：

![](./files/cloud_pkg/3.png)

![](./files/cloud_pkg/4.png)

如果上面的命令你都能顺利通过，此时在LSCloud的项目便已经初始化好你的lisa包。

![](./files/cloud_pkg/5.png)

4、发布一个版本。

(1)在LSCloud刚推上去的项目，点击发布

![](./files/cloud_pkg/6.png)

(2)输入版本号，这里需要填写满足semver规范的，方便我们进行版本管理

![](./files/cloud_pkg/7.png)

(3)点击发布后，能成功看到一条该版本的发布在列表里

![](./files/cloud_pkg/8.png)

## 创建一个lisa项目，并使用LSCloud上的lisa包作为依赖。

1、创建一个文件夹，并进行lisa init初始化。

2、在终端执行lisa install xxx安装LSCloud上的lisa包。

```shell
lisa install git+https://cloud.listenai.com/listenai_zbzhao/test-lscloud-pkg.git#semver:^1.0.0
```

可以看到，install后面的包格式为 git+{包的地址}#semver:{版本}

包的地址可以在LSCloud该项目进行查看

![](./files/cloud_pkg/9.png)

:::warning

这里建议使用https的包地址进行install。

安装LSCloud所有的lisa包都需要你的聆思账号有权限在LSCloud查看该包。

:::

3、如果上面的命令能成功执行，恭喜你，你已经能够使用该包了，可以在package.json查看你刚刚install的包。

![](./files/cloud_pkg/10.png)

## 更新包

当你的包有需要更新时，正常使用git的操作，推到LSCloud上，然后重复文档中的发布流程在LSCloud里进行发布即可。

## 本地的git聆思账号权限配置

1、先查看你本机的git的配置文件。
```shell
git config --global -l --show-origin
```

![](./files/cloud_pkg/11.png)

如图，配置文件的路径为 C:/Users/geekz/.gitconfig

2、修改配置文件，添加一条helper

```toml
helper = store --file ~/.git-credential
```

![](./files/cloud_pkg/12.png)

此处为了不影响原有的helper，需要手动自行添加。当存在多个helper时，git的账号验证会按照顺序加载。

3、往 ~/.git-credential 文件添加LSCloud的账号密码

格式：https://{username}:{password}@cloud.listenai.com

```shell
https://listenai_zbzhao:testtest@cloud.listenai.com
```