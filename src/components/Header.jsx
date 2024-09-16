import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <header>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Ksolves</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/Aboutus">About Us</Nav.Link>
              <Nav.Link as={Link} to="/Contactus">Contact Us</Nav.Link>
              {user && <Nav.Link as={Link} to="/classes">Classes</Nav.Link>}
              {user && user.role === 'instructor' && (
                <Nav.Link as={Link} to="/instructor-dashboard">Instructor Dashboard</Nav.Link>
              )}
            </Nav>
            <Nav>
              {user ? (
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              ) : (
                <Nav.Link as={Link} to="/auth">Login / Register</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
