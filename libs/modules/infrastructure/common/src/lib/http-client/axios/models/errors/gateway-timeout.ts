import { ErrorBase, ErrorType } from '../../../../errors';

export class GatewayTimeoutError extends ErrorBase {
  constructor(message = 'Connection to server has timed out', name = 'Gateway Timeout') {
    super(message, name, ErrorType.REQUEST_TIMEOUT);
  }
}
