import { fetcher } from './fetcher'

const getAuthUser = async () => {
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
