import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const UserLayout: React.FC = () => {
  return (
    <div className="user-layout">
      <Container fluid className="py-4">
        <Outlet />
      </Container>
    </div>
  )
}

export default UserLayout
