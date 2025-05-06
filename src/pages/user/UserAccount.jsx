import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import NavB from '../../components/NavB';
import Footer from '../../components/Footer';
import UserRegistrationForm from '../../components/user/UserRegistrationForm'
import user from '../../components/user/user'
const UserAccount = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <NavB />

      {!user ? (
        <Container
          className="text-center d-flex flex-column justify-content-center align-items-center"
          style={{ height: '90vh' }}
        >
          <h4 className="text-muted mb-4">User data not available.</h4>
          <Button variant="dark" className="rounded-pill px-4" onClick={() => setShowModal(true)}>
            Create Account Now
          </Button>
        </Container>
      ) : (
        <Container className="py-5">
          <Card className="shadow-sm p-4 border-0 rounded-4">
            <Row className="align-items-center">
              <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
                <img
                  src={user.profileImage || '/default-user.png'}
                  alt={user.fullName}
                  className="rounded-circle shadow"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </Col>

              <Col xs={12} md={8}>
                <h3 className="fw-bold mb-3" style={{ fontSize: '1.8rem' }}>{user.userName}</h3>
                <p className="mb-1 text-muted">Email: {user.email}</p>
                <p className="mb-1 text-muted">Phone: {user.mobileNumber}</p>
                <p className="mb-3 text-muted">Address: {user.address}</p>
                <Button variant="dark" className="rounded-pill px-4">Edit Profile</Button>
              </Col>
            </Row>
          </Card>
        </Container>
      )}

      {/* Account Creation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserRegistrationForm />
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
};

export default UserAccount;
