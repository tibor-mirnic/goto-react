import { usePublish } from "src/common/events";

import { ErrorType } from "../models/enum/error-type";
import { ErrorHandlerEvent } from "../models/enum/error-handler-event";
import { HandleErrorMethod, IErrorHook } from "../models/hooks/error-handler";

export const useErrorHandler = (): IErrorHook => {
  const { publish } = usePublish();

  const handleError: HandleErrorMethod = (error, processError) => {
    switch (error.type) {
      case ErrorType.APPLICATION:
      case ErrorType.NOT_FOUND:
      case ErrorType.USER_FRIENDLY:
      case ErrorType.AUTHORIZATION:
      case ErrorType.FORBIDDEN: {
        if (processError) {
          processError(error);
        }
        else {
          publish(ErrorHandlerEvent.ERROR_HANDLER_USER, error);
        }
  
        break;
      }
      case ErrorType.AUTHENTICATION:
      case ErrorType.CONNECTION: {
        if (processError) {
          processError(error);
        }
  
        publish(ErrorHandlerEvent.ERROR_HANDLER_SECURITY, error);
  
        break;
      }
      case ErrorType.CONFLICT: {
        if (processError) {
          processError(error);
        }
  
        publish(ErrorHandlerEvent.ERROR_HANDLER_CONFLICT, error);
  
        break;
      }
  
      default: {
        publish(ErrorHandlerEvent.ERROR_HANDLER_UNEXPECTED, error);
      }
    }
  }

  return {
    handleError
  }
};