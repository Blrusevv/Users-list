import { User } from '../../types/user'

export interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
  expandedUsers: number[]
}
