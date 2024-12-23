import { eventEmitter } from "./eventEmitter";
class EventStore {
    eventStoreSign;
    static eventIDArray = [];
    constructor(eventStoreID, option) {
        this.eventStoreSign = eventStoreID;
        const _option = option();
        Object.keys(_option).forEach((key) => {
            eventEmitter.on(this.eventStoreSign + key, _option[key]);
        });
    }
    static createInstance(eventStoreID, option) {
        let eventStoreSign = eventStoreID.slice(0, eventStoreID.length - 1);
        if (this.eventIDArray.includes(eventStoreSign)) {
            console.error(`EventStoreError: 标识为${eventStoreSign}的仓库重复创建`);
            return null;
        }
        this.eventIDArray.push(eventStoreSign);
        return new EventStore(eventStoreID, option);
    }
    emit(eventName, ...args) {
        eventEmitter.emit(this.eventStoreSign + eventName, args);
    }
}
;
export const createEventStore = (eventStoreID, option) => {
    return EventStore.createInstance(eventStoreID + ":", option);
};
