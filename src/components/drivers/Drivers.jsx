import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import initialData from '../../required/appInitData.json';
import LoadingPanel from '../../predefind/LoadingPanel';
import DataNotFound from '../../predefind/DataNotFound';
import Notification from '../../predefind/Notification';
import '../../css/drivers.css';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null); // ✅ Corrected useState syntax

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(`${initialData.springUrl}/drivers/allDrivers`)
        .then((response) => {
          setDrivers(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching drivers:', error);
          setNotification({
            status: 'failure',
            message: 'Failed to fetch drivers. Please try again.'
          });
          setLoading(false);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="py-5 position-relative">
      {notification && (
        <Notification
          requirements={notification}
          onClose={() => setNotification(null)}
        />
      )}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '400px' }}
        >
          <LoadingPanel />
        </div>
      ) : (
        <>
        <h2 className="driver-heading">Meet Our Professional Drivers</h2>

          <Row className="g-4">
            {drivers.length > 0 ? (
              drivers.map((driver) => (
                <Col key={driver.driverId} xs={12} sm={6} md={4} lg={3}>
                  <Card className="h-100 border-0 shadow-sm rounded-4 hover-shadow transition">
                    <Card.Img
                      variant="top"
                      src={driver.profileImage}
                      alt={driver.driverName}
                      className="rounded-top"
                      style={{
                        height: '250px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '1rem',
                        borderTopRightRadius: '1rem'
                      }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <h5 className="fw-bold text-dark mb-1">
                        {driver.driverName}
                      </h5>
                      <p className="text-secondary mb-1">
                        Experience: {driver.experience} yrs
                      </p>
                      <p className="text-secondary mb-3">
                        Rating: {driver.rating || 'Not Rated'}
                      </p>
                      <div className="mt-auto">
                        <Link to={`/drivers/${driver.driverId}`}>
                          <Button
                            variant="primary"
                            className="w-100 rounded-pill"
                          >
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center">
                <DataNotFound text={'No drivers found.'} />
              </Col>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Drivers;
