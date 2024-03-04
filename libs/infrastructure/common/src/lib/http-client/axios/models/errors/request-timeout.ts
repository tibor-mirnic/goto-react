import { ErrorBase, ErrorType } from '../../../../errors';

export class RequestTimeoutError extends ErrorBase {
  constructor(message = 'Connection to server has timed out', name = 'Request Timeout') {
    super(message, name, ErrorType.REQUEST_TIMEOUT);
  }
}
