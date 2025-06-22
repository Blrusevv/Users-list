import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UserCard } from '../components'
import { fetchUsersAsync } from '../store/slices/usersSlice'
import { RootState, AppDispatch } from '../store/store'

const UsersPage: React.FC = () => {
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

export default UsersPage
