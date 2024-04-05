import { fetcher } from './fetcher'

const getAuthUser = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/users/userinfo'
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if (!res.ok) throw Error('Error when getting auth user')
    const user = await res.json()

    return user
  } catch (err) {
    console.error('ERRO: ' + err)
  }
}

export default getAuthUser
