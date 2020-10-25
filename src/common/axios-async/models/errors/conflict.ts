import { ErrorBase, ErrorType } from 'src/common/errors';

export class ConflictError extends ErrorBase {
  constructor(message = 'Conflict', name = 'Conflict') {
    super(message, name, ErrorType.CONFLICT);
  }
}
