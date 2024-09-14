import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Home.css'; // Import your CSS file
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container">
      <Container>
        {/* Hero Section */}
        <Row className="hero-section text-center">
          <Col>
            <h1>Welcome to Virtual Classroom</h1>
            <p>Your ultimate solution for online learning and teaching.</p>
            {/* <Link to="/auth">Login / Register</Link> */}
           <Link to="/auth">
           <Button variant="primary">
           Get Started
           </Button>
           </Link> 
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="features-section text-center">
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Interactive Classes</Card.Title>
                <Card.Text>
                  Experience live and interactive classes with real-time engagement.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Manage Content</Card.Title>
                <Card.Text>
                  Easily manage your course materials, lectures, and assignments.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Discussion Forums</Card.Title>
                <Card.Text>
                  Engage in rich discussions with nested comments on lectures.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* About Section */}
        <Row className="about-section text-center">
          <Col>
            <h2>About Us</h2>
            <p>
              Virtual Classroom provides a comprehensive platform for instructors and students
              to connect and collaborate in an online environment. Our features are designed
              to enhance the learning experience and facilitate effective teaching.
            </p>
          </Col>
        </Row>

        {/* Footer Section */}
        <Row className="footer-section text-center">
          <Col>
            <p>&copy; {new Date().getFullYear()} Virtual Classroom. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
