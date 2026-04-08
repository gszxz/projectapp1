import axios from "axios"

const api = axios.create({
  baseURL: 'https://projectapp1-production.up.railway.app'
})
export default api
