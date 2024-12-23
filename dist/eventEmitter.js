/**
 * 实现一个事件发射器类，用于管理事件的订阅和触发
 */
class EventEmitter {
    // 存储事件名称与对应回调函数数组的映射
    _events;
    // 单例模式，存储事件发射器的唯一实例
    static instance;
    // 构造函数私有化，防止外部直接实例化
    constructor() {
        this._events = new Map();
    }
    /**
     * 根据事件名称获取对应的回调函数数组
     * @param eventName 事件名称
     * @returns 回调函数数组或undefined
     */
    getEventArray(eventName) {
        return this._events.get(eventName);
    }
    /**
     * 获取所有事件的名称列表，并可选地打印提示消息
     * @param message 是否打印提示消息，默认为true
     * @returns 事件名称列表
     */
    getAllEventsMessage(message = true) {
        const eventNames = Array.from(this._events.keys());
        if (message) {
            console.log(`%c------------------------ \n EventEmitter事件中心通知:当前共计注册${eventNames.length}个事件,调用-->  %ceventEmitter.getEventArray(eventName: string)%c方法可获取对应的回调函数数组,本方法传递参数false可关闭提示消息 \n------------------------------------------------------------------ \n`, 'color: blue;', 'color: red;', 'color: blue;', eventNames);
        }
        return eventNames;
    }
    /**
     * 删除指定事件名称对应的回调函数数组
     * @param eventName 事件名称
     */
    deleteEventArray(eventName) {
        this._events.delete(eventName);
    }
    /**
     * 注册一个事件，当事件触发时只执行一次回调函数，然后自动移除该回调函数
     * @param eventName 事件名称
     * @param callback 回调函数
     * @returns 当前的EventEmitter实例，用于链式调用
     */
    once(eventName, callback) {
        const onceCallback = (...args) => {
            callback(...args);
            this.off(eventName, onceCallback);
        };
        this.on(eventName, onceCallback);
        return this;
    }
    /**
     * 注册一个事件，当事件触发时执行回调函数
     * @param eventName 事件名称
     * @param callback 回调函数
     */
    on(eventName, callback) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, []);
        }
        this._events.get(eventName).push(callback);
    }
    /**
     * 触发指定事件，执行所有注册到该事件的回调函数
     * @param eventName 事件名称
     * @param args 传递给回调函数的参数
     * @returns 回调函数执行结果的数组
     */
    emit(eventName, ...args) {
        if (!this._events.has(eventName)) {
            console.warn(`事件 ${eventName} 未定义`);
            return [];
        }
        return this._events.get(eventName).map(callback => callback(...args));
    }
    /**
     * 移除指定事件的某个回调函数
     * @param eventName 事件名称
     * @param callback 要移除的回调函数
     */
    off(eventName, callback) {
        const callbacks = this._events.get(eventName);
        if (!callbacks) {
            console.warn(`事件 ${eventName} 未定义`);
            return;
        }
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    }
    /**
     * 获取EventEmitter的单例实例
     * @returns EventEmitter的实例
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventEmitter();
        }
        return this.instance;
    }
}
// 导出EventEmitter的单例实例，供外部使用
export const eventEmitter = EventEmitter.getInstance();
