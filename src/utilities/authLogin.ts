import Cookies from 'universal-cookie'

export async function login(email, password) {
  try {
    const url = 'http://localhost:3000/api/v1/auth/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }

    const response = await fetch(url, options)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to log in')
    }

    const data = await response.json()
    const accessTokn = data.accessToken
    const refreshToken = data.refreshToken

    const cookies = new Cookies()

    if (data.status === 'success') {
      cookies.set('accessToken', accessTokn)
      cookies.set('refreshToken', refreshToken)
      localStorage.setItem('userId', data.data.id)
    }
    console.log(cookies.get('accessToken'))
    return data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export async function fetchSubCategories() {
  try {
    const cookies = new Cookies()
    const accessToken = cookies.get('accessToken')

    const url = 'http://localhost:3000/api/v1/subcategories/all'
    const options = {
      method: 'GET',
      credentials: 'include' as RequestCredentials // Update the credentials property to a valid RequestCredentials value
    }

    const response = await fetch(url, options)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch categories')
    }

    const categoriesData = await response.json()
    return categoriesData
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
