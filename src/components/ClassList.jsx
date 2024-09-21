import React, { useEffect, useState, useContext } from 'react';
import { useAuthApi } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { Container, Card, Button, Row, Col, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useContext(AuthContext);
  const { getClasses, enrollInClass, deleteClass } = useAuthApi();  // Added deleteClass

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await getClasses();
        setClasses(data);  // Set classes with enrollment status
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error fetching classes.';
        setError(errorMessage);
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleEnroll = async (classId) => {
    try {
      const response = await enrollInClass(classId);
      setSuccess(response.data.message || 'Successfully enrolled in the class.');
      const { data } = await getClasses();
      setClasses(data);  // Update the class list after enrollment
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to enroll in the class.';
      setError(errorMessage);
      console.error('Error enrolling in class:', error);
    }
  };

  const handleDelete = async (classId) => {
    try {
      await deleteClass(classId);  // Call delete API
      setSuccess('Class deleted successfully.');

      // Update the list by removing the deleted class
      setClasses((prevClasses) => prevClasses.filter((cls) => cls._id !== classId));
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete the class.';
      setError(errorMessage);
      console.error('Error deleting class:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Classes</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Row>
        {classes.map((cls) => (
          <Col key={cls._id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {cls.name}{' '}
                  {cls.isEnrolled && (
                    <Badge variant="success" className="ml-2">
                      Enrolled
                    </Badge>
                  )}
                </Card.Title>

                <Card.Text>
                  {/* Show buttons based on user role and enrollment status */}
                  {user && user.role === 'student' && (
                    cls.isEnrolled ? (
                      <>
                        {/* Show "View Class" button for enrolled students */}
                        <Link to={`/classes/${cls._id}`} className="btn btn-outline-primary">
                          View Class
                        </Link>
                      </>
                    ) : (
                      <Button variant="primary" onClick={() => handleEnroll(cls._id)}>
                        Enroll
                      </Button>
                    )
                  )}

                  {/* Allow instructors to view and delete class */}
                  {user && user.role === 'instructor' && (
                    <>
                      <Link to={`/classes/${cls._id}`} className="btn btn-outline-primary">
                        View Class
                      </Link>
                      <Button variant="danger" className="ml-2" onClick={() => handleDelete(cls._id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ClassList;
