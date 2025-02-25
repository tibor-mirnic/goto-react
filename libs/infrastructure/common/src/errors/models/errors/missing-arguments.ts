import { ApplicationError } from './application';

export class MissingArgumentsError extends ApplicationError {
  constructor(message = 'Missing arguments') {
    super(message, 'Missing Arguments');
  }
}
