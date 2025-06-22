import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { UsersState } from './interfaces'
import { fetchUsers, updateUser } from '../../services/api'
import { User } from '../../types/user'

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  expandedUsers: [],
}

export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetchUsers()
  return response.data
})

export const updateUserAsync = createAsyncThunk('users/updateUser', async (user: User) => {
  const response = await updateUser(user)
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleUserExpansion: (state, action: PayloadAction<number>) => {
      const userId = action.payload
      if (state.expandedUsers.includes(userId)) {
        state.expandedUsers = state.expandedUsers.filter((id) => id !== userId)
      } else {
        state.expandedUsers.push(userId)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
  },
})

export const { toggleUserExpansion } = usersSlice.actions
export default usersSlice.reducer
