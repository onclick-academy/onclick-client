import { Console } from 'console'
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
  const accessTokn = data.accessToken
  const refreshToken = data.refreshToken

  // Initialize the Cookies instance
  const cookies = new Cookies()

  if (res.ok) {
    // Save tokens in cookies instead of localStorage
    cookies.set('accessToken', accessTokn)
    cookies.set('refreshToken', refreshToken)
    localStorage.setItem('userId', data.data.id)
  }

  return data
}

export const fetcher = async ({ url, method = 'GET', body = {} }: FetcherT) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`
  const res = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: method === 'GET' ? undefined : JSON.stringify(body)
  })
  // console.log('res', res)

  return await res.json()
}
