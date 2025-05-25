// Cars.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingPanel from '../../predefind/LoadingPanel';
import DataNotFound from '../../predefind/DataNotFound';
import Notification from '../../predefind/Notification';
import '../../css/cars.css';
import DriverCard from '../drivers/DriverCard';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCars([
        {
          id: 1,
          name: "Hyundai i20",
          image: "/cars/c1.png",
          description: "Comfortable and reliable hatchback.",
          model: "i20",
          brand: "Hyundai",
          seats: 5,
          fuelType: "Petrol",
          transmission: "Manual",
        },
        {
          id: 2,
          name: "Maruti Swift",
          image: "/cars/c2.jpeg",
          description: "Compact car with great mileage.",
          model: "Swift",
          brand: "Maruti",
          seats: 5,
          fuelType: "Petrol",
          transmission: "Manual",
        },
        {
          id: 3,
          name: "Honda City",
          image: "/cars/c3.jpeg",
          description: "Premium sedan with luxury feel.",
          model: "City",
          brand: "Honda",
          seats: 5,
          fuelType: "Petrol",
          transmission: "Automatic",
        },
        {
          id: 4,
          name: "Toyota Innova",
          image: "/cars/c4.jpeg",
          description: "Spacious and ideal for families.",
          model: "Innova",
          brand: "Toyota",
          seats: 7,
          fuelType: "Diesel",
          transmission: "Manual",
        }
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCarClick = (car) => {
    navigate(`/cars/${car.id}`, { state: { car } });
  };

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
              cars.map((car) => (
                <Col key={car.id} xs={6} sm={6} md={4} lg={3}>
                 
<DriverCard onClick={() => handleCarClick(car)}
                        image={car.image}
                        name={car.name}
                        experience={-1}
                        rating={3}
                    />

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
    </Container>
  );
};

export default Cars;
