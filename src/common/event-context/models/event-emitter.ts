import { Handler } from "./handler";

export type EventMap<T = any> = Map<string, Handler<T>[]>;

export type Subscribe = <T>(eventName: string, handler: Handler<T>) => void;
export type Publish = <T>(eventName: string, data: T) => void;
export type Unsubscribe = <T = any>(eventName: string, handler: Handler<T>) => void;

export interface IEventEmitter {
  subscribe: Subscribe;
  publish: Publish;
  unsubscribe: Unsubscribe;
}