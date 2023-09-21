import { ErrorBase } from '../../models';

export type HandleErrorMethod = (error: ErrorBase, processError?: (error: ErrorBase) => void) => void;

export type ErrorHandlerHook = {
  handleError: HandleErrorMethod;
};
