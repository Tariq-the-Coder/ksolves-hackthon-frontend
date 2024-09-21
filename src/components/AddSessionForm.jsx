import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddSessionForm = ({ onAddSession }) => {
  const [sessionTitle, setSessionTitle] = useState(''); // Local state to store the session title

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload
    if (sessionTitle.trim()) {
      onAddSession(sessionTitle); // Call the parent handler with the session title
      setSessionTitle(''); // Clear the input after adding
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="sessionTitle">
        <Form.Label>Session Title</Form.Label>
        <Form.Control
          type="text"
          value={sessionTitle}
          onChange={(e) => setSessionTitle(e.target.value)} // Update state as user types
          placeholder="Enter session title (e.g., Chapter 1)"
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Add Session
      </Button>
    </Form>
  );
};

export default AddSessionForm;
