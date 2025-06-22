import { useEffect } from 'react'
import UserCard from './components/UserCard'
import { AppDispatch, RootState } from './store/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersAsync } from './store/slices/usersSlice'

function App() {
  const { users } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUsersAsync())
  }, [])

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default App
