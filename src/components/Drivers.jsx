import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Drivers = () => {
  const drivers = ["d.webp", "d.webp", "d.webp", "d.webp"];

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Our Drivers</h2>
      <Row>
        {drivers.map((driver, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Img variant="top" src={driver} alt={`driver-${index}`} style={{ height: '250px', objectFit: 'cover' }} />
              <Card.Body className="text-center">
                <Card.Title>Driver {index + 1}</Card.Title>
                <Card.Text>Professional & Experienced</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Drivers;
