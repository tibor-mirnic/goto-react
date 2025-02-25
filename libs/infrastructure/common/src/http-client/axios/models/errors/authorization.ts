import { ErrorBase, ErrorType } from '../../../../errors';

export class AuthorizationError extends ErrorBase {
  constructor(message = 'Unauthorized access', name = 'Authorization') {
    super(message, name, ErrorType.AUTHORIZATION);
  }
}
