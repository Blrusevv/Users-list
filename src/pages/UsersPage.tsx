import React, { useEffect } from 'react'
import { UserCard } from '../components'
import { fetchUsersAsync } from '../store/slices/usersSlice'
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks'

const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { users, loading, error } = useAppSelector((state) => state.users)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsersAsync())
    }
  }, [dispatch, users.length])

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading users...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="users-page">
      <Row>
        <Col>
          <div className="page-header mb-4">
            <h1 className="page-title">Users Management</h1>
          </div>

          {users.length === 0 ? (
            <Alert variant="info">
              <Alert.Heading>No Users Found</Alert.Heading>
              <p>There are no users to display at this time.</p>
            </Alert>
          ) : (
            <div className="users-list">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default UsersPage
