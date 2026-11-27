export class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  adminSecret?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.adminSecret) {
    headers['x-admin-secret'] = options.adminSecret;
  }

  const response = await fetch(`/api${endpoint}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage =
      typeof payload?.error === 'string'
        ? payload.error
        : `Request failed with status ${response.status}`;
    throw new ApiError(errorMessage, response.status);
  }

  return (payload.data ?? payload) as T;
}
