import { ErrorBase, ErrorType } from 'src/common/errors';

export class ForbiddenError extends ErrorBase {
  constructor(message = 'You are not permitted to use this resource', name = 'Forbidden') {
    super(message, name, ErrorType.FORBIDDEN);
  }
}
