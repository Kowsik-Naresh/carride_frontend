import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const cars = ["c1.jpeg", "c.jpeg", "c1.jpeg", "c.jpeg"]; // Same array for now

const CarDetails = () => {
  const { id } = useParams();
  const carIndex = parseInt(id, 10);
  const navigate = useNavigate();

  if (carIndex >= cars.length || carIndex < 0) {
    return <h4 className="text-center mt-5">Car Not Found</h4>;
  }

  return (
    <Container className="py-5 text-center">
      <h2>Details for Car {carIndex + 1}</h2>
      <img src={cars[carIndex]} alt={`Car ${carIndex + 1}`} className="img-fluid rounded shadow my-4" />
      <p className="text-muted">High-performance car with comfortable features and reliable mileage.</p>
      <Button variant="secondary" onClick={() => navigate(-1)}>🔙 Go Back</Button>
    </Container>
  );
};

export default CarDetails;
