import axios from "axios"

const api = axios.create({
  baseURL: 'https://projectapp1-production.up.railway.app:3000'
})
export default api
