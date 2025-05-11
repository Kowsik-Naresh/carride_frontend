import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../../css/rentcar.css';

const Rentwithdriver = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0 rounded-4 rent-card">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1619641044065-fd2f44e1f6ef"
              className="rounded-top rent-img"
            />
            <Card.Body>
              <h2 className="fw-bold text-primary">SUV with Driver</h2>
              <p className="text-muted">
                Book a comfortable SUV with a professional driver. Ideal for outstation travel, business trips, and airport pickups.
              </p>
              <h4 className="text-success">₹3,500 / day (Driver Included)</h4>
              <Button variant="success" size="lg" className="mt-4 w-100 rounded-pill">
                Rent with Driver
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Rentwithdriver;
