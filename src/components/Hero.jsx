import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Nav, Accordion, Card } from 'react-bootstrap';
import Cars from './cars/Cars';
import Drivers from './drivers/Drivers';

const Hero = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("drivers");

  const navItems = ["drivers", "cars"];

  const texts = [
    "Book Professional Drivers",
    "Hire Trusted Car Rentals",
    "Get Experienced Chauffeurs",
    "On-Demand Driving Services"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Container fluid className="py-5 bg-white min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="align-items-center">
            {/* Text Column */}
            <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0">
              <h1 className="fw-bold display-5 mb-3" style={{ marginTop: '-30px' }}>
                Drive Your Journey <br /> with Ease
              </h1>
              <p className="fs-4 text-muted mb-4" style={{ marginTop: '-20px' }}>
                {texts[currentTextIndex]}
              </p>
              <Button variant="dark" size="lg" className="rounded-pill">
                Book Now
              </Button>
            </Col>

            {/* Image Column */}
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <img
                src="/home/hero.png"
                alt="Car Service"
                className="img-fluid"
                style={{ 
                  width: '90%', 
                  marginTop: '-50px', 
                  transform: 'scaleX(-1)'  // Mirror effect applied here
                }}
              />
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Navigation Tabs */}
      <Nav variant="tabs" className="justify-content-center mb-4 mt-n4">
        {navItems.map((item) => (
          <Nav.Item key={item}>
            <Nav.Link
              active={selectedNavItem === item}
              onClick={() => setSelectedNavItem(item)}
              className="text-capitalize fw-semibold"
            >
              {item}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Dynamic Content */}
      <Container>
        {selectedNavItem === "cars" ? <Cars /> : <Drivers />}
      </Container>

      {/* Pricing Section */}
      <Container className="py-5">
  <h2 className="text-center mb-4">Our Pricing Plans (Based on Kilometers)</h2>
  <Row className="text-center">
    {/* Basic Plan */}
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h3>Basic</h3>
          <p className="fs-4 mb-4">₹20 / Km</p>
          <div className="pricing-features">
            <div className="feature-item">
              <h5>Standard Vehicle</h5>
              <p>4 Persons Capacity</p>
            </div>
            <div className="feature-item">
            <h5>Fuel & Toll Included</h5>
              <p>Up to 50 km</p>
            </div>
          </div>
          <Button variant="dark" className="rounded-pill">Book Now</Button>
        </Card.Body>
      </Card>
    </Col>

    {/* Premium Plan */}
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h3>Premium</h3>
          <p className="fs-4 mb-4">₹30 / Km</p>
          <div className="pricing-features">
            <div className="feature-item">
              <h5>Luxury Vehicle</h5>
              
              <p>7 Persons Capacity</p>
            </div>
            <div className="feature-item">
              <h5>Fuel & Toll Included</h5>
              <p>Up to 100 km</p>
            </div>
          </div>
          <Button variant="dark" className="rounded-pill">Book Now</Button>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

      {/* FAQ Section */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Header>How do I book a driver?</Accordion.Header>
            <Accordion.Body>
              To book a driver, simply select the driver from the list and click the "Book Now" button. You'll be prompted to fill out a registration form.
            </Accordion.Body>
          </Card>
          <Card>
            <Accordion.Header>What are the payment options?</Accordion.Header>
            <Accordion.Body>
              We accept various payment options including credit cards, PayPal, and bank transfers.
            </Accordion.Body>
          </Card>
          <Card>
            <Accordion.Header>Can I choose my preferred driver?</Accordion.Header>
            <Accordion.Body>
              Yes, you can choose your preferred driver based on their profiles and ratings.
            </Accordion.Body>
          </Card>
          <Card>
            <Accordion.Header>Do you offer long-term rentals?</Accordion.Header>
            <Accordion.Body>
              Yes, we offer both short-term and long-term rental options. Please contact our support team for details.
            </Accordion.Body>
          </Card>
        </Accordion>
      </Container>
    </>
  );
};

export default Hero;
