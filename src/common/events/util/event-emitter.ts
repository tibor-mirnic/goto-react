import { EventMap, IEventEmitter } from "../models/event-emitter";
import { Handler } from "../models/handler";

export class EventEmitter implements IEventEmitter {
  
  private _events: EventMap;

  constructor(
  ) {
    this._events = new Map();
  }

  subscribe<T>(eventName: string, handler: Handler<T>): void {
    const handlers = this._events.get(eventName);
    
    const added = handlers && handlers.push(handler);

    if (!added) {
      this._events.set(eventName, [handler]);
    }
  }

  publish<T>(eventName: string, data: T): void {
    let handlers = this._events.get(eventName) || [];
    
    handlers.forEach(handler => 
      handler({
        name: eventName,
        data
      })
    );
  }

  unsubscribe<T = any>(eventName: string, handler: Handler<T>): void {
    let handlers = this._events.get(eventName) || [];
    
    handlers = handlers.filter(a => a != handler);

    this._events.set(eventName, handlers);
  }
}