import { HandleErrorMethod } from '../errors/hooks';

export type CommonServicesMock = Partial<{
  handleErrorMock: HandleErrorMethod;
}>;

export const getCommonServicesMock = (mockedServices?: CommonServicesMock) => {
  const mock: {
    handleError: HandleErrorMethod;
  } = {
    handleError: () => {}
  };

  if (mockedServices?.handleErrorMock) {
    mock.handleError = mockedServices.handleErrorMock;
  }

  return mock;
};
