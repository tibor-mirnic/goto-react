import { IEvent } from "./event";

export type Handler<T> = (event: IEvent<T>) => void | Promise<void>;