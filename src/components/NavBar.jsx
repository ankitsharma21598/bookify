import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link ><Link to={'/'}>Home</Link></Nav.Link>
            <Nav.Link ><Link to={'/book/list'}>Add Listing</Link></Nav.Link>
            <Nav.Link ><Link to={'/book/orders'}>Orders</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

  )
}

export default NavBar