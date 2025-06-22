import React, { useState } from 'react'
import { Card, Button, Collapse, ButtonGroup } from 'react-bootstrap'
import { User } from '../types/user'
import { useNavigate } from 'react-router-dom'

interface UserCardProps {
  user: User
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleViewPosts = () => {
    navigate(`/users/${user.id}`)
  }

  return (
    <Card className="user-card">
      <Card.Header className="user-card-header" onClick={handleToggleExpand}>
        <div className="user-basic-info">
          <div className="user-details">
            <h5 className="user-name">{user.name}</h5>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
      </Card.Header>

      <Collapse in={isExpanded}>
        <Card.Body>
          <p>{user.name}</p>

          <p>{user.email}</p>

          <p>{user.address.street}</p>

          <p>{user.address.suite}</p>

          <p>{user.address.city}</p>

          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="outline-primary"
              onClick={handleViewPosts}
              className="d-flex align-items-center"
            >
              See Posts
            </Button>

            <ButtonGroup>
              <Button variant="primary" onClick={() => {}}>
                Edit
              </Button>
            </ButtonGroup>
          </div>
        </Card.Body>
      </Collapse>
    </Card>
  )
}

export default UserCard
