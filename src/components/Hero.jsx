import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Accordion,
  Tab
} from 'react-bootstrap';
import Cars from './cars/Cars';
import Drivers from './drivers/Drivers';
import '../css/Hero.css';

const cards = [
  {
    id: 1,
    heading: 'Drive Your Journey with Ease',
    title: 'Book Your Driver Now',
    button: 'Book Driver',
    color: '#1E3A8A',
    image: '/home/hero.png'
  },
  {
    id: 2,
    heading: 'Find Reliable Cars Instantly',
    title: 'Trusted Cars for Rent',
    button: 'Reserve Car',
    color: '#9109b0',
    image: '/driving-job.png'
  },
  {
    id: 3,
    heading: 'Master Driving Professionally',
    title: 'Join Driving School',
    button: 'Register Now',
    color: '#6881f2',
    image: '/driving_school.png'
  },
  {
    id: 4,
    heading: 'Earn as You Drive',
    title: 'Drive and Earn Daily',
    button: 'Apply Now',
    color: '#7C3AED',
    image: '/driving-job.png'
  },
];


const Hero = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 450);
  const [index, setIndex] = useState(0);
  const startX = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 450);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(autoSlide);
  }, []);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) {
      setIndex((prev) => (prev + 1) % cards.length);
    } else if (diff < -50) {
      setIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
  };

  return (
    <>
      {isDesktop ? (
        <Container fluid className="d-flex align-items-center position-relative desktop-hero">
          <Button
  className="arrow-btn left-arrow"
  onClick={() => setIndex((prev) => (prev - 1 + cards.length) % cards.length)}
>
  &lt;
</Button>

          <Container>
            <Row className="align-items-center">
              <Col className="text-center text-md-start mb-4 mb-md-0 md-5">
               <h1 className="fw-bold display-5 mb-3 hero-heading">
  {cards[index].heading}
</h1>

                <p className="fs-4 text-muted mb-3 animated-text">
                  {cards[index].title}
                </p>
                <Button
                  style={{ backgroundColor: cards[index].color, border: 'none' }}
                  size="lg"
                  className="rounded-pill"
                >
                  {cards[index].button}
                </Button>
              </Col>
              <Col className="d-flex justify-content-center">
                <img
                  src={cards[index].image}
                  alt="Car Service"
                  className="img-fluid fade-slide"
                  style={{ width: '90%', transform: 'scaleX(-1)' }}
                />
              </Col>
            </Row>
            <div className="dot-indicators-desktop mt-4 d-flex justify-content-center w-100">
  {cards.map((_, i) => (
    <span
      key={i}
      className={`dot ${index === i ? 'active' : ''}`}
      onClick={() => setIndex(i)}
    ></span>
  ))}
</div>

          </Container>

          <Button
           
            className="arrow-btn right-arrow"
            onClick={() => setIndex((prev) => (prev + 1) % cards.length)}
          >
            &gt;
          </Button>
        </Container>
      ) : (
        <div className="slider-container">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="card-content fade-slide"
          >
            <div className="text-content">
              <p className="slide-title animated-text">{cards[index].title}</p>
              <button
                className="book-btn"
                style={{ backgroundColor: cards[index].color }}
              >
                {cards[index].button}
              </button>
            </div>
            <div className="image-content">
              <img
                src={cards[index].image}
                alt="Service"
                className="fade-slide"
                style={{ transform: 'scaleX(-1)' }}
              />
            </div>
          </div>

          <div className="dot-indicators">
            {cards.map((_, i) => (
              <span
                key={i}
                className={`dot ${index === i ? 'active' : ''}`}
              ></span>
            ))}
          </div>
        </div>
      )}

      <Container>
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

      <Container className="faq-container py-5">
  <h2>Frequently Asked Questions</h2>
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
