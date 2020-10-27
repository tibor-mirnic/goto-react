import { ErrorBase } from "../models/base";
import { ErrorType } from "../models/enum/error-type";
import { ProcessedErrorEventType } from "../models/enum/processed-error-event-type";
import { IProcessedErrorEvent } from "../models/processed-error-event";

export const userErrorHandler = (
  error: ErrorBase,
  processError?: (error: ErrorBase) => void
): IProcessedErrorEvent | null => {
  let processedErrorEvent: IProcessedErrorEvent | null = null;
  
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
        processedErrorEvent = {
          type: ProcessedErrorEventType.USER,
          error
        };
      }

      break;
    }
    case ErrorType.AUTHENTICATION:
    case ErrorType.CONNECTION: {
      if (processError) {
        processError(error);
      }

      processedErrorEvent = {
        type: ProcessedErrorEventType.SECURITY,
        error
      };

      break;
    }
    case ErrorType.CONFLICT: {
      if (processError) {
        processError(error);
      }

      processedErrorEvent = {
        type: ProcessedErrorEventType.CONFLICT,
        error
      };

      break;
    }

    default: {
      processedErrorEvent = {
        type: ProcessedErrorEventType.UNEXPECTED,
        error
      };
    }
  }

  return processedErrorEvent;
}