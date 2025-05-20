import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Modal, Tab, Tabs } from 'react-bootstrap';
import NavB from '../../components/NavB';
import Footer from '../../components/Footer';
import UserRegistrationForm from '../../components/user/UserRegistrationForm';
import '../../css/UserRegistrationForm.css'
const UserAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const storedUser = localStorage.getItem('registeredUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUserCreated = (userData) => {
    localStorage.setItem('registeredUser', JSON.stringify(userData));
    setUser(userData);
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavB />
      <div style={{ backgroundColor: '#f4f6f8', flex: 1 }}>
        {!user ? (
          <Container
            className="text-center d-flex flex-column justify-content-center align-items-center"
            style={{ height: '93vh' }}
          >
            <h4 className="text-muted mb-4">User data not available.</h4>
            <Button
              variant="dark"
              className="rounded-pill px-4"
              onClick={() => setShowModal(true)}
            >
              Create Account Now
            </Button>
          </Container>
        ) : (
          <Container className="py-5">
            <Row>
              <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
                <img
                  src={user.profileImage || '/default-user.png'}
                  alt={user.userName}
                 className='user-image'/>
                <h3 className="fw-bold  mb-3  mt-3" style={{ fontSize: '1.8rem' }}>
                  {user.userName}
                </h3>
              </Col>

              <Col xs={12} md={8}>
                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3" fill>
                  <Tab eventKey="info" title="Info">
                    <div className="text-start" style={{ marginLeft: '15px', lineHeight: '1.8' }}>

                      <p className="mb-1 text-muted"><strong>Email:</strong> {user.email}</p>
                      <p className="mb-1 text-muted"><strong>Phone:</strong> {user.mobileNumber}</p>
                      <p className="mb-1 text-muted"><strong>Alternate Number:</strong> {user.alternateNumber || 'N/A'}</p>
                      <p className="mb-1 text-muted"><strong>Age:</strong> {user.age || 'N/A'}</p>
                      <p className="mb-3 text-muted"><strong>Address:</strong> {user.address || 'N/A'}</p>
                      <Button variant="dark" className="rounded-pill px-4">
                        Edit Profile
                      </Button>
                    </div>
                  </Tab>

                  <Tab eventKey="trips" title="Trips">
                    <p>No trips available yet.</p>
                  </Tab>

                  <Tab eventKey="reviews" title="Reviews">
                    <p>No reviews yet.</p>
                  </Tab>
                </Tabs>
              </Col>
            </Row>


          </Container>
        )}

        {/* Account Creation Modal with custom width */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          dialogClassName="custom-modal-width"

        >
          <Modal.Header closeButton>
            <Modal.Title>Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserRegistrationForm getUserDetails={handleUserCreated} />
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default UserAccount;
