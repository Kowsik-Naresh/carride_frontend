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

const getAvatarColor = (letter) => {
  const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1'];
  const index = letter.toUpperCase().charCodeAt(0) % colors.length;
  return colors[index];
};

const DriverDetail = () => {
  const { driverId } = useParams();
  const intDriverId = parseInt(driverId, 10);
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [revieweduserId,setRevieweduserId]=useState(-1);
  const [notification,setNotification]=useState(null)
  const [feedback, setFeedback] = useState({
    revieweduserId,
    reviewRating: rating,
    reviewText: '',
    reviewedDriverId:parseInt(driverId,10),
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      setRevieweduserId(user.userId);
  
      setFeedback(prev => ({
        ...prev,
        revieweduserId: user.userId
      }));
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
        setLoading(false);
      })
      .catch((err) => {
        setNotification({
           status: 'failure',
            message: 'Failed to fetch driver and reviews. Please try again.'
        })
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
   
    console.log('Feedback submitted:', feedback);
    axios.post(`${appInitData.springUrl}/review/saveReview`,feedback).then(()=>{
      setNotification({
        status: 'success',
         message: 'Reviewed saved successfully.'
     })
    }).catch((err)=>{
      setNotification({
        status: 'failure',
         message: 'failed  to save.'
     })
      console.log("error"+err);
    });
    handleClose();
  };

  return (
    <div>
      <NavB />
      {notification && (
              <Notification
                requirements={notification}
                onClose={() => setNotification(null)}
              />
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
    className="img-fluid shadow driver-profile-image mb-3"
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
                        <h5 className="mb-3">
                          <FaInfoCircle className="text-info me-2" />
                          Additional Driver Info
                        </h5>
                        <Row className="align-items-start">
                          <Col md={6} className="mb-3">
                            <p><strong>Experience:</strong> {driver.experience || 'N/A'} years</p>
                            <p><strong>Rating:</strong> {driver.rating || 'Unrated'}</p>
                          </Col>
                          <Col md={6} className="mb-3">
                            <p><strong>License Image:</strong></p>
                            {driver.licenseImage ? (
                              <img
                                src={driver.licenseImage}
                                alt="License"
                                className="img-fluid rounded border shadow-sm"
                                style={{ maxHeight: '250px', objectFit: 'contain' }}
                              />
                            ) : (
                              <p className="text-muted">Not Available</p>
                            )}
                          </Col>
                        </Row>
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
                          <Row>
                            {reviews.map((review, idx) => {
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
                                    <Col xs={12} md={9}>
                                      <p className="text-muted mb-0 text-start">{review.reviewBean.reviewText}</p>
                                    </Col>
                                  </Row>
                                </Col>
                              );
                            })}
                          </Row>
                        )}
                      </Tab.Pane>

                      <Tab.Pane eventKey="tripHistory">
                        <Card className="mb-4">
                          <Card.Body>
                            <Card.Title><FaCarSide className="text-primary me-2" />Trip History</Card.Title>
                            <p className="text-muted">No trip history available.</p>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      )}

      {/* Feedback Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Feedback</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="reviewText"
                value={feedback.reviewText}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-flex gap-1 mt-1 mt-2">
              {[...Array(5)].map((_, index) => (
                <StarFill
                  key={index}
                  color={index < rating ? '#FFD700' : '#D3D3D3'}
                  size={30}
                  onClick={() => handleStarColors(index)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="success">Submit Feedback</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default DriverDetail;