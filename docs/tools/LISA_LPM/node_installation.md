---
title: node环境搭建
---

### Windows

打开[node官网](https://nodejs.org/zh-cn/)，选择**长期维护版(LTS)16.13.0**进行下载安装。

或直接点击下载地址：

[node-v16.13.0_Windows(x64)64位](https://cdn.iflyos.cn/public/node/v16.13.0/node-v16.13.0-x64.msi)

[node-v16.13.0_Windows(x86)32位](https://cdn.iflyos.cn/public/node/v16.13.0/node-v16.13.0-x86.msi)

下载后点击安装即可。

顺利安装后，验证本地的node环境吧~

```shell
node -v
```

```shell
npm -v
```

### macOS 或 linux

由于macOS pkg一键安装存在权限相关的问题，以及linux的搭建node环境较为复杂，此处建议使用nvm来安装node。

#### 安装nvm

使用 curl
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```
或 wget
```shell
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

安装后，执行

```shell
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

上述都顺利完成后，重新打开个新的终端，尝试验证安装结果。

```shell
nvm
```

#### 使用nvm安装node

执行

```shell
nvm install 16.13.0
```

```shell
nvm use 16.13.0
```

顺利执行后，验证本地的node环境吧~

```shell
node -v
```

```shell
npm -v
```