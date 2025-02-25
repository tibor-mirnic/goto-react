import { ErrorBase, ErrorType } from '../../../../errors';

export class ConnectionError extends ErrorBase {
  constructor(message = 'Cannot connect', name = 'Connection') {
    super(message, name, ErrorType.CONNECTION);
  }
}
