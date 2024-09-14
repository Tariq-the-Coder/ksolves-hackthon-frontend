import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getInstructorIdByUsername, createClass, getClasses } from '../services/api';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
  const [className, setClassName] = useState('');
  const [instructorId, setInstructorId] = useState(null);
  const [classes, setClasses] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth'); // Redirect to login if no user is logged in
      return;
    }

    // Fetch instructor ID
    const fetchInstructorId = async () => {
      try {
        const id = await getInstructorIdByUsername(user.username);
        if (id) {
          setInstructorId(id);
        } else {
          console.error('Instructor ID not found');
        }
      } catch (error) {
        console.error('Error fetching instructor ID:', error);
      }
    };

    fetchInstructorId();
    loadClasses(); // Load classes on component mount
  }, [user, navigate]);

  const loadClasses = async () => {
    try {
      const response = await getClasses();
      setClasses(response.data); // Adjust based on the response structure
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleCreateClass = async () => {
    if (!instructorId) {
      console.error('Instructor ID is missing');
      return;
    }

    try {
      await createClass(className, instructorId);
      setClassName(''); // Clear the input
      loadClasses(); // Reload classes after creation
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <div>
      <h2>Instructor Dashboard</h2>
      <div>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Enter class name"
        />
        <button onClick={handleCreateClass}>Create Class</button>
      </div>
      <div>
        <h3>Classes</h3>
        <ul>
          {classes.map((cls) => (
            <li key={cls._id}>{cls.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstructorDashboard;
