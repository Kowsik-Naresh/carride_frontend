import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Tab,
  Nav,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import { FaCarSide, FaInfoCircle } from 'react-icons/fa';
import { StarFill } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import UserRegistrationForm from '../user/UserRegistrationForm';
import '../../css/cars/CarDetails.css';
import NavB from '../NavB';

const CarDetails = ({ user }) => {
  const { state } = useLocation();
  const car = state?.car;

  const [activeTab, setActiveTab] = useState('info');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState({ reviewText: '' });
  const [reviews, setReviews] = useState(car?.reviews || []);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

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
      alert('Please provide a rating and review.');
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
    setShowReviewModal(false);
  };

  if (!car) {
    return (
      <Container className="text-center py-5">
        <h4>No car data found.</h4>
      </Container>
    );
  }

  return (
    <>
      <NavB />
      <Container className="py-2">

        <Row className="align-items-start mb-2">
          <Col md={4} sm={12} className="text-center ">
            <img
              src={car?.image || 'placeholder.jpg'}
              alt={car?.model}
              className="car-image"
            />
            <div className="car-model-brand">

              <span className="text-muted">{car?.brand || 'Brand not available'}</span>
            </div>


            <div className="d-flex justify-content-center gap-4 mb-4">
              <Button variant="primary">Book Car Now</Button>
              <Button
                variant="outline-primary"
                onClick={() => setShowReviewModal(true)}
              >
                Feedback
              </Button>
              <Button variant="primary">Book With Driver</Button>
            </div>

          </Col>

          <Col md={8} sm={12}>
            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>

              <Row>
                <Col md={12}>
                  <Nav variant="tabs" className="custom-nav-tabs justify-content-center mb-4">
                    <Nav.Item><Nav.Link eventKey="info">Info</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="reviews">Reviews</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="tripHistory">Trip History</Nav.Link></Nav.Item>
                  </Nav>
                </Col>
              </Row>


              <Tab.Content>
                <Tab.Pane eventKey="info">
                  <div className="info-card p-4">
                    <h5 className="section-title mb-4">
                      <FaInfoCircle className="text-info me-2" /> Car Information
                    </h5>

                    <p className="car-description mb-4">
                      {car?.description || 'No description available.'}
                    </p>

                    <Row>
                      <Col xs={12} md={6} className="mb-3">
                        <div className="info-row">
                          <div className="info-label">Seats:</div>
                          <div className="info-value">{car?.seats ?? '-'}</div>
                        </div>
                      </Col>
                      <Col xs={12} md={6} className="mb-3">
                        <div className="info-row">
                          <div className="info-label">Fuel Type:</div>
                          <div className="info-value">{car?.fuelType ?? '-'}</div>
                        </div>
                      </Col>
                      <Col xs={12} md={6} className="mb-3">
                        <div className="info-row">
                          <div className="info-label">Transmission:</div>
                          <div className="info-value">{car?.transmission ?? '-'}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="reviews">
                  <h5>All Reviews</h5>
                  {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                  ) : (
                    reviews.map((review) => (
                      <div
                        key={review.reviewId}
                        className="border rounded p-3 mb-3"
                        style={{ background: '#f9f9f9' }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <div
                            className="rounded-circle text-white d-flex justify-content-center align-items-center me-3"
                            style={{
                              backgroundColor: getAvatarColor(
                                review.userName.charAt(0)
                              ),
                              width: 40,
                              height: 40,
                              fontSize: 18,
                              fontWeight: 'bold',
                            }}
                          >
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <strong>{review.userName}</strong>
                            <div>
                              {[...Array(5)].map((_, i) => (
                                <StarFill
                                  key={i}
                                  color={i < review.rating ? '#ffc107' : '#ddd'}
                                  size={16}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="mb-0">{review.reviewText}</p>
                      </div>
                    ))
                  )}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>

      {/* Review Submission Modal */}
      <Modal
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <StarFill
                key={i}
                onClick={() => handleStarClick(i)}
                color={i < rating ? '#ffc107' : '#ddd'}
                size={24}
                style={{ cursor: 'pointer', marginRight: 5 }}
              />
            ))}
          </div>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your review..."
            value={feedback.reviewText}
            onChange={handleInputChange}
          />
          <Button
            className="mt-3"
            onClick={handleSubmitReview}
            variant="primary"
            block="true"
          >
            Submit Review
          </Button>
        </Modal.Body>
      </Modal>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
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
