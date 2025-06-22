import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Header } from '../components'

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <Header />
      <Container fluid className="py-4">
        <Outlet />
      </Container>
    </div>
  )
}

export default MainLayout
