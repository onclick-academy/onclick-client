import { fetcher } from "./fetcher"

const getAuthUser = async () => {
  try {
      const res = await fetcher({ url: '/users/userinfo' })
      return res
  } catch (err) {
    console.error('ERRO: ' + err)
  }
}

export default getAuthUser
