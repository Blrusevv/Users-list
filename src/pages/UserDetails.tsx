import { ArrowLeft } from 'lucide-react'
import React, { useEffect } from 'react'
import { Container, Spinner, Alert, Button, Row, Col } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchUsersAsync } from '../store/slices/usersSlice'
import { fetchPostsAsync } from '../store/slices/postsSlice'
import { UserCard } from '../components'
import PostsList from '../components/PostsList/PostsList'
import { useAppDispatch, useAppSelector } from '../hooks'

const UserDetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { users, loading: usersLoading } = useAppSelector((state) => state.users)
  const {
    postsByUser,
    loading: postsLoading,
    error: postsError,
  } = useAppSelector((state) => state.posts || {})

  const userIdNum = userId ? parseInt(userId, 10) : null
  const user = userIdNum ? users.find((u) => u.id === userIdNum) : null
  const userPosts = userIdNum ? postsByUser[userIdNum] || [] : []

  useEffect(() => {
    if (userIdNum) {
      if (users.length === 0) {
        dispatch(fetchUsersAsync())
      }

      if (!postsByUser[userIdNum]) {
        dispatch(fetchPostsAsync(userIdNum))
      }
    }
  }, [userIdNum, dispatch, users.length, postsByUser])

  const handleBackToUsers = () => {
    navigate('/')
  }

  if (usersLoading || postsLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading user details and posts...</p>
      </Container>
    )
  }

  if (!user) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <Alert.Heading>User Not Found</Alert.Heading>
          <p>The requested user could not be found.</p>
          <Button variant="outline-secondary" onClick={handleBackToUsers}>
            <ArrowLeft size={16} className="me-1" />
            Back to Users
          </Button>
        </Alert>
      </Container>
    )
  }

  if (postsError) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{postsError}</p>
        </Alert>
      </Container>
    )
  }

  if (!user || !postsByUser[userIdNum as number]) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading user details and posts...</p>
      </Container>
    )
  }

  return (
    <Container className="user-posts-page">
      <Row>
        <Col>
          <div className="page-header">
            <Button
              variant="outline-secondary"
              onClick={handleBackToUsers}
              className="mb-3 d-flex align-items-center"
            >
              <ArrowLeft size={16} className="me-1" />
              Back to Users
            </Button>
            <h1 className="page-title">User Details & Posts</h1>
          </div>

          <UserCard user={user} />
          <PostsList posts={userPosts} />
        </Col>
      </Row>
    </Container>
  )
}

export default UserDetailsPage
