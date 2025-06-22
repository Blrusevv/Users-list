import { User } from '../../types/user'

export interface UserCardProps {
  user: User
}

export interface UserFormData {
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
  }
  phone?: string
  website?: string
  company?: {
    name?: string
  }
}
