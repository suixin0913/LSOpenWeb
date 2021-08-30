# 导读
聆思文档中心（LSOpen）专门提供安徽聆思智能科技有限公司的芯片和方案相关开发资料。

目前主要由聆思产品团队和开发团队进行维护。

[主页地址](https://docs.listenai.com/)

## 项目主要文件

- `docs`：当前维护在线上的有效文档，若需改动请参考[文档维护指南](#文档维护指南)。
- `docs_old`：已经不维护的文档，过一段时间会删除。
- `static`：小文件存放地，如几MB以内的音视频。
- `docusaurus.config.js`：一二级目录配置。
- `sidebars.js`：侧边栏配置。
- `src`：可配置`pages`文件夹下`mock.json`自定义首页，其他文档贡献者和维护者无需关心。

## `docs`目录结构

- `start`：一些基础信息。
- `chips`：芯片相关资料，如datasheet、规格书等。
- `tools`：开发工具的下载和使用教程。
- `AIsolution`：AI应用解决方案。
- `Industrysolution`：行业（品类）解决方案。
- `school`：线上视频课程，不定期更新。
- `workorder`：工单入口。

# 文档上线流程

> 出于文档贡献开放的考虑，这里只将对象分为阅读者和维护者。

文档维护大致分为两步：
1. 阅读者对文档提出建议或者纠错（请参考[文档意见反馈](#文档意见反馈)），或者维护者需要更新文档。
2. 维护者确认文档更新需求和内容，对文档进行维护，完成后上线对外发布（请参考[文档维护指南](#文档维护指南)）。

# 文档维护规范

1. [标题](document_specification/docs/title.md)
2. [文本](document_specification/docs/text.md)
3. [段落](document_specification/docs/paragraph.md)
4. [数值](document_specification/docs/number.md)
5. [标点符号](document_specification/docs/marks.md)
6. [文档体系](document_specification/docs/structure.md)
7. [参考链接](document_specification/docs/reference.md)
> 注：该处参考引用了开源[中文技术文档的写作规范](https://github.com/ruanyf/document-style-guide)。

> 文档撰写默认也必须使用Markdown标准语法来完成。

此外，聆思文档中心使用 Docusaurus 框架，故编辑文档过程中可以使用 Docusaurus 本身支持的一些特性，来优化文档的阅读体验，以下是一些特性使用示例，供你参考：
- [使用告示块](https://docusaurus.io/zh-CN/docs/markdown-features/admonitions)
- [更改字体颜色](https://www.docusaurus.cn/docs/markdown-features/react#using-jsx-in-markdown)

查看规范的文档展示页面：[符合规范的文档样式](https://docs.listenai.com/AIsolution/ESR/Quick_start/Quick_start)

# 文档意见反馈

- 在[文档中心](https://docs.listenai.com/)的每篇文档下，都有反馈入口，填写你的反馈内容将会自动在该项目下创建一条指派给聆思工作人员的issue。
- 你也可以直接仓库提交issue对文档内容问题、需求进行反馈，完成内容的书写后，请指派聆思工作人员账号`zainosl`。
![image](https://user-images.githubusercontent.com/48555232/130925791-8ede117b-3f78-4619-8f05-5e81d1858b9c.png)

> 文档反馈后，聆思工作人员将会审核你的反馈，并在issue中做回复。

# 文档维护指南

## 快速维护
> 针对现有文档进行快速更改和修复，适合少量内容修改和补充。
1. 在源文件md页面中，单击“编辑“按钮，在对应内容处完成更改、修复。
2. 修改完成后，可单击“预览“按钮，确认修改结果。
3. 确认无误后，在“Commit changes“中填写修改意见和补充信息，提交。

![image](https://user-images.githubusercontent.com/48555232/130927193-4653aa79-b3d5-4c22-b4ab-ec7221280ae5.png)
![image](https://user-images.githubusercontent.com/48555232/130927718-318b2608-a046-43ac-ae06-c4a2ce3b892f.png)

## 详细维护
> 针对较大范围的文档内容新增、优化、修复。

参考[文档维护详细教程](https://www.tapd.cn/43138663/documents/show/1143138663001002430#target:toc15)（内部可看）

# FAQ
- [推送失败报：LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 解决方案](https://blog.csdn.net/daerzei/article/details/79528153)
- [8.13号后推送、拉取失败解决方案](https://blog.csdn.net/weixin_41010198/article/details/119698015)
- [如何在提交commit时关联issue](https://www.kancloud.cn/thinkphp/github-tips/37883)

# 贡献
欢迎开发者参与文档的贡献，不限于实现业务时遇到各种各样的问题，对应的解决方案和FAQ，以及创新参考。

有贡献需求，可通过`issue`指派`zainosl`或者邮箱`zwliu@listenai.com`联系聆思工作人员。


# ReleaseNote
每个版本以及迁移说明都记录在GitHub的[ReleaseNote](https://github.com/LISTENAI/LSOpenWeb/releases)页面上。

