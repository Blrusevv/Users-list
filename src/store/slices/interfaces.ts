import { Post } from '../../types/post'
import { Task } from '../../types/task'
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

export interface TasksState {
  tasks: Task[]
  loading: boolean
  error: string | null
  filters: {
    status: Status
    title: string
    user: string
  }
  currentPage: number
  itemsPerPage: number
}

export type Status = 'all' | 'completed' | 'incomplete'
