import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { getClasses, joinClass } from '../services/api';

const ClassEnrollment = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', variant: '', value: false });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.role === 'student') {
      fetchClasses();
    }
  }, [user.role]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await getClasses();
      setClasses(response.data);
    } catch (error) {
      setAlert({ message: 'Failed to load classes', variant: 'danger', value: true });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClass = async () => {
    try {
      setLoading(true);
      await joinClass(selectedClass);
      setAlert({ message: 'Joined class successfully', variant: 'success', value: true });
    } catch (error) {
      setAlert({ message: 'Failed to join class', variant: 'danger', value: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {alert.value && (
        <Alert variant={alert.variant} onClose={() => setAlert({ value: false })} dismissible>
          <Alert.Heading>{alert.message}</Alert.Heading>
        </Alert>
      )}
      <h2 className="text-center mb-4">Enroll in a Class</h2>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Form>
          <Form.Group controlId="formClassSelection">
            <Form.Label>Select Class</Form.Label>
            <Form.Control
              as="select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
            >
              <option value="">Select a class</option>
              {classes.map((classItem) => (
                <option key={classItem._id} value={classItem._id}>
                  {classItem.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Row className="text-center">
            <Col>
              <Button type="button" onClick={handleJoinClass} className="btn btn-primary">
                Join Class
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Container>
  );
};

export default ClassEnrollment;
