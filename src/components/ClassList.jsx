import React, { useEffect, useState } from 'react';
import { getClasses } from '../services/api';
import { Link } from 'react-router-dom';

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await getClasses();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h1>Classes</h1>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>
            <Link to={`/classes/${cls._id}`}>{cls.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
