import axios from 'axios'

const base_url = import.meta.env.VITE_BASE_URL

axios.defaults.withCredentials = true

const authService = {
  async verifyAuth() {
    try {
      const response = await axios.get(`${base_url}/login/verify`)
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          await axios.post(`${base_url}/login/refresh`)
          const retryResponse = await axios.get(`${base_url}/login/verify`)
          return retryResponse.data
        } catch (refreshError) {
          console.log(refreshError);
        }
      }
      throw error
    }
  },

  async login(username, password) {
    const response = await axios.post(`${base_url}/login`, {
      username,
      password
    })
    return response.data
  },

  async logout() {
    await axios.post(`${base_url}/login/logout`)
  },

}

export default authService