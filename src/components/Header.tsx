import { CheckSquare, Users } from 'lucide-react'
import React from 'react'
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <BootstrapNavbar.Brand href="/">
          <Users className="me-2" size={24} />
          Redux App
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <Users className="me-1" size={18} />
              Users
            </Nav.Link>

            <Nav.Link as={Link} to="/tasks">
              <CheckSquare className="me-1" size={18} />
              Tasks
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Header
