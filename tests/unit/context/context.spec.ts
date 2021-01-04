import { requestSpy } from '../../doubles/spys/context';
import getContext from '../../../src/context';

describe('Context smoke tests', () => {
  it('should export request and repositories in context', async () => {
    const request = requestSpy();
    const context = getContext(request);

    expect(context).toHaveProperty('request', request);
    expect(context).toHaveProperty('repositories');
    expect(typeof context.repositories).toBe('object');
  });
});