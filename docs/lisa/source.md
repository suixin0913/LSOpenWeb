#  @source/4002

`@source/4002` 是 CSK4002 方案固件源码软件包。

# 使用 lisa create 安装 @source

`lisa create` 命令可以使用模板软件包 `@generator/csk` 安装 `@source` 软件包

命令示例：`lisa create newProject -t @generator/csk`

- `newProject` 代表项目文件夹名称，可自定义。仅支持英文、数字与下划线
- `-t` 代表使用模板（template）创建项目
- `@generator/csk` 是CSK语音交互项目的标准模板

输入创建命令之后，创建模板会提供架手架配置项目所需软件包。请选择你需要使用的 `@source/xxx` 以及对应的版本。

```shell
> lisa create newProject -t @generator/csk
  √ 项目创建准备
  √ 初始化安装依赖
? 选择芯片方案 @source/csk4002
? 选择基础固件版本 3.1.4
? 选择板型模版 @board/lskits-csk4002
? 选择算法模  @algo/csk4002-cae-mlp
  √ 创建csk开发项目目录/文件
  √ 安装源码/必要依赖
  √ 源码初始化
  √ lskit配置准备
  √ 算法配置准备
```

# 更新@source

在命令行输入 `lisa upgrade` 即可完成 `@source/xxx` 的更新。


使用 `@generator/csk` 创建 CSK 项目后，可以在 `.\package.json` 查看 `@source/xxx` 的版本更新范围。


关于 `.\package.json` 的版本控制规则，请流程[这个文档](https://open.listenai.com/package_version)。

