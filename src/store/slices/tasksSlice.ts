import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchTasks, updateTask } from '../../services/api'
import { Task } from '../../types/task'
import { TasksState } from './interfaces'

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    title: '',
    user: '',
  },
  currentPage: 1,
  itemsPerPage: 10,
}

export const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetchTasks()
  return response.data
})

export const toggleTaskAsync = createAsyncThunk('tasks/toggleTask', async (task: Task) => {
  const updatedTask = { ...task, completed: !task.completed }
  const response = await updateTask(updatedTask)
  return response.data
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ key: keyof TasksState['filters']; value: string }>
    ) => {
      state.filters[action.payload.key] = action.payload.value as any
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch tasks'
      })
      .addCase(toggleTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
  },
})

export const { setFilter, setCurrentPage } = tasksSlice.actions
export default tasksSlice.reducer
