import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Accordion,
  Card,
  Tab
} from 'react-bootstrap';
import Cars from './cars/Cars';
import Drivers from './drivers/Drivers';
import '../css/Hero.css';

const Hero = () => {
  const texts = [
    "Book Professional Drivers",
    "Hire Trusted Car Rentals",
    "Get Experienced Chauffeurs",
    "On-Demand Driving Services"
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [activeKey, setActiveKey] = useState(null); // Set to null initially
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 450);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 450);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAccordionChange = (key) => {
    // Toggle the accordion open and close
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <>
      {/* Hero Section  fo desktop*/}
      {isDesktop ? (
        // ✅ Desktop Layout
        <Container fluid className="d-flex align-items-center ">
          <Container>
            <Row className="align-items-center">
              <Col className="text-center text-md-start mb-4 mb-md-0">
                <h1 className="fw-bold display-5 mb-3 hero-heading">
                  Drive Your Journey<br /> with Ease
                </h1>
                <p className="fs-4 text-muted mb-3">
                  {texts[currentTextIndex]}
                </p>
                <Button variant="dark" size="lg" className="rounded-pill">
                  Book Now
                </Button>
              </Col>
              <Col className="d-flex justify-content-center">
                <img
                  src="/home/hero.png"
                  alt="Car Service"
                  className="img-fluid"
                  style={{ width: '90%', transform: 'scaleX(-1)' }}
                />
              </Col>
            </Row>
          </Container>
        </Container>
      ) : (
        <div className="p-4 rounded  hero-card">
          <div style={{display:"flex"}}>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
           
            <p className=" text-muted mb-3">
              {texts[currentTextIndex]}
            </p>
            <Button variant="dark" size="sm" className="rounded-pill">
              Book Now
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src="/home/hero.png"
              alt="Car Service"
              className="img-fluid user-image"
              style={{
                width: '100%',
                maxWidth: '300px',
                transform: 'scaleX(-1)',
              }}
            />
          </div>
          </div>
        </div>
      )}

      {/* Tabs for Cars and Drivers */}
      <Container >
        <Tab.Container defaultActiveKey="drivers">
          <Nav variant="tabs" className="justify-content-center mb-1">
            <Nav.Item>
              <Nav.Link eventKey="drivers" className="text-capitalize">Drivers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="cars" className="text-capitalize">Cars</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="drivers">
              <Drivers />
            </Tab.Pane>
            <Tab.Pane eventKey="cars">
              <Cars />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>

      <Container className="py-5">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>How do I book a driver?</Accordion.Header>
            <Accordion.Body>
              To book a driver, simply select the driver from the list and click the "Book Now" button.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What are the payment options?</Accordion.Header>
            <Accordion.Body>
              We accept credit cards, PayPal, and bank transfers.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Can I choose my preferred driver?</Accordion.Header>
            <Accordion.Body>
              Yes, you can choose based on profiles and ratings.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Do you offer long-term rentals?</Accordion.Header>
            <Accordion.Body>
              Yes, please contact our support team for long-term deals.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

    </>
  );
};

export default Hero;
