import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPostsByUserId, updatePost, deletePost } from '../../services/api'
import { PostsState } from './interfaces'
import { Post } from '../../types/post'

const initialState: PostsState = {
  postsByUser: {},
  loading: false,
  error: null,
}

export const fetchPostsAsync = createAsyncThunk('posts/fetchPosts', async (userId: number) => {
  const response = await fetchPostsByUserId(userId)
  return { userId, posts: response.data }
})

export const updatePostAsync = createAsyncThunk('posts/updatePost', async (post: Post) => {
  const response = await updatePost(post)
  return response.data
})

export const deletePostAsync = createAsyncThunk('posts/deletePost', async (postId: number) => {
  await deletePost(postId)
  return postId
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.loading = false
        state.postsByUser[action.payload.userId] = action.payload.posts
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch posts'
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        const post = action.payload
        const userPosts = state.postsByUser[post.userId]
        if (userPosts) {
          const index = userPosts.findIndex((p) => p.id === post.id)
          if (index !== -1) {
            userPosts[index] = post
          }
        }
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        const postId = action.payload
        Object.keys(state.postsByUser).forEach((userId) => {
          const userIdNum = parseInt(userId)
          state.postsByUser[userIdNum] = state.postsByUser[userIdNum].filter(
            (post) => post.id !== postId
          )
        })
      })
  },
})

export default postsSlice.reducer
