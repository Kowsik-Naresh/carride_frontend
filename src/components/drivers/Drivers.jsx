import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.111:8080/drivers/allDrivers')
      .then((response) => {
        setDrivers(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching drivers:', error);
      });
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Our Professional Drivers</h2>
      <Row>
        {drivers.map((driver, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <Card className="shadow-sm h-100 d-flex flex-column">
              <Card.Img
                variant="top"
                src={driver.profileImage} // <- Base64 image
                alt={driver.driverName}
                style={{
                  maxWidth: '100%',  // Ensures it fits within the parent container
                  height: 'auto',  // Maintains aspect ratio
                  maxHeight: '300px', // Limits the height to avoid oversized images
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{driver.driverName}</Card.Title>
                <p className="text-muted flex-grow-1">Experience: {driver.experience} yrs</p>
                <div className="mt-auto">
                  <Link to={`/drivers/${driver.driverId}`}>
                    <Button variant="dark" className="rounded-pill" size="lg">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Drivers;
