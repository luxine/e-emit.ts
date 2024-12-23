# emiter.ts

`emiter.ts` 是一个轻量级的事件管理工具，用于创建事件发射器和事件仓库，支持事件的订阅、触发、移除以及事件仓库的管理，适合小型到中型的 JavaScript/TypeScript 项目。

## 特性

- 支持事件的动态订阅和触发
- 事件只执行一次的 `once` 订阅模式
- 单例模式管理全局事件发射器
- 支持事件仓库的创建和管理
- 完整的 TypeScript 类型支持

---
## 安装

使用 npm 安装：
```bash
npm install emiter.ts
```
使用 yarn 安装：
```bash
yarn add emiter.ts
```


## API 文档
`EventEmitter` 类
全局事件发射器，支持以下方法：

`on(eventName: string, callback: Callback): void`
注册一个事件。

`once(eventName: string, callback: Callback): void`
注册一个只触发一次的事件。

`emit(eventName: string, ...args: any[]): any[]`
触发指定事件。

`off(eventName: string, callback: Callback): void`
移除指定事件的回调函数。

`getAllEventsMessage(message?: boolean): string[]`
获取所有已注册事件的名称列表。

`deleteEventArray(eventName: string): void`
删除指定事件的回调函数数组。

`EventStore` 类
事件仓库，用于分组管理事件。

`createEventStore(eventStoreID: string, option: EventStoreCallback): EventStore | null`
创建一个事件仓库。`option` 参数是一个返回事件列表的回调函数。

`emit(eventName: string, ...args: any[]): void`
触发仓库中的指定事件。

## 示例
1. 创建和管理全局事件
EventEmitter 提供了一个全局单例实例 eventEmitter，用于注册和触发事件。
```typescript
import { eventEmitter } from "event-emitter";

// 注册事件
eventEmitter.on("hello", (name: string) => {
    console.log(`Hello, ${name}!`);
});

// 触发事件
eventEmitter.emit("hello", "World"); // 输出: Hello, World!

// 注册只触发一次的事件
eventEmitter.once("onceEvent", () => {
    console.log("This will run only once.");
});
eventEmitter.emit("onceEvent"); // 输出: This will run only once.
eventEmitter.emit("onceEvent"); // 不会输出内容

// 查看所有已注册事件
eventEmitter.getAllEventsMessage();

// 移除事件
const callback = () => console.log("Goodbye!");
eventEmitter.on("bye", callback);
eventEmitter.off("bye", callback);

// 删除事件数组
eventEmitter.deleteEventArray("hello");

```

2. 创建事件存储器
事件存储器（EventStore）用于分组管理特定前缀的事件，避免事件名称冲突。

示例代码

```typescript
import { createEventStore } from "event-emitter";

// 定义事件存储器
const eventStore = createEventStore("myStore", () => ({
    greet: (name: string) => console.log(`Greet from store: Hello, ${name}!`),
    farewell: () => console.log("Farewell from store!")
}));

// 触发事件
eventStore?.emit("greet", "Alice"); // 输出: Greet from store: Hello, Alice!
eventStore?.emit("farewell");       // 输出: Farewell from store!

// 创建重复 ID 的存储器会报错
const duplicateStore = createEventStore("myStore", () => ({}));
// 输出: EventStoreError: 标识为 myStore 的仓库重复创建
```

