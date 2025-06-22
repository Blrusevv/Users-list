import axios from 'axios'
import { User } from '../types/user'
import { Post } from '../types/post'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000,
})

// Users Endpoints
export const fetchUsers = () => api.get<User[]>('/users')
export const updateUser = (user: User) => api.put<User>(`/users/${user.id}`, user)

//Posts Endpoints
export const fetchPostsByUserId = (userId: number) => api.get<Post[]>(`/posts?userId=${userId}`)
export const updatePost = (post: Post) => api.put<Post>(`/posts/${post.id}`, post)
export const deletePost = (postId: number) => api.delete(`/posts/${postId}`)

export default api
