import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClassById, getUnits } from '../services/api';
import UnitList from './UnitList';

const ClassDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState({});
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const { data } = await getClassById(id);
        setClassDetail(data);
        const unitData = await getUnits(id);
        setUnits(unitData.data);
      } catch (error) {
        console.error('Error fetching class detail:', error);
      }
    };

    fetchClassDetail();
  }, [id]);

  return (
    <div>
      <h1>{classDetail.name}</h1>
      <UnitList units={units} />
    </div>
  );
};

export default ClassDetail;
