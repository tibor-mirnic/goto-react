import { ErrorBase } from '../base';
import { ErrorType } from '../enum';

export class ApplicationError extends ErrorBase {
  constructor(message = 'Code execution failed', name = 'Application') {
    super(message, name, ErrorType.APPLICATION);
  }
}
