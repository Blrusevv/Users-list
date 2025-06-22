import { Post } from '../../types/post'

export interface PostFormData {
  title: string
  body: string
}

export interface PostsListProps {
  posts: Post[]
}
