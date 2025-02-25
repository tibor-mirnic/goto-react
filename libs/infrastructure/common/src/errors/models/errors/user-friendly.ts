import { ErrorBase } from '../base';
import { ErrorType } from '../enum';

export class UserFriendlyError extends ErrorBase {
  constructor(message = 'You have an a error', name = 'User Friendly') {
    super(message, name, ErrorType.USER_FRIENDLY);
  }
}
