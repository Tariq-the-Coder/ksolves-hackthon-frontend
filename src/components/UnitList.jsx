import React from 'react';
import { Link } from 'react-router-dom';

const UnitList = ({ units }) => (
  <div>
    <h2>Units</h2>
    <ul>
      {units.map((unit) => (
        <li key={unit._id}>
          <Link to={`/units/${unit._id}`}>{unit.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default UnitList;
