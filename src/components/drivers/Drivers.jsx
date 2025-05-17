import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import initialData from '../../required/appInitData.json';
import LoadingPanel from '../../predefind/LoadingPanel';
import DataNotFound from '../../predefind/DataNotFound';
import Notification from '../../predefind/Notification';
import '../../css/drivers.css';
import { StarFill } from 'react-bootstrap-icons';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

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
          {drivers.length > 0 ? (
            <>
              <h2 className="driver-heading">Meet Our Professional Drivers</h2>

              <Row className="g-4">
                {drivers.map((driver) => (
                  <Col key={driver.driver.driverId} xs={12} sm={6} md={4} lg={3}>
                    <Card className="h-100 border-0 shadow-sm rounded-4 card-hover">
                      <Card.Img
                        variant="top"
                        src={driver.driver.profileImage}
                        alt={driver.driver.driverName}
                        className="driver-card-img"
                      />
                      <Card.Body className="d-flex flex-column p-3">
                        <h5 className="fw-bold text-dark mb-1 text-center">
                          {driver.driver.driverName}
                        </h5>

                        <p className="text-secondary mb-1 text-center">
                          Experience: {driver.driver.experience} yrs
                        </p>

                        <div className="d-flex justify-content-center align-items-center mb-2">
                          <span className="text-secondary me-2">Rating:</span>
                          {[...Array(5)].map((_, index) => (
                            <StarFill
                              key={index}
                              color={index < driver.rating ? '#FFD700' : '#d5d5d5'}
                              size={18}
                            />
                          ))}
                        </div>

                        <div className="mt-auto">
                          <Link to={`/drivers/${driver.driver.driverId}`}>
                            <Button variant="primary" className="w-100 rounded-pill">
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <DataNotFound text={"No Drivers Found"}/>
          )}
        </>
      )}
    </Container>
  );
};

export default Drivers;
