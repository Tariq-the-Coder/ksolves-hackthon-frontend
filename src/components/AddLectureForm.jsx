import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuthApi } from '../services/api';

const AddLectureForm = ({ sessionId, onLectureAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { createLecture } = useAuthApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLecture(sessionId, { title, content });
    onLectureAdded(); // Callback to fetch updated lectures
    setTitle('');
    setContent('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Add Lecture</Button>
    </Form>
  );
};

export default AddLectureForm;
