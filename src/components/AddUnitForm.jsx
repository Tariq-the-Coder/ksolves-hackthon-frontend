import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddUnitForm = ({ onAddUnit }) => {
  const [unitTitle, setUnitTitle] = useState(''); // Local state to store the unit title

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload
    if (unitTitle.trim()) {
      onAddUnit(unitTitle); // Call the parent handler with the unit title
      setUnitTitle(''); // Clear the input after adding
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="unitTitle">
        <Form.Label>Unit Title</Form.Label>
        <Form.Control
          type="text"
          value={unitTitle}
          onChange={(e) => setUnitTitle(e.target.value)} // Update state as user types
          placeholder="Enter unit title (e.g., Book 1)"
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Add Unit
      </Button>
    </Form>
  );
};

export default AddUnitForm;
