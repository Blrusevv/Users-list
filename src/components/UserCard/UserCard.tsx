import React, { useState } from 'react'
import { Card, Button, Collapse, ButtonGroup, Row, Col, Form } from 'react-bootstrap'
import { User } from '../../types/user'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../utils/validations'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { toggleUserExpansion, updateUserAsync } from '../../store/slices/usersSlice'
import InputField from '../InputField'
import { getFieldError } from '../../utils/getFieldError'
import { UserCardProps, UserFormData } from './interfaces'
import { formFields } from './data'
import { ChevronDown, ChevronUp, User as UserIcon, Mail, Eye } from 'lucide-react'

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { expandedUsers } = useSelector((state: RootState) => state.users)
  const navigate = useNavigate()

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user.username,
      email: user.email,
      address: {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
      },
      phone: user.phone,
      website: user.website,
      company: {
        name: user.company.name,
      },
    },
  })

  const watchedValues = watch()

  React.useEffect(() => {
    const hasChanged =
      watchedValues.username !== user.username ||
      watchedValues.email !== user.email ||
      watchedValues.address.street !== user.address.street ||
      watchedValues.address.suite !== user.address.suite ||
      watchedValues.address.city !== user.address.city

    setHasChanges(hasChanged)
  }, [watchedValues, user])

  const isExpanded = expandedUsers.includes(user.id)

  const handleToggleExpansion = () => {
    dispatch(toggleUserExpansion(user.id))
  }

  const handleViewPosts = () => {
    navigate(`/users/${user.id}`)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
    setHasChanges(false)
  }

  const handleSave = async (data: UserFormData) => {
    const updatedUser: User = {
      ...user,
      username: data.username,
      email: data.email,
      address: {
        ...user.address,
      },
    }

    await dispatch(updateUserAsync(updatedUser))
    setIsEditing(false)
    setHasChanges(false)
  }

  return (
    <Card className="user-card">
      <Card.Header className="user-card-header" onClick={handleToggleExpansion}>
        <div className="user-basic-info">
          <div className="user-avatar">
            <UserIcon size={24} />
          </div>
          <div className="user-details">
            <h5 className="user-name">{user.name}</h5>

            <p className="user-email">
              <Mail size={16} className="me-1" />
              {user.email}
            </p>
          </div>
        </div>
        <div className="expand-icon">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </Card.Header>

      <Collapse in={isExpanded}>
        <Card.Body>
          <Form onSubmit={handleSubmit(handleSave)}>
            <Row>
              {formFields.map(({ name, label }) => (
                <Col md={6} key={name}>
                  <InputField
                    name={name}
                    label={label}
                    readOnly={!isEditing}
                    control={control}
                    error={getFieldError(errors, name)}
                  />
                </Col>
              ))}
            </Row>

            <div className="d-flex justify-content-between align-items-center">
              <Button
                variant="outline-primary"
                onClick={handleViewPosts}
                className="d-flex align-items-center"
              >
                <Eye size={16} className="me-1" />
                See Posts
              </Button>

              <ButtonGroup>
                {!isEditing ? (
                  <Button variant="primary" onClick={handleEdit}>
                    Edit
                  </Button>
                ) : (
                  <React.Fragment>
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="success" type="submit" disabled={!hasChanges}>
                      Save
                    </Button>
                  </React.Fragment>
                )}
              </ButtonGroup>
            </div>
          </Form>
        </Card.Body>
      </Collapse>
    </Card>
  )
}

export default UserCard
