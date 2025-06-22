import axios from 'axios'
import { User } from '../types/user'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000,
})

export const fetchUsers = () => api.get<User[]>('/users')

export default api
