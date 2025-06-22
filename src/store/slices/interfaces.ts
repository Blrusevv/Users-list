import { Post } from '../../types/post'
import { User } from '../../types/user'

export interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
  expandedUsers: number[]
}
export interface PostsState {
  postsByUser: { [userId: number]: Post[] }
  loading: boolean
  error: string | null
}
