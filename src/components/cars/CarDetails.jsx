import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL parameters
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch car data from the backend
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/cars/${id}`);
        
        if (!response.ok) {
          throw new Error('Car not found');
        }

        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-5">{error}</div>;
  }

  if (!car) {
    return <div className="text-center py-5">Car not found.</div>;
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <img
            src={car.carPhoto}
            alt={car.carName}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <h2 className="mb-3">{car.carName}</h2>
          <p><strong>Owner Name:</strong> {car.ownerName}</p>
          <p><strong>Contact:</strong> {car.ownerContact}</p>
          <p><strong>Location:</strong> {car.location}</p>
          <p><strong>Price Per Day:</strong> ₹{car.pricePerDay}</p>
          <p><strong>Seating Capacity:</strong> {car.seatingCapacity}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Car Number:</strong> {car.carNumber}</p>

          <div className="d-grid gap-2 mt-4">
            <Button variant="success" size="lg">
              Proceed to Booking
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetails;
