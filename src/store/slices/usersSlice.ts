import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UsersState } from './interfaces'
import { fetchUsers } from '../../services/api'

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

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
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
  },
})

export default usersSlice.reducer
