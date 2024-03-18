import Cookies from 'universal-cookie';

type FetcherT = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: object;
};

type AuthFetcherT = {
  body: object;
  action: 'register' | 'login';
};

export const authFetcher = async ({ body = {}, action }: AuthFetcherT) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/${action}`;
  const res = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  const accessTokn = data.accessToken;
  const refreshToken = data.refreshToken;

  // Initialize the Cookies instance
  const cookies = new Cookies();

  if (data.status === 'success') {
    // Save tokens in cookies instead of localStorage
    cookies.set('accessToken', accessTokn);
    cookies.set('refreshToken', refreshToken);
    localStorage.setItem('userId', data.data.id);
  }

  return data;
};

export const fetcher = async ({ url, method = 'GET', body = {} }: FetcherT) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  const res = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: method === 'GET' ? undefined : JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }

  return await res.json();
};
