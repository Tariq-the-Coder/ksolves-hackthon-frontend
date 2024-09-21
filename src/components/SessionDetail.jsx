import React, { useEffect, useState } from 'react';
import { useAuthApi } from '../services/api';
import AddLectureForm from './AddLectureForm';
import { Card } from 'react-bootstrap';

const SessionDetail = ({ sessionId }) => {
  const { getLectures } = useAuthApi();
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      const response = await getLectures(sessionId);
      setLectures(response.data);
    };
    fetchLectures();
  }, [sessionId]);

  const handleLectureAdded = async () => {
    const response = await getLectures(sessionId);
    setLectures(response.data);
  };

  return (
    <Card>
      <Card.Body>
        <h5>Lectures</h5>
        <AddLectureForm sessionId={sessionId} onLectureAdded={handleLectureAdded} />
        {lectures.map((lecture) => (
          <div key={lecture._id}>
            <h6>{lecture.title}</h6>
            <p>{lecture.content}</p>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default SessionDetail;
