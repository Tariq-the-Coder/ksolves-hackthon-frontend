import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
// import { createClass } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuthApi } from '../services/api';

const InstructorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(false);
  const { createClass } = useAuthApi();
  const [alert, setAlert] = useState({
    message: '',
    variant: '',
    value: false,
  });
  const navigate = useNavigate();

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createClass(className, user.instructorId);
      setAlert({
        message: 'Class created successfully',
        variant: 'success',
        value: true,
      });
      setClassName('');
      navigate('/classes');
    } catch (error) {
      setAlert({
        message: error.response?.data || 'An error occurred',
        variant: 'danger',
        value: true,
      });
    }
    setLoading(false);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Create a New Class</h2>
      {alert.value && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ value: false })}
          dismissible
        >
          <Alert.Heading>{alert.message}</Alert.Heading>
        </Alert>
      )}
      <Form onSubmit={handleCreateClass}>
        <Form.Group controlId="formClassName">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter class name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </Form.Group>
        <Row className="mt-3">
          <Col>
            {loading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <Button type="submit" variant="primary">
                Create Class
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default InstructorDashboard;
