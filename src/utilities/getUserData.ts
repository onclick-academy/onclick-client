import { fetcher } from './fetcher'

const getData = async () => {
  const userInfo = await fetcher({
    url: `/users/userinfo`
  })

  console.log(userInfo)
  if (!userInfo.data.id) throw Error('Error: User not found.')
  const currentUser = await fetcher({
    url: `/users/${userInfo.data.id}`
  })
  return currentUser
}

export default getData
