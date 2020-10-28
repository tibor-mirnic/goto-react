import { ErrorBase } from "../base"

export type HandleErrorMethod = (error: ErrorBase, processError?: (error: ErrorBase) => void) => void;

export interface IErrorHook {
  handleError: HandleErrorMethod;
}