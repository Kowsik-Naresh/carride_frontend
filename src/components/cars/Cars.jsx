import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import initialData from '../../required/appInitData.json';
import LoadingPanel from '../../predefind/LoadingPanel';
import DataNotFound from '../../predefind/DataNotFound';
import Notification from '../../predefind/Notification';
import { useNavigate } from 'react-router-dom';
import '../../css/cars.css';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [presentClickedCar, setPresentClickedCar] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
      setCars([
        {
          "id": 1,
          "name": "Hyundai i20",
          "image": "/cars/c1.png",
          "description": "Comfortable and reliable hatchback."
        },
        {
          "id": 2,
          "name": "Maruti Swift",
          "image": "/cars/c2.jpeg",
          "description": "Compact car with great mileage."
        },
        {
          "id": 3,
          "name": "Honda City",
          "image": "/cars/c3.jpeg",
          "description": "Premium sedan with luxury feel."
        },
        {
          "id": 4,
          "name": "Toyota Innova",
          "image": "/cars/c4.jpeg",
          "description": "Spacious and ideal for families."
        }
      ]
      )
      setLoading(false)

    }
    , 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRentClick = (carId) => {
    navigate(`/rent/${carId}`); // Pass actual ID not whole object
  };
  

  const handleRentWithDriverClick = (carId) => {
    navigate(`/rent-with-driver/${carId}`);
  };

  const selectedCar = cars[presentClickedCar];

  return (
    <Container className="py-5 position-relative">
      {notification && (
        <Notification
          requirements={notification}
          onClose={() => setNotification(null)}
        />
      )}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <LoadingPanel />
        </div>
      ) : (
        <>
          <h2 className="car-heading">Available Cars for Hire</h2>
          <Row className="g-4">
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <Col key={car.carId || index} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className="h-100 border-0 shadow-sm rounded-4 hover-shadow transition car-card"
                    onClick={() => setPresentClickedCar(index)}
                  >
                    <Card.Img
                      variant="top"
                      src={car.image}
                      alt={car.name}
                      className="rounded-top"
                      style={{
                        height: '250px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '1rem',
                        borderTopRightRadius: '1rem'
                      }}
                    />
                    <Card.Body className="text-center">
                      <h5 className="fw-bold text-dark mb-1">{car.name}</h5>
                      <p className="text-secondary mb-1">{car.description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center">
                <DataNotFound text={'No cars available at the moment.'} />
              </Col>
            )}
          </Row>
        </>
      )}

      {/* Modal for Car Options */}
      <Modal
        show={presentClickedCar !== null}
        onHide={() => setPresentClickedCar(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedCar?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedCar && (
            <>
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
              <p>{selectedCar.description}</p>
              <p className="text-success fw-bold">
                ₹{selectedCar.pricePerDay} per day
              </p>

              <div className="d-grid gap-3 mt-4">
              <Button
  variant="primary"
  size="lg"
  onClick={() => handleRentClick(selectedCar.id)} // assuming id is present
>
  Car for Rent
</Button>


<Button
  variant="outline-primary"
  size="lg"
  onClick={() => handleRentWithDriverClick(selectedCar)}
>
  Car with Driver for Rent
</Button>

              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPresentClickedCar(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cars;
