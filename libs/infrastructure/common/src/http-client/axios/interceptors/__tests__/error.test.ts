import { AxiosError } from 'axios';
import { ApplicationError, ErrorBase } from '../../../../errors';
import {
  AuthorizationError,
  BadRequestError,
  ConflictError,
  ConnectionError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalServerError,
  NotFoundError,
  RequestTimeoutError
} from '../../models';
import { onRejected } from '../error';

describe('axios: Error Interceptor', () => {
  const withArgs = (status: number, name = '') =>
    onRejected({ name, response: { status, data: { error: 'test error message' } } } as AxiosError);

  it('should reject with Error', async () => {
    const error = new AxiosError('message');

    let e;
    try {
      await onRejected(error);
    } catch (er) {
      e = er;
    }

    expect(e).toBe(null);
  });

  it('should reject with ErrorBase', async () => {
    const error = new ErrorBase('message');

    let e;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await onRejected(error as any);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(ErrorBase);
  });

  it('should reject with BadRequestError', async () => {
    let e;
    try {
      await withArgs(400);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(BadRequestError);
  });

  it('should reject with AuthorizationError', async () => {
    let e;
    try {
      await withArgs(401);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(AuthorizationError);
  });

  it('should reject with ForbiddenError', async () => {
    let e;
    try {
      await withArgs(403);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(ForbiddenError);
  });

  it('should reject with NotFoundError', async () => {
    let e;
    try {
      await withArgs(404);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(NotFoundError);
  });

  it('should reject with RequestTimeoutError', async () => {
    let e;
    try {
      await withArgs(408);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(RequestTimeoutError);
  });

  it('should reject with ConflictError', async () => {
    let e;
    try {
      await withArgs(409);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(ConflictError);
  });

  it('should reject with InternalServerError', async () => {
    let e;
    try {
      await withArgs(500);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(InternalServerError);
  });

  it('should reject with ConnectionError', async () => {
    let e;
    try {
      await withArgs(503);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(ConnectionError);
  });

  it('should reject with GatewayTimeoutError', async () => {
    let e;
    try {
      await withArgs(504);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(GatewayTimeoutError);
  });

  it('should reject with RequestTimeoutError when Timeout', async () => {
    let e;
    try {
      await withArgs(408, 'TimeoutError');
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(RequestTimeoutError);
  });

  it('should reject with ApplicationError', async () => {
    let e;
    try {
      await withArgs(0);
    } catch (er) {
      e = er;
    }

    expect(e).toBeInstanceOf(ApplicationError);
  });
});
