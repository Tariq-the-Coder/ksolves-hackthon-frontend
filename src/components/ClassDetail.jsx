import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthApi } from '../services/api';
import { Alert } from 'react-bootstrap';

const ClassDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [error, setError] = useState(null);
  const { getClassById } = useAuthApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const response = await getClassById(id);
        setClassDetail(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError('You are not enrolled in this class');
          navigate('/classes'); // Redirect to classes page
        } else {
          setError('Error fetching class details');
        }
      }
    };

    fetchClassDetail();
  }, []);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      {classDetail ? (
        <div>
          <h1>{classDetail.name}</h1>
          {/* Add more class detail information here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClassDetail;
