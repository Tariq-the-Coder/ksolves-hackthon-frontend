import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthApi } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';  // Import AuthContext to get user details
import AddUnitForm from './AddUnitForm';
import AddSessionForm from './AddSessionForm';
import { Card, Container, Button, Spinner, Alert } from 'react-bootstrap';

const ClassDetail = () => {
  const { id } = useParams();  // Get class ID from URL
  const { user } = useContext(AuthContext);  // Get the logged-in user from AuthContext
  const [classDetail, setClassDetail] = useState(null);  // Store class data
  const [error, setError] = useState(null);  // For error handling
  const [loading, setLoading] = useState(true);  // To show loading spinner

  const { getClassById, addUnit, addSession } = useAuthApi();

  // Fetch class details when component mounts
  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const response = await getClassById(id);
        setClassDetail(response.data);  // Store the fetched class data
      } catch (err) {
        setError('Error fetching class details');
      } finally {
        setLoading(false);  // Hide loading spinner after data is fetched
      }
    };

    fetchClassDetail();
  }, [id]);

  // Handler for adding a new unit
  const handleAddUnit = async (unitTitle) => {
    try {
      await addUnit(id, { title: unitTitle });  // Call the API to add a unit
      const response = await getClassById(id);  // Re-fetch the updated class data
      setClassDetail(response.data);  // Update state with new class data
    } catch (err) {
      setError('Error adding unit');
    }
  };

  // Handler for adding a new session to a specific unit
  const handleAddSession = async (unitId, sessionTitle) => {
    try {
      await addSession(id, unitId, { title: sessionTitle });  // Call the API to add a session to the unit
      const response = await getClassById(id);  // Re-fetch the updated class data
      setClassDetail(response.data);  // Update state with new class data
    } catch (err) {
      setError('Error adding session');
    }
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">.</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;  // Display error message if there is one
  }

  if (!classDetail) {
    return <Alert variant="info">No class details available.</Alert>;  // Display message when class details are not available
  }

  return (
    <Container>
      <h1 className="my-4">{classDetail.name}</h1>

      {/* Only show Add Unit form if user is an instructor */}
      {user.role === 'instructor' && (
        <Card className="mb-4">
          <Card.Header>
            <h4>Add a New Unit</h4>
          </Card.Header>
          <Card.Body>
            <AddUnitForm onAddUnit={handleAddUnit} />  {/* This form will call handleAddUnit when a unit is added */}
          </Card.Body>
        </Card>
      )}

      {/* Display Units and Sessions */}
      {classDetail.units.map((unit) => (
        <Card key={unit._id} className="mb-4">
          <Card.Header>
            <h2>{unit.title}</h2>
          </Card.Header>
          <Card.Body>
            {/* Only show Add Session form if user is an instructor */}
            {user.role === 'instructor' && (
              <div className="mb-3">
                <h5>Add a New Session to {unit.title}</h5>
                <AddSessionForm
                  onAddSession={(sessionTitle) => handleAddSession(unit._id, sessionTitle)}
                />
              </div>
            )}

            {/* Display Sessions within the Unit */}
            {unit.sessions.length > 0 ? (
              unit.sessions.map((session) => (
                <Card key={session._id} className="my-3">
                  <Card.Header>
                    <h5>{session.title}</h5>
                  </Card.Header>
                  <Card.Body>
                    {/* Display Lectures within the Session */}
                    {session.lectures.map((lecture) => (
                      <p key={lecture._id}>
                        <strong>{lecture.title}:</strong> {lecture.content}
                      </p>
                    ))}
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No sessions available for this unit.</p>
            )}
          </Card.Body>
        </Card>
      ))}

      {/* Alert if no units are available */}
      {classDetail.units.length === 0 && <Alert variant="warning">No units available for this class.</Alert>}
    </Container>
  );
};

export default ClassDetail;
