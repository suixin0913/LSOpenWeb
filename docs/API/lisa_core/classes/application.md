[@listenai/lisa_core](../README.md) / [Exports](../modules.md) / Application

# Class: Application

## Table of contents

### Constructors

- [constructor](application.md#constructor)

### Properties

- [\_apiHost](application.md#_apihost)
- [\_apiPrefix](application.md#_apiprefix)
- [\_cacheDir](application.md#_cachedir)
- [\_context](application.md#_context)
- [\_logPath](application.md#_logpath)
- [\_lpmRegistryUrl](application.md#_lpmregistryurl)
- [argv](application.md#argv)
- [download\_path](application.md#download_path)
- [packageJSON](application.md#packagejson)
- [pipeline](application.md#pipeline)
- [root](application.md#root)
- [task\_path](application.md#task_path)
- [tasks](application.md#tasks)
- [template\_path](application.md#template_path)

### Accessors

- [apiHost](application.md#apihost)
- [apiPrefix](application.md#apiprefix)
- [cacheDir](application.md#cachedir)
- [context](application.md#context)
- [logPath](application.md#logpath)
- [lpmRegistryUrl](application.md#lpmregistryurl)

### Methods

- [addContext](application.md#addcontext)
- [addGlobalContext](application.md#addglobalcontext)
- [configuration](application.md#configuration)
- [errorLog](application.md#errorlog)
- [getContextFromPackageName](application.md#getcontextfrompackagename)
- [gitignore](application.md#gitignore)
- [log](application.md#log)

## Constructors

### constructor

• **new Application**()

## Properties

### \_apiHost

• `Private` `Optional` **\_apiHost**: `string`

lisa server api host

#### Defined in

src/application.ts:49

___

### \_apiPrefix

• `Private` `Optional` **\_apiPrefix**: `string`

lisa server api prefix

#### Defined in

src/application.ts:62

___

### \_cacheDir

• `Private` `Optional` **\_cacheDir**: `string`

lisa cache 缓存目录

#### Defined in

src/application.ts:75

___

### \_context

• `Private` **\_context**: `any` = `{}`

自定义参数

#### Defined in

src/application.ts:135

___

### \_logPath

• `Private` `Optional` **\_logPath**: `string`

log 路径

#### Defined in

src/application.ts:182

___

### \_lpmRegistryUrl

• `Private` `Optional` **\_lpmRegistryUrl**: `string`

lpm registry url

#### Defined in

src/application.ts:35

___

### argv

• **argv**: `string`[] = `[]`

执行命令的参数

#### Defined in

src/application.ts:177

___

### download\_path

• **download\_path**: `string`

download 目录

#### Defined in

src/application.ts:98

___

### packageJSON

• **packageJSON**: `any` = `null`

package.json 信息

#### Defined in

src/application.ts:30

___

### pipeline

• **pipeline**: [`Pipeline`](../modules.md#pipeline)

创建项目时的参数

#### Defined in

src/application.ts:117

___

### root

• **root**: `string`

项目主目录

#### Defined in

src/application.ts:88

___

### task\_path

• `Optional` **task\_path**: `string`

task 文件地址

#### Defined in

src/application.ts:103

___

### tasks

• **tasks**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: [`TaskObject`](../modules.md#taskobject)

#### Defined in

src/application.ts:25

___

### template\_path

• **template\_path**: `string`

template 目录

#### Defined in

src/application.ts:93

## Accessors

### apiHost

• `get` **apiHost**(): `string`

#### Returns

`string`

#### Defined in

src/application.ts:55

• `set` **apiHost**(`url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

#### Defined in

src/application.ts:51

___

### apiPrefix

• `get` **apiPrefix**(): `string`

#### Returns

`string`

#### Defined in

src/application.ts:68

• `set` **apiPrefix**(`url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

#### Defined in

src/application.ts:64

___

### cacheDir

• `get` **cacheDir**(): `string`

#### Returns

`string`

#### Defined in

src/application.ts:81

• `set` **cacheDir**(`url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

#### Defined in

src/application.ts:77

___

### context

• `get` **context**(): `any`

#### Returns

`any`

#### Defined in

src/application.ts:136

___

### logPath

• `get` **logPath**(): `string`

#### Returns

`string`

#### Defined in

src/application.ts:188

• `set` **logPath**(`url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

#### Defined in

src/application.ts:184

___

### lpmRegistryUrl

• `get` **lpmRegistryUrl**(): `string`

#### Returns

`string`

#### Defined in

src/application.ts:41

• `set` **lpmRegistryUrl**(`url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

#### Defined in

src/application.ts:37

## Methods

### addContext

▸ **addContext**(`packageName`, `context`): `void`

添加指定包的自定义参数

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packageName` | `string` | lisa lib包名 |
| `context` | `Object` | 自定义参数 |

#### Returns

`void`

#### Defined in

src/application.ts:145

___

### addGlobalContext

▸ **addGlobalContext**(`context`): `void`

添加全局的自定义参数

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Object` | 自定义参数 |

#### Returns

`void`

#### Defined in

src/application.ts:158

___

### configuration

▸ **configuration**(`callback`): `void`

程序设置

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `ConfigFunc` |

#### Returns

`void`

#### Defined in

src/application.ts:110

___

### errorLog

▸ **errorLog**(`stderr`): `void`

log stderr 输出

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stderr` | `string` | 输出内容 |

#### Returns

`void`

#### Defined in

src/application.ts:236

___

### getContextFromPackageName

▸ **getContextFromPackageName**(`packaegName`): `any`

获取包名下面的Context属性

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packaegName` | `string` | 包名 |

#### Returns

`any`

#### Defined in

src/application.ts:166

___

### gitignore

▸ **gitignore**(`path`, `args`): `void`

gitignore 设置git忽略的目录文件

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | .gitignore 路径 |
| `args` | `string`[] | 要忽略的目录文件 |

#### Returns

`void`

#### Defined in

src/application.ts:197

___

### log

▸ **log**(`stdout`): `void`

log stdout 输出

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stdout` | `string` | 输出内容 |

#### Returns

`void`

#### Defined in

src/application.ts:220
