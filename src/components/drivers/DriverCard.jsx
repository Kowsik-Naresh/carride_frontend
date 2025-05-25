import React from 'react';
import '../../css/DriverCard.css';
import { FaStar } from 'react-icons/fa';
import { StarFill } from 'react-bootstrap-icons';

import { Card } from 'react-bootstrap'
import '../../css/drivers.css'
const DriverCard = ({ image,name,experience,rating }) => {


  return (
    <Card className="h-100 border-0 shadow-sm rounded-4 card-hover">
      <Card.Img
        variant="top"
        src={image}
        alt={name}
        className="driver-card-img"
        style={{ cursor: 'pointer' }}
      />
      <Card.Body className="d-flex flex-column p-3">
        <p className="fw-bold text-dark mb-1 text-start name" title={name}  style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          {name}
        </p>

        {experience !== -1 && (
  <p
    className="text-secondary mb-1 text-start"
    style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}
    title={`Experience: ${experience} yrs`}
  >
    Experience: {experience} yrs
  </p>
)}



        <div className="d-flex   mb-2 flex-start"  style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          <span className="text-secondary me-2">Rating:</span>
          {[...Array(5)].map((_, index) => (
            <StarFill
              key={index}
              color={index < rating ? '#FFD700' : '#d5d5d5'}
              size={18}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DriverCard;
