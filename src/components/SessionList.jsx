import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthApi } from '../services/api';
import CommentList from './CommentList';

const SessionList = () => {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);
  const { getSessions } = useAuthApi();


  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await getSessions(id);
        setSessions(data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, [id]);

  return (
    <div>
      <h1>Sessions</h1>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            {session.title}
            <CommentList sessionId={session._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;
