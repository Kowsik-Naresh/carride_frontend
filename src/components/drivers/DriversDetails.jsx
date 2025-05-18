import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Card,
  Tab,
  Modal,
  Form,
} from 'react-bootstrap';
import { FaStar, FaCarSide, FaInfoCircle } from 'react-icons/fa';
import { BsStarFill as StarFill } from 'react-icons/bs';
import '../../css/DriversDetails.css';
import NavB from '../NavB';
import LoadingPanel from '../../predefind/LoadingPanel';
import appInitData from '../../required/appInitData.json';
import Notification from '../../predefind/Notification';
import UserRegistrationForm from '../user/UserRegistrationForm';

const getAvatarColor = (letter) => {
  const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1'];
  const index = letter.toUpperCase().charCodeAt(0) % colors.length;
  return colors[index];
};

const DriverDetail = () => {
  const { driverId } = useParams();
  const intDriverId = parseInt(driverId, 10);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [revieweduserId, setRevieweduserId] = useState(-1);
  const [notification, setNotification] = useState(null);
  const [feedback, setFeedback] = useState({
    revieweduserId,
    reviewRating: rating,
    reviewText: '',
    reviewedDriverId: parseInt(driverId, 10),
  });
   const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      setRevieweduserId(user.userId);
      setFeedback((prev) => ({ ...prev, revieweduserId: user.userId }));
    }
  }, []);

  const handleStarColors = (index) => {
    setRating(index + 1);
    setFeedback((prev) => ({ ...prev, reviewRating: index + 1 }));
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    axios
      .get(`${appInitData.springUrl}/drivers/getDriverById?driverId=${intDriverId}`)
      .then((res) => {
        setDriver(res.data.data.driverBean);
        setReviews(res.data.data.reviewBean || []);
        setRating(res.data.data.driverRating);
        setLoading(false);
      })
      .catch((err) => {
        setNotification({
          status: 'failure',
          message: 'Failed to fetch driver and reviews. Please try again.',
        });
        console.error('Error fetching driver data', err);
        setLoading(false);
      });
  }, [intDriverId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(localStorage.getItem("user")){
      axios
      .post(`${appInitData.springUrl}/review/saveReview`, feedback)
      .then(() => {
        setNotification({
          status: 'success',
          message: 'Reviewed saved successfully.',
        });
      })
      .catch((err) => {
        setNotification({
          status: 'failure',
          message: 'Failed to save.',
        });
        console.log('error' + err);
      });
    handleClose();
    }
    else{

       setNotification({
          status: 'failure',
          message: ' Please Login',
        });

setShowModal(true)


    }
  };

  return (
    <div>
      <NavB />
      {notification && (
        <Notification requirements={notification} onClose={() => setNotification(null)} />
      )}
      {loading ? (
        <div style={{ width: '100vw', height: '90vh' }}>
          <LoadingPanel />
        </div>
      ) : (
        <Container className="py-5">
          <Row className="align-items-start mb-4">
            <Col md={4} sm={12} className="text-center driver-card">
              <img
                src={driver.profileImage}
                alt={driver.driverName}
                className="driver-profile-image shadow mb-3"
              />
              <h2 className="fw-semibold text-dark mb-3">{driver.driverName}</h2>
              <div className="d-flex justify-content-center gap-4">
                <Button variant="outline-primary" onClick={handleShow}>Feedback</Button>
                <Button id="booknow" onClick={handleShow}>Book Now</Button>
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

                <Row>
                  <Col>
                    <Tab.Content>
                      <Tab.Pane eventKey="info">
                        <div className="info-card p-4 rounded-4">
                          <h5 className="section-title mb-4">
                            <FaInfoCircle className="text-info me-2" /> Additional Driver Info
                          </h5>
                          <Row>
                            <Col className='mx-5' >
                              <p className="d-flex align-items-center">
                                <strong className='me-2'>Experience:</strong>
                                <span>{driver.experience || 'N/A'} years</span>
                              </p>

                              <p className="d-flex align-items-center">
                                <strong className='me-2'>Rating:</strong>
                                <span>
                                  {[...Array(5)].map((_, index) => (
                                    <StarFill
                                      key={index}
                                      color={index < rating ? '#FFD700' : '#d5d5d5'}
                                      size={18}
                                    />
                                  ))}
                                </span>
                              </p>

                              <p className="d-flex align-items-center">
                                <strong className='me-2'>Age:</strong>
                                <span>{calculateAge(driver.dateOfBirth)}</span>
                              </p>

                            </Col>
                            <Col md={6} className="mb-3">
                              <p><strong>License Image:</strong></p>
                              {driver.licenseImage ? (
                                <img
                                  src={driver.licenseImage}
                                  alt="License"
                                  className="img-fluid license-image rounded-3 shadow"
                                />
                              ) : (
                                <p className="text-muted fst-italic">Not Available</p>
                              )}
                            </Col>
                          </Row>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="reviews">
                        {reviews.length === 0 ? (
                          <Card className="mb-4">
                            <Card.Body>
                              <Card.Title><FaStar className="text-warning me-2" />Reviews</Card.Title>
                              <p className="text-muted">No reviews available yet.</p>
                            </Card.Body>
                          </Card>
                        ) : (
                          <>
                            <Row>
                              {(showAllReviews ? reviews : reviews.slice(0, 5)).map((review, idx) => {
                                const firstLetter = review.userName?.charAt(0) || 'U';
                                const avatarColor = getAvatarColor(firstLetter);
                                const hasImage = !!review.userProfileImage;
                                return (
                                  <Col md={12} key={idx} className="p-0">
                                    <Row className="align-items-center px-3 py-3 border-bottom bg-white">
                                      <Col xs={12} md={3} className="d-flex align-items-center gap-3">
                                        {hasImage ? (
                                          <img
                                            src={review.userProfileImage}
                                            alt={review.userName}
                                            width={50}
                                            height={50}
                                            className="rounded-circle"
                                          />
                                        ) : (
                                          <div style={{
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
                                          }}>{firstLetter.toUpperCase()}</div>
                                        )}
                                        <div>
                                          <div className="d-flex align-items-center gap-2">
                                            <h6 className="mb-0 fw-semibold text-dark">{review.userName}</h6>
                                            <img src="/verified.png" alt="Verified" width={16} height={16} title="Verified User" />
                                          </div>
                                          <div className="d-flex gap-1 mt-1">
                                            {[...Array(5)].map((_, index) => (
                                              <StarFill
                                                key={index}
                                                color={index < review.reviewBean.reviewRating ? '#FFD700' : '#D3D3D3'}
                                                size={15}
                                              />
                                            ))}
                                          </div>
                                        </div>
                                      </Col>
                                      <Col className='review-text'>
                                        <p className="text-muted mb-0 text-start">{review.reviewBean.reviewText}</p>
                                      </Col>
                                    </Row>
                                  </Col>
                                );
                              })}
                            </Row>

                            {reviews.length > 5 && (
                              <div className="text-center mt-3">
                                <Button
                                  variant="link"
                                  onClick={() => setShowAllReviews(!showAllReviews)}
                                >
                                  {showAllReviews ? 'View Less' : 'View More'}
                                </Button>
                              </div>
                            )}
                          </>
                        )}
                      </Tab.Pane>


                      <Tab.Pane eventKey="tripHistory">
                        <Card className="mb-4">
                          <Card.Body>
                            <Card.Title><FaCarSide className="me-2" />Trip History</Card.Title>
                            <p className="text-muted">Trip history feature coming soon.</p>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Rate and Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <div className="d-flex gap-2">
                    {[...Array(5)].map((_, index) => (
                      <StarFill
                        key={index}
                        color={index < rating ? '#FFD700' : '#d5d5d5'}
                        size={25}
                        onClick={() => handleStarColors(index)}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="reviewText"
                    value={feedback.reviewText}
                    onChange={handleChange}
                    placeholder="Share your experience..."
                    required
                  />
                </Form.Group>
                <div className="text-end">
                  <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                  <Button type="submit" variant="primary">Submit</Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserRegistrationForm />
        </Modal.Body>
      </Modal>
        </Container>
      )}
    </div>
  );
};
const calculateAge = (dob) => {
  if (!dob) return 'N/A';
  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  const days = today.getDate() - birthDate.getDate();
  if (days < 0) {
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }
  if (years < 0) return 'N/A';

  return `${years} year(s)`;
};



export default DriverDetail;
