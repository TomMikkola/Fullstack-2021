import axios from 'axios'
const baseUrl = '/api/login'

const login = async loginInfo => {
  const result = await axios.post(baseUrl, { username: loginInfo.username, password: loginInfo.password })
  return result.data
}

export default { login }