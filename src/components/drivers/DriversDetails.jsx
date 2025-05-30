import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Card,
  Tab,
  Tabs,
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
  const [showImageModal, setShowImageModal] = useState(false);
  const handleImageClick = () => setShowImageModal(true);
  const handleImageClose = () => setShowImageModal(false);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('registeredUser'));
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



const [showBookingModal, setShowBookingModal] = useState(false);
const handleBookingShow = () => setShowBookingModal(true);
const handleBookingClose = () => setShowBookingModal(false);


const initAutocomplete = () => {
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    console.error("Google Maps Places library not loaded.");
    return;
  }

  const pickupInput = document.getElementById("pickupLocation");
  const dropInput = document.getElementById("dropLocation");

  if (pickupInput) {
    new window.google.maps.places.Autocomplete(pickupInput, {
      types: ['geocode'], // You can also use ['establishment'] or ['(cities)']
    });
  }

  if (dropInput) {
    new window.google.maps.places.Autocomplete(dropInput, {
      types: ['geocode'],
    });
  }
};



useEffect(() => {
  if (showBookingModal) {
    initAutocomplete();
  }
}, [showBookingModal]);




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
    if (localStorage.getItem('registeredUser')) {
      axios
        .post(`${appInitData.springUrl}/reviews/saveReview`, feedback)
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
    } else {
      setNotification({
        status: 'failure',
        message: 'Please Login',
      });
      setShowModal(true);
    }
  };

const [bookingData, setBookingData] = useState({
  pickupLocation: '',
  dropLocation: '',
});

const handleBookingChange = (e) => {
  const { name, value } = e.target;
  setBookingData(prev => ({ ...prev, [name]: value }));
};

const handleBookingSubmit = (e) => {
  e.preventDefault();
  // Your booking logic here, e.g., call API to save booking
  console.log('Booking submitted:', bookingData);

  // Close the modal after submission
  setShowBookingModal(false);

  // Optionally, show a success notification
  setNotification({
    status: 'success',
    message: 'Booking successful!',
  });
};


  return (
    <div className='driver-page'>
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
            <Col md={4} sm={12} >
              <img
                src={driver.profileImage}
                alt={driver.driverName}
                className="driver-profile-image"
                style={{ cursor: 'pointer' }}
              />
              <h2 className="fw-semibold text-dark mb-3">{driver.driverName}</h2>
              <div className="d-flex justify-content-center gap-4">
                <Button variant="outline-primary" onClick={handleShow}>Feedback</Button>
               <Button id="booknow" onClick={handleBookingShow}>Book Now</Button>


              </div>
            </Col>

            <Col md={8} sm={12}>
              

     

      <Row>
        <Col>
        <Tabs
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k) } fill>
          <Tab eventKey="info" title="Info">
              <div className="info-card p-4">
                <h5 className="section-title mb-4">
                  <FaInfoCircle className="text-info me-2" /> Additional Driver Info
                </h5>
                <Row>
                  <Col className="mx-5">
                    <p>
                      <strong className="me-2">Experience:</strong>
                      {driver.experience || 'N/A'} years
                    </p>
                    <p>
                      <strong className="me-2">Rating:</strong>
                      {[...Array(5)].map((_, index) => (
                        <StarFill
                          key={index}
                          color={index < rating ? '#FFD700' : '#d5d5d5'}
                          size={18}
                        />
                      ))}
                    </p>
                    <p>
                      <strong className="me-2">Age:</strong>
                      {calculateAge(driver.dateOfBirth)}
                    </p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p><strong>License Image:</strong></p>
                    {driver.licenseImage ? (
                      <img
                        src={driver.licenseImage}
                        alt="License"
                        className="img-fluid license-image rounded-3 shadow"
                        onClick={handleImageClick}
                      />
                    ) : (
                      <p className="text-muted fst-italic">Not Available</p>
                    )}
                  </Col>
                </Row>
              </div>
            </Tab>

            <Tab eventKey="reviews" title="reviews">
              {reviews.length === 0 ? (
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>
                      <FaStar className="text-warning me-2" />Reviews
                    </Card.Title>
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
                                  <h6 className="mb-0 fw-semibold text-dark">{review.userName}</h6>
                                  <img src="/verified.png" alt="Verified" width={16} height={16} />
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
                            <Col className="review-text">
                              <p className="text-muted mb-0 text-start">{review.reviewBean.reviewText}</p>
                            </Col>
                          </Row>
                        </Col>
                      );
                    })}
                  </Row>
                  {reviews.length > 5 && (
                    <div className="text-center mt-3">
                      <Button variant="link" onClick={() => setShowAllReviews(!showAllReviews)}>
                        {showAllReviews ? 'View Less' : 'View More'}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Tab>

            <Tab eventKey="tripHistory" title="tripHistory">
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title><FaCarSide className="me-2" />Trip History</Card.Title>
                  <p className="text-muted">Trip history feature coming soon.</p>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
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

                    <Modal show={showBookingModal} onHide={handleBookingClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Book Driver</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleBookingSubmit}>  {/* <-- add submit handler */}
      <Form.Group controlId="pickupLocation">
        <Form.Label>Pickup Location</Form.Label>
        <Form.Control type="text" placeholder="Enter pickup location" id="pickupLocation" onChange={handleBookingChange} />
      </Form.Group>

      <Form.Group controlId="dropLocation" className="mt-3">
        <Form.Label>Drop Location</Form.Label>
        <Form.Control type="text" placeholder="Enter drop location" id="dropLocation" onChange={handleBookingChange} />
      </Form.Group>

      <div className="mt-3 text-end">
        <Button variant="secondary" onClick={handleBookingClose} className="me-2">Cancel</Button>
        <Button type="submit" variant="primary">Confirm Booking</Button>
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
          <Modal show={showImageModal} onHide={handleImageClose} centered size="lg">
            <Modal.Body cclassName="p-0 d-flex justify-content-center align-items-center" style={{ maxHeight: '80vh' }}>
              <img
                src={driver.licenseImage}
                alt={driver.driverName}
                style={{
                  maxHeight: '80vh',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  margin: 'auto',
                }}

              />
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
  if (days < 0) months--;
  if (months < 0) {
    months += 12;
    years--;
  }
  return years < 0 ? 'N/A' : `${years} year(s)`;
};

export default DriverDetail;