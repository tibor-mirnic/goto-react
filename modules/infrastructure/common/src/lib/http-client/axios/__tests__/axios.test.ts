import { createAxios } from '../axios';

describe('axios: Instance', () => {
  it('should return axios instance', () => {
    const instance = createAxios({
      applicationId: 'id'
    });

    expect(instance).not.toBeNull();
    expect(instance).not.toBeUndefined();
  });
});
