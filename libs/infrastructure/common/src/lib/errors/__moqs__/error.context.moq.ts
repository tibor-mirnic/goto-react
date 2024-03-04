import { ErrorContext } from '..';

export type ErrorContextMock = Partial<ErrorContext>;

export const getErrorContextMock = (mockedContext?: ErrorContextMock): ErrorContext => {
  const mock: ErrorContext = {
    onUnexpectedError: () => {},
    onUserFriendlyError: () => {}
  };

  if (mockedContext?.onUnexpectedError) {
    mock.onUnexpectedError = mockedContext.onUnexpectedError;
  }

  if (mockedContext?.onUserFriendlyError) {
    mock.onUserFriendlyError = mockedContext.onUserFriendlyError;
  }

  return mock;
};
