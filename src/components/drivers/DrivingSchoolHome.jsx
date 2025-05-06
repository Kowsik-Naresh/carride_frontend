import React, { useState } from 'react';
import { Container, Button, Row, Col, Form, Modal } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';

const DrivingSchoolHome = () => {
  const reviews = [
    {
      name: 'Amit Sharma',
      text: 'The instructors were very patient and professional. I passed my test on the first try!',
      rating: 4,
    },
    {
      name: 'Priya Desai',
      text: 'Modern cars and flexible class timings. Highly recommend for beginners.',
      rating: 4,
    },
    {
      name: 'Rahul Verma',
      text: 'Very supportive staff and thorough driving lessons. A great experience overall!',
      rating: 4,
    },
  ];

  const getAvatarColor = (letter) => {
    const colors = {
      A: '#FF5733', B: '#33C1FF', C: '#33FF99', D: '#FF33A6',
      E: '#FFB733', F: '#A633FF', G: '#33FFDD', H: '#FF3366',
      I: '#33D1FF', J: '#77DD77', K: '#FFAA33', L: '#9B59B6',
      M: '#2ECC71', N: '#3498DB', O: '#E67E22', P: '#1ABC9C',
      Q: '#34495E', R: '#E74C3C', S: '#95A5A6', T: '#D35400',
      U: '#C0392B', V: '#7F8C8D', W: '#16A085', X: '#8E44AD',
      Y: '#27AE60', Z: '#2980B9'
    };
    return colors[letter.toUpperCase()] || '#888';
  };

  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleSubmit = () => {
    alert(`Review: ${reviewText}\nRating: ${rating} Stars`);
    setShow(false);
  };

  const handleStarColors = (index) => {
    setRating(index + 1)

  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
        <img
          src="/driving_school.jpg"
          alt="Driving School"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 2,
          }}
        />
        <Container
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            position: 'relative',
            zIndex: 3,
            height: '100%',
            color: '#f1f1f1',
            textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
          }}
        >
          <h1 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
            Welcome to Krishna Driving School
          </h1>
          <p className="lead mb-4" style={{ fontSize: '1.2rem' }}>
            Learn safe, confident driving with certified instructors.
          </p>
          <Button
            variant="outline-light"
            size="lg"
            style={{ borderRadius: '25px', padding: '10px 30px' }}
          >
            Enroll Now
          </Button>
        </Container>
      </div>

      {/* Learner Reviews Section */}
      <Container className="py-5">
        <h2 className="text-center mb-4 text-primary">What Our Learners Say</h2>
        <Button
          variant="warning"
          className="text-white fw-semibold px-4 py-2 rounded-pill shadow mb-3"
          onClick={handleShow}
        >
          💬 Give Us Feedback
        </Button>
        <Row>{reviews.map((review, idx) => {
          const firstLetter = review.name.charAt(0);
          const avatarColor = getAvatarColor(firstLetter);
          const hasImage = !!review.profileImage;

          return (
            <Col md={12} key={idx} className="p-0">
              <Row
                className="align-items-center px-3 py-3 border-bottom bg-white"
                style={{
                  position: 'relative',
                }}
              >
                {/* Profile image and name */}
                <Col xs={12} md={3} className="d-flex align-items-center gap-3">
                  {hasImage ? (
                    <img
                      src={review.profileImage}
                      alt={review.name}
                      width={50}
                      height={50}
                      className="rounded-circle"
                    />
                  ) : (
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        backgroundColor: avatarColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '18px',
                      }}
                    >
                      {firstLetter.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="mb-0 fw-semibold text-dark">{review.name}</h6>
                      <img
                        src="/verified.png"
                        alt="Verified"
                        width={16}
                        height={16}
                        title="Verified Learner"
                      />
                    </div>
                    <div className="d-flex gap-1 mt-1">
                      {[...Array(5)].map((_, index) => (
                        <StarFill
                          key={index}
                          color={index < review.rating ? '#FFD700' : '#D3D3D3'}
                          size={15}
                        />
                      ))}
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={9}>
                  <p className="text-muted mb-0 text-start">{review.text}</p>
                </Col>
              </Row>
            </Col>
          );
        })}

        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Review Text */}
            <Form.Group controlId="reviewText">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
              />
            </Form.Group>

            <div className="d-flex gap-1 mt-1 mt-2">
              {[...Array(5)].map((_, index) => (
                <StarFill
                  key={index}
                  color={index < rating ? '#FFD700' : '#D3D3D3'}
                  size={30}
                  onClick={() => handleStarColors(index)}
                />
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DrivingSchoolHome;
