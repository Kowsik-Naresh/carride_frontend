import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Nav,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import { FaCarSide, FaInfoCircle } from 'react-icons/fa';
import { StarFill } from 'react-bootstrap-icons';
import UserRegistrationForm from '../user/UserRegistrationForm';

const CarDetails = ({ car = {}, user }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState({ reviewText: '' });
  const [reviews, setReviews] = useState(car?.reviews || []);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Assign a color for avatar circle based on first letter
  const getAvatarColor = (char) => {
    const colors = ['#6f42c1', '#d63384', '#0d6efd', '#fd7e14', '#198754'];
    const code = char.charCodeAt(0);
    return colors[code % colors.length];
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleInputChange = (e) => {
    setFeedback({ ...feedback, reviewText: e.target.value });
  };

  const handleSubmitReview = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (rating === 0 || feedback.reviewText.trim() === '') {
      alert('Please provide a rating and write a review.');
      return;
    }
    const newReview = {
      reviewId: Date.now(),
      userName: user.name,
      rating,
      reviewText: feedback.reviewText,
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setFeedback({ reviewText: '' });
  };

  return (
    <>
      <Container className="my-4">
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src={car?.image || 'placeholder.jpg'}
                alt={car?.model || 'Car image'}
              />
              <Card.Body>
                <Card.Title>{car?.model || 'Model not available'}</Card.Title>
                <Card.Text>{car?.brand || 'Brand not available'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Tab.Container
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
            >
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link eventKey="info">
                    <FaCarSide /> Car Info
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="reviews">
                    <FaInfoCircle /> Reviews
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="info">
                  <p>{car?.description || 'Description not available'}</p>
                  <ul>
                    <li>
                      <strong>Seats:</strong> {car?.seats ?? '-'}
                    </li>
                    <li>
                      <strong>Fuel Type:</strong> {car?.fuelType ?? '-'}
                    </li>
                    <li>
                      <strong>Transmission:</strong> {car?.transmission ?? '-'}
                    </li>
                  </ul>
                </Tab.Pane>

                <Tab.Pane eventKey="reviews">
                  <div className="mb-4">
                    <h5>Submit Your Review</h5>
                    <div className="d-flex align-items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarFill
                          key={i}
                          onClick={() => handleStarClick(i)}
                          color={i < rating ? '#ffc107' : '#ddd'}
                          size={24}
                          style={{ cursor: 'pointer', marginRight: 5 }}
                          aria-label={`${i + 1} star`}
                          role="button"
                        />
                      ))}
                    </div>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write your review here..."
                      value={feedback.reviewText}
                      onChange={handleInputChange}
                    />
                    <Button
                      className="mt-2"
                      onClick={handleSubmitReview}
                      variant="primary"
                    >
                      Submit Review
                    </Button>
                  </div>

                  <div>
                    <h5>All Reviews</h5>
                    {reviews.length === 0 && <p>No reviews yet.</p>}
                    {reviews.map((review) => (
                      <Card key={review.reviewId} className="mb-3">
                        <Card.Body className="d-flex">
                          <div
                            className="rounded-circle d-flex justify-content-center align-items-center text-white me-3"
                            style={{
                              backgroundColor: getAvatarColor(
                                review.userName.charAt(0)
                              ),
                              width: 50,
                              height: 50,
                              fontSize: 24,
                              fontWeight: 'bold',
                              userSelect: 'none',
                            }}
                          >
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div>
                              {[...Array(5)].map((_, i) => (
                                <StarFill
                                  key={i}
                                  color={i < review.rating ? '#ffc107' : '#ddd'}
                                  size={16}
                                />
                              ))}
                            </div>
                            <p className="mb-1">
                              <strong>{review.userName}</strong>
                            </p>
                            <p>{review.reviewText}</p>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please log in to submit a review.</p>
          <UserRegistrationForm Success={() => setShowLoginModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CarDetails;
