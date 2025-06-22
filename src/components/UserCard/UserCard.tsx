import React, { useState, useEffect } from 'react'
import { Card, Button, Collapse, Row, Col, Form } from 'react-bootstrap'
import { User } from '../../types/user'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toggleUserExpansion, updateUserAsync } from '../../store/slices/usersSlice'
import InputField from '../InputField'
import { getFieldError } from '../../utils/getFieldError'
import { UserCardProps, UserFormData } from './interfaces'
import { formFields } from './data'
import { ChevronDown, ChevronUp, User as UserIcon, Mail, Eye } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { userSchema } from '../../utils/validations'

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [hasChanges, setHasChanges] = useState(false)
  const dispatch = useAppDispatch()
  const { expandedUsers } = useAppSelector((state) => state.users)
  const navigate = useNavigate()
  const location = useLocation()

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
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

  useEffect(() => {
    const hasChanged =
      watchedValues.username !== user.username ||
      watchedValues.email !== user.email ||
      watchedValues.address.street !== user.address.street ||
      watchedValues.address.suite !== user.address.suite ||
      watchedValues.address.city !== user.address.city

    setHasChanges(hasChanged)
  }, [watchedValues, user])

  const isExpanded = expandedUsers.includes(user.id)

  const isUserDetails = location.pathname.includes('/users')

  const handleToggleExpansion = () => {
    dispatch(toggleUserExpansion(user.id))
  }

  const handleViewPosts = () => {
    navigate(`/users/${user.id}`)
  }

  const handleCancel = () => {
    reset()
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
                    disabled={!isExpanded}
                    control={control}
                    error={getFieldError(errors, name)}
                  />
                </Col>
              ))}
            </Row>

            <div className="d-flex justify-content-between align-items-center">
              {!isUserDetails ? (
                <Button
                  variant="outline-primary"
                  onClick={handleViewPosts}
                  className="d-flex align-items-center"
                >
                  <Eye size={16} className="me-1" />
                  See Posts
                </Button>
              ) : (
                <div />
              )}

              <div className="btn-actions">
                <Button variant="secondary" onClick={handleCancel} disabled={!hasChanges}>
                  Cancel
                </Button>
                <Button variant="success" type="submit" disabled={!hasChanges}>
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Collapse>
    </Card>
  )
}

export default UserCard
