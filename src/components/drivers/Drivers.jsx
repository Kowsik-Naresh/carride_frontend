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
          setTimeout(() => {
            setNotification(null);
          }, 3000)
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
          style={{ height: '200px' }}
        >
          <LoadingPanel />
        </div>
      ) : (
        <>
          {drivers.length > 0 ? (
            <>
              <Row className="g-4">
                {drivers.map((driver) => (
                  <Col key={driver.driver.driverId} xs={6} sm={6} md={4} lg={3}>
                    <Link to={`/drivers/${driver.driver.driverId}`} className="text-decoration-none text-reset">
                      <Card className="h-100 border-0 shadow-sm rounded-4 card-hover">
                        <Card.Img
                          variant="top"
                          src={driver.driver.profileImage}
                          alt={driver.driver.driverName}
                          className="driver-card-img"
                          onClick={() => window.open(driver.driver.profileImage, '_blank')}
                          style={{ cursor: 'pointer' }}
                        />
                        <Card.Body className="d-flex flex-column p-3">
                          <h5 className="fw-bold text-dark mb-1 text-center" title={driver.driver.driverName}>
                            {driver.driver.driverName.length < 10
                              ? driver.driver.driverName
                              : driver.driver.driverName.substring(0, 10) + '...'}
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
                        </Card.Body>
                      </Card>
                    </Link>

                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <DataNotFound text={"No Drivers Found"} />
          )}
        </>
      )}
    </Container>
  );
};

export default Drivers;
