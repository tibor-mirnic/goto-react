import { UserFriendlyError } from './user-friendly';

export class NotImplementedError extends UserFriendlyError {
  constructor(message = 'This feature is not implemented') {
    super(message, 'Not Implemented');
  }
}
