import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";


const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      {/* <Nav>
        <Link to="/">Home</Link>
        {user && <Link to="/classes">Classes</Link>}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/auth">Login / Register</Link>
        )}
      </Nav> */}
      <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link className="nav-link" to={"/"}>
              Home
            </Link>
            <Link className="nav-link" to={"/Aboutus"}>
              About Us
            </Link>
            <Link className="nav-link" to={"/Contactus"}>
              Contact Us
            </Link>
            {user && <Link to="/classes">Classes</Link>}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/auth">Login / Register</Link>
        )}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  );
};

export default Header;