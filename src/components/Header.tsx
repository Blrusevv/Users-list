import React from 'react'
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <BootstrapNavbar.Brand href="/">Redux App</BootstrapNavbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Users
          </Nav.Link>

          <Nav.Link as={Link} to="/tasks">
            Tasks
          </Nav.Link>
        </Nav>
      </Container>
    </BootstrapNavbar>
  )
}

export default Header
