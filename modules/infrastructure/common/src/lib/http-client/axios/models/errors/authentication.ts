import { ErrorBase, ErrorType } from '../../../../errors';

export class AuthenticationError extends ErrorBase {
  constructor(message = 'Cannot authenticate', name = 'Authentication') {
    super(message, name, ErrorType.AUTHENTICATION);
  }
}
