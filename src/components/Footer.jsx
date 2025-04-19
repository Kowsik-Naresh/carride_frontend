import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">&copy; {new Date().getFullYear()} Krishna Travels. All rights reserved.</p>
          </Col>
          <Col md={6}>
            <Nav className="justify-content-center justify-content-md-end">
              <Nav.Link href="#home" className="text-light">Home</Nav.Link>
              <Nav.Link href="#cars" className="text-light">Cars</Nav.Link>
              <Nav.Link href="#drivers" className="text-light">Drivers</Nav.Link>
              <Nav.Link href="#contact" className="text-light">Contact</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
