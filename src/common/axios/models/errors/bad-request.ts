import { UserFriendlyError } from 'src/common/errors';

export class BadRequestError extends UserFriendlyError {
  constructor(message = 'Bad Request. Please check your parameters') {
    super(message, 'Bad Request');
  }
}
