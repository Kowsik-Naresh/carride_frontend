import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'react-bootstrap';

const Cars = () => {
  const cars = ["c1.jpeg", "c.jpeg", "c1.jpeg", "c.jpeg"]; 
  const [presentClickedCar,setPresentClickedCar]=useState(-1);
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Available Cars</h2>
      <Row>
        {cars.map((car, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <Card className="shadow-sm h-100" onClick={()=>setPresentClickedCar(index)}>
              <Card.Img variant="top" src={car} alt={`car-${index}`} style={{ height: '250px', objectFit: 'cover' }} />
              <Card.Body className="text-center">
                <Card.Title>Car {index + 1}</Card.Title>
                <Card.Text>Comfortable and Reliable</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal>
        <ModalHeader closeButton>Pattapu Naresh</ModalHeader>
        <ModalBody>
            <img src={cars[presentClickedCar]} alt='car_image'/>
        </ModalBody>
        <ModalFooter>
          <Button className='btn btn-success'>Call now</Button>
          <Button className='btn btn-danger'>cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Cars;
