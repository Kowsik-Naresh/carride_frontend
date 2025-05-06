import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import "../../css/UserRegistrationForm.css";
import NavB from '../NavB';
import Footer from '../Footer';
import User from '../user/user';
import axios from 'axios';

function UserRegistrationForm({ getUserDetails }) {
  const [formData, setFormData] = useState({
    profileImage: null,
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: '',
    otpSent: false,
    otpVerified: false,
  });

  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [userObject, setUserObject] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    setIsDetailsSubmitted(true);

    let base64Image = '';
    if (formData.profileImage) {
      base64Image = await convertToBase64(formData.profileImage);
    }

    const newUser = new User();
    newUser.setUserName(formData.name);
    newUser.setMobileNumber(formData.phone);
    newUser.setEmail(formData.email);
    newUser.setPassword(formData.password);
    newUser.setProfileImage(base64Image);

    setUserObject(newUser);
    alert('OTP sent to your email or phone.');
    setFormData({ ...formData, otpSent: true });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (formData.otp === '123456') {
      setFormData({ ...formData, otpVerified: true });
      alert('OTP verified successfully!');

      if (!userObject) {
        alert("User data missing. Try submitting the form again.");
        return;
      }

      try {
        const response = await axios.post('http://localhost:8080/user/createUser', userObject.toJSON(), {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          getUserDetails(response.data.data); // Pass user data to parent component
          alert('User successfully registered!');
        } else {
          alert('Failed to register user. Please try again.');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Error registering user. Please try again.');
      }
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10} sm={12} className="custom-form-container">
            <Form onSubmit={isDetailsSubmitted ? handleVerifyOtp : handleSubmitDetails}>
              {!isDetailsSubmitted && (
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="profileImage" className="mb-3">
                      <Form.Label>Profile Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="phone" className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Choose a strong password"
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-4">
                      Submit
                    </Button>
                  </Col>
                </Row>
              )}

              {isDetailsSubmitted && formData.otpSent && (
                <>
                  <Form.Group controlId="otp" className="mb-3">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="Enter OTP sent to your email or phone"
                      required
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" className="w-100">
                    Verify OTP
                  </Button>
                </>
              )}

              {formData.otpVerified && (
                <Alert variant="success" className="mt-3 text-center">
                  Registration successful!
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserRegistrationForm;
