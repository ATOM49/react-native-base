import { API_URL, ApiError, apiFetch } from '@/api/client';

// The API layer is plain TypeScript, so it runs in Jest in milliseconds with no
// simulator. Keep request/response logic here (or in another UI-free module)
// and keep screens thin, so most behavior can be verified this way.
describe('apiFetch', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock;
  });

  it('prefixes the base URL, sends JSON headers and parses the body', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => [{ id: 1 }] });

    await expect(apiFetch('/posts', { headers: { Authorization: 'Bearer t' } })).resolves.toEqual([
      { id: 1 },
    ]);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/posts`, {
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer t' },
    });
  });

  it('throws an ApiError carrying the status on a non-2xx response', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 404 });

    const error = await apiFetch('/missing').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 404 });
  });
});
