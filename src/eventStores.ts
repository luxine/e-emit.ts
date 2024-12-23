import { eventEmitter,type Callback } from "./eventEmitter";
export type EventStoreCallback = () => Record<string, Callback>;

class EventStore {
    readonly eventStoreSign:string;
    private static eventIDArray:string[] = [];
    private constructor(eventStoreID:string,option:EventStoreCallback) {
        this.eventStoreSign = eventStoreID;
        const _option = option();
        Object.keys(_option).forEach((key)=>{
            eventEmitter.on(this.eventStoreSign+key,_option[key]);
        })
     }

    static createInstance(eventStoreID:string,option:EventStoreCallback): EventStore | null {
        let eventStoreSign =eventStoreID.slice(0,eventStoreID.length-1)
        if (this.eventIDArray.includes(eventStoreSign)) {
            console.error(`EventStoreError: 标识为${eventStoreID}的仓库重复创建`);
            return null;
        }
        this.eventIDArray.push(eventStoreSign);
        return new EventStore(eventStoreID,option);
    }
    emit(eventName:string,...args:any[]){
        eventEmitter.emit(this.eventStoreSign+eventName,args);
    }
};


export const createEventStore = (eventStoreID:string,option:EventStoreCallback)=>{
    return EventStore.createInstance(eventStoreID+":",option);
}