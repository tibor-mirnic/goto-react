import { useCallback } from 'react';

import { ErrorContext, ErrorType } from '../models';
import { ErrorHandlerHook, HandleErrorMethod } from './models';

export const useErrorHandler = (errorContext: ErrorContext): ErrorHandlerHook => {
  const handleError = useCallback<HandleErrorMethod>(
    (error, processError) => {
      switch (error.type) {
        case ErrorType.APPLICATION: {
          errorContext.onUnexpectedError(error);
          break;
        }
        case ErrorType.NOT_FOUND:
        /* falls through */
        case ErrorType.USER_FRIENDLY:
        /* falls through */
        case ErrorType.AUTHORIZATION:
        /* falls through */
        case ErrorType.FORBIDDEN: {
          if (processError) {
            processError(error);
          } else {
            errorContext.onUserFriendlyError(error);
          }
          break;
        }
        case ErrorType.AUTHENTICATION:
        /* falls through */
        case ErrorType.CONNECTION: {
          if (processError) {
            processError(error);
          }

          errorContext.onUserFriendlyError(error);

          break;
        }
        case ErrorType.CONFLICT: {
          if (processError) {
            processError(error);
          }
          errorContext.onUserFriendlyError(error);

          break;
        }

        default: {
          errorContext.onUserFriendlyError(error);
        }
      }
    },
    [errorContext]
  );

  return { handleError };
};
