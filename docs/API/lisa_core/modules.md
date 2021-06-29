[@listenai/lisa_core](README.md) / Exports

# @listenai/lisa_core

Lisa Core 是 Lisa Framework 的核心框架，用于项目创建，Task 支持等能力

## Table of contents

### Classes

- [Application](classes/application.md)
- [PipelineObject](classes/pipelineobject.md)

### Type aliases

- [Pipeline](modules.md#pipeline)
- [TaskObject](modules.md#taskobject)
- [TaskOptions](modules.md#taskoptions)

### Properties

- [default](modules.md#default)

### Functions

- [argv](modules.md#argv)
- [flags](modules.md#flags)
- [load](modules.md#load)
- [loadConfig](modules.md#loadconfig)
- [loadDependencies](modules.md#loaddependencies)
- [loadDevDependencies](modules.md#loaddevdependencies)
- [loadFile](modules.md#loadfile)
- [loadPackageJSON](modules.md#loadpackagejson)
- [loadTask](modules.md#loadtask)
- [loadTypescript](modules.md#loadtypescript)
- [minimist](modules.md#minimist)
- [parsePackageJSON](modules.md#parsepackagejson)

## Type aliases

### Pipeline

Ƭ **Pipeline**: `Object`

pipeline定义

#### Index signature

▪ [key: `string`]: [`PipelineObject`](classes/pipelineobject.md)

#### Defined in

src/application.ts:13

___

### TaskObject

Ƭ **TaskObject**: `Listr.ListrTask`<`Listr.ListrContext`\>

#### Defined in

src/application.ts:7

___

### TaskOptions

Ƭ **TaskOptions**: `Listr.ListrOptions`

#### Defined in

src/application.ts:8

## Properties

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Tasks` | typeof `Listr` |
| `application` | [`Application`](classes/application.md) |
| `cmd` | (`file`: `string`, `arguments?`: readonly `string`[], `options?`: `Options`<`string`\>) => `ExecaChildProcess`<`string`\>(`file`: `string`, `arguments?`: readonly `string`[], `options?`: `Options`<``null``\>) => `ExecaChildProcess`<`Buffer`\>(`file`: `string`, `options?`: `Options`<`string`\>) => `ExecaChildProcess`<`string`\>(`file`: `string`, `options?`: `Options`<``null``\>) => `ExecaChildProcess`<`Buffer`\> |
| `cmd.command` | [object Object] |
| `cmd.commandSync` | [object Object] |
| `cmd.node` | [object Object] |
| `cmd.sync` | [object Object] |
| `fs` | `__module` |
| `got` | `Got` |
| `job` | (`cmdName`: `string`, `task`: [`TaskObject`](modules.md#taskobject)) => `void` |
| `runner` | (`job_list?`: `string`, `ctx?`: { [key: string]: `any`;  }, `verbose?`: `boolean`) => `Promise`<`unknown`\> |

## Functions

### argv

▸ **argv**(`argv?`, `opts?`): `ParsedArgs`

获取环境变量

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `argv` | `string`[] | - |
| `opts?` | `_minimist.Opts` | 设置解析参数 |

#### Returns

`ParsedArgs`

#### Defined in

src/argv.ts:10

___

### flags

▸ **flags**(`key`): (`target`: `any`, `propertyKey`: `string`, `descriptor`: `TypedPropertyDescriptor`<`fn`\>) => `void`

仅供typescript代码使用

**`example`**
```typescript
export class CliUx {
@flags("project_path")
async getProjectPath() {
const projectPath = await cli.prompt("请输入项目路径", {default: '.'})
return path.resolve(projectPath)
}

@flags('author')
async getAuthor() {
const author = await cli.prompt('请输入作者名称', {default: ''}) as string
return author
}

getProjectName(projectPath: string) {
return path.basename(projectPath)
}
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | 方法字段 |

#### Returns

`fn`

▸ (`target`, `propertyKey`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `propertyKey` | `string` |
| `descriptor` | `TypedPropertyDescriptor`<`fn`\> |

##### Returns

`void`

#### Defined in

src/argv.ts:42

___

### load

▸ **load**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `Tasks` | typeof `Listr` |
| `application` | [`Application`](classes/application.md) |
| `cmd` | (`file`: `string`, `arguments?`: readonly `string`[], `options?`: `Options`<`string`\>) => `ExecaChildProcess`<`string`\>(`file`: `string`, `arguments?`: readonly `string`[], `options?`: `Options`<``null``\>) => `ExecaChildProcess`<`Buffer`\>(`file`: `string`, `options?`: `Options`<`string`\>) => `ExecaChildProcess`<`string`\>(`file`: `string`, `options?`: `Options`<``null``\>) => `ExecaChildProcess`<`Buffer`\> |
| `cmd.command` | [object Object] |
| `cmd.commandSync` | [object Object] |
| `cmd.node` | [object Object] |
| `cmd.sync` | [object Object] |
| `fs` | `__module` |
| `got` | `Got` |
| `job` | (`cmdName`: `string`, `task`: [`TaskObject`](modules.md#taskobject)) => `void` |
| `runner` | (`job_list?`: `string`, `ctx?`: { [key: string]: `any`;  }, `verbose?`: `boolean`) => `Promise`<`unknown`\> |

#### Defined in

src/load.ts:161

___

### loadConfig

▸ **loadConfig**(`configPath?`): `void`

加载 config.[js|ts]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configPath?` | `string` | config地址，默认为packge.json中配置的地址，如果没有配置，读取项目中config.js |

#### Returns

`void`

#### Defined in

src/load.ts:33

___

### loadDependencies

▸ **loadDependencies**(): `void`

#### Returns

`void`

#### Defined in

src/load.ts:98

___

### loadDevDependencies

▸ **loadDevDependencies**(): `void`

#### Returns

`void`

#### Defined in

src/load.ts:137

___

### loadFile

▸ **loadFile**(`file`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `string` | 加载路径 |

#### Returns

`void`

#### Defined in

src/load.ts:9

___

### loadPackageJSON

▸ **loadPackageJSON**(`packagePath?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `packagePath?` | `string` |

#### Returns

`void`

#### Defined in

src/load.ts:88

___

### loadTask

▸ **loadTask**(`taskPath?`): `void`

加载 task.[js|ts]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `taskPath?` | `string` | task地址，默认为packge.json中配置的地址，如果没有配置，读取项目中 task.js |

#### Returns

`void`

#### Defined in

src/load.ts:58

___

### loadTypescript

▸ **loadTypescript**(): `void`

#### Returns

`void`

#### Defined in

src/load.ts:92

___

### minimist

▸ `Const` **minimist**(`args?`, `opts?`): `minimist.ParsedArgs`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `string`[] |
| `opts?` | `minimist.Opts` |

#### Returns

`minimist.ParsedArgs`

#### Defined in

src/argv.ts:4

▸ `Const` **minimist**<`T`\>(`args?`, `opts?`): `T` & `minimist.ParsedArgs`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `string`[] |
| `opts?` | `minimist.Opts` |

#### Returns

`T` & `minimist.ParsedArgs`

#### Defined in

src/argv.ts:4

▸ `Const` **minimist**<`T`\>(`args?`, `opts?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ParsedArgs` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `string`[] |
| `opts?` | `minimist.Opts` |

#### Returns

`T`

#### Defined in

src/argv.ts:4

___

### parsePackageJSON

▸ **parsePackageJSON**(`packagePath?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `packagePath?` | `string` |

#### Returns

`any`

#### Defined in

src/load.ts:78
