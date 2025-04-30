import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Nav, Card } from 'react-bootstrap';
import { FaStar, FaCarSide } from 'react-icons/fa';
import "../../css/DriversDetails.css";
import NavB from '../NavB';

const DriverDetail = () => {
  const { driverId } = useParams();
  const [driver, setDriver] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("reviews");

  useEffect(() => {
    axios
      .get(`http://192.168.1.111:8080/drivers/getDriverById?driverId=${driverId}`)
      .then((res) => {
        setDriver(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching driver data", err);
      });
  }, [driverId]);

  if (!driver) {
    return (
      <Container className="py-5">
        <h3 className="text-center text-danger">Loading driver details...</h3>
      </Container>
    );
  }

  const visibleTestimonials = driver.testimonials ? [
    driver.testimonials[(currentIndex - 1 + driver.testimonials.length) % driver.testimonials.length],
    driver.testimonials[currentIndex],
    driver.testimonials[(currentIndex + 1) % driver.testimonials.length],
  ] : [];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % driver.testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + driver.testimonials.length) % driver.testimonials.length);
  };

  return (
    <div>
      <NavB />

      <Container className="py-5">
        <Row className="align-items-center mb-5">
          <Col md={5} className="mb-4">
          <img
  src={driver.profileImage}
  alt={driver.driverName}
  className="img-fluid rounded shadow-lg driver-profile-image"
/>

          </Col>
          <Col md={7}>
            <h2 className="fw-bold mb-3 text-primary">{driver.driverName}</h2>
            <p className="text-muted fs-5">{driver.bio || "No bio available."}</p>
            <div className="mt-4">
              <h5 className="fw-semibold text-dark">📞 Contact Information</h5>
              <p><strong>Phone:</strong> {driver.mobileNumber}</p>
              <Button variant="success" className="rounded-pill px-4 mt-2" onClick={() => alert(`Contacting ${driver.driverName}`)}>
                Contact Driver
              </Button>
            </div>
          </Col>
        </Row>

        <Nav variant="tabs" className="justify-content-center mb-4">
          <Nav.Item>
            <Nav.Link active={selectedTab === "reviews"} onClick={() => setSelectedTab("reviews")}>
              Reviews
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={selectedTab === "tripHistory"} onClick={() => setSelectedTab("tripHistory")}>
              Driver Trip History
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {selectedTab === "reviews" && driver.testimonials && (
          <div>
            <h4 className="mb-4 text-primary text-center">What People Are Saying</h4>
            <Row className="justify-content-center gap-4">
              {visibleTestimonials.length > 0 && visibleTestimonials.map((testimonial, index) => {
                const isCenter = index === 1;
                return (
                  <Col
                    key={index}
                    md={3}
                    className={`p-3 rounded text-center testimonial-card transition ${isCenter ? 'active bg-primary text-white scale-lg' : 'bg-light text-muted'}`}
                  >
                    <p className={`fs-6 ${isCenter ? 'text-white' : 'text-muted'}`}>"{testimonial.text}"</p>
                    <div className="mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          color={i < testimonial.stars ? "#FFD700" : isCenter ? "#ccc" : "#999"}
                          style={{ fontSize: "18px", margin: "0 2px" }}
                        />
                      ))}
                    </div>
                    <h6 className={`fw-bold ${isCenter ? 'text-white' : 'text-dark'}`}>{testimonial.name}</h6>
                  </Col>
                );
              })}
            </Row>
            <div className="text-center mt-5">
              <button className="mx-2" onClick={handlePrev} style={{ transform: 'scaleX(-1)' }}>
                <FaCarSide size={30} />
              </button>
              <button className="mx-2" onClick={handleNext}>
                <FaCarSide size={30} />
              </button>
            </div>
          </div>
        )}

        {selectedTab === "tripHistory" && driver.tripHistory && (
          <div>
            <h4 className="mb-4 text-primary text-center">Driver's Trip History</h4>
            <Row>
              {driver.tripHistory.map((trip, index) => (
                <Col key={index} md={4} className="mb-3">
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      <h5 className="fw-bold">{trip.route}</h5>
                      <p className="text-muted">{trip.date}</p>
                      <img src={trip.photo} alt={trip.route} className="img-fluid rounded mb-3" style={{ height: '200px', objectFit: 'cover' }} />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default DriverDetail;
