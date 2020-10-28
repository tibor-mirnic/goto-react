import { Handler } from "./handler";

export type EventMap<T = any> = Map<string, Handler<T>[]>;

export interface IEventEmitter {
  subscribe<T>(eventName: string, handler: Handler<T>): void;
  publish<T>(eventName: string, data: T): void;
  unsubscribe<T = any>(eventName: string, handler: Handler<T>): void;
}