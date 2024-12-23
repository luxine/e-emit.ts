/**
 * 定义一个回调函数类型，可以接受任意数量的参数并返回任意类型的值
 */
export type Callback = (...args: any[]) => any;
/**
 * 实现一个事件发射器类，用于管理事件的订阅和触发
 */
declare class EventEmitter {
    private _events;
    private static instance;
    private constructor();
    /**
     * 根据事件名称获取对应的回调函数数组
     * @param eventName 事件名称
     * @returns 回调函数数组或undefined
     */
    getEventArray(eventName: string): Callback[] | undefined;
    /**
     * 获取所有事件的名称列表，并可选地打印提示消息
     * @param message 是否打印提示消息，默认为true
     * @returns 事件名称列表
     */
    getAllEventsMessage(message?: boolean): string[];
    /**
     * 删除指定事件名称对应的回调函数数组
     * @param eventName 事件名称
     */
    deleteEventArray(eventName: string): void;
    /**
     * 注册一个事件，当事件触发时只执行一次回调函数，然后自动移除该回调函数
     * @param eventName 事件名称
     * @param callback 回调函数
     * @returns 当前的EventEmitter实例，用于链式调用
     */
    once(eventName: string, callback: Callback): this;
    /**
     * 注册一个事件，当事件触发时执行回调函数
     * @param eventName 事件名称
     * @param callback 回调函数
     */
    on(eventName: string, callback: Callback): void;
    /**
     * 触发指定事件，执行所有注册到该事件的回调函数
     * @param eventName 事件名称
     * @param args 传递给回调函数的参数
     * @returns 回调函数执行结果的数组
     */
    emit(eventName: string, ...args: any[]): any[];
    /**
     * 移除指定事件的某个回调函数
     * @param eventName 事件名称
     * @param callback 要移除的回调函数
     */
    off(eventName: string, callback: Callback): void;
    /**
     * 获取EventEmitter的单例实例
     * @returns EventEmitter的实例
     */
    static getInstance(): EventEmitter;
}
export declare const eventEmitter: EventEmitter;
export {};
