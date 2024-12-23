import { type Callback } from "./eventEmitter";
export type EventStoreCallback = () => Record<string, Callback>;
declare class EventStore {
    readonly eventStoreSign: string;
    private static eventIDArray;
    private constructor();
    static createInstance(eventStoreID: string, option: EventStoreCallback): EventStore | null;
    emit(eventName: string, ...args: any[]): void;
}
export declare const createEventStore: (eventStoreID: string, option: EventStoreCallback) => EventStore | null;
export {};
