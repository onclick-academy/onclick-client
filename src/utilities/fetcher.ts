import Cookies from 'universal-cookie'

type FetcherT = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: object
}

type AuthFetcherT = {
  body: object
  action: 'register' | 'login'
}

export const authFetcher = async ({ body = {}, action }: AuthFetcherT) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/${action}`
  console.log(fullUrl)
  const res = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body)
  })
  const data = await res.json()

  if (res.ok) {
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('userId', data.data.id)
  }

  return data
}

export const fetcher = async ({ url, method = 'GET', body = {} }: FetcherT) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`
  const res = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${localStorage.getItem('accessToken')}`,
      refreshToken: `Bearer ${localStorage.getItem('refreshToken')}`
    },
    credentials: 'include',
    body: method === 'GET' ? undefined : JSON.stringify(body)
  })

  return await res.json()
}
