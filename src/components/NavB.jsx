import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';

function NavB() {
  const [selectedTab, setSelectedTab] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const tab = localStorage.getItem('tabNumber');
    if (tab) setSelectedTab(Number(tab));
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case '/': setSelectedTab(1); break;
      case '/cars': setSelectedTab(2); break;
      case '/drivers': setSelectedTab(3); break;
      case '/drivering_job': setSelectedTab(4); break;
      case '/driving_school': setSelectedTab(5); break;
      default: setSelectedTab(0);
    }
  }, [location]);

  const handleSetSelectedTab = (tabNumber) => {
    setSelectedTab(tabNumber);
    localStorage.setItem('tabNumber', tabNumber);
  };

  const navStyle = (tabNumber) => ({
    padding: '8px 15px', // Reduced padding for a more compact navbar
    fontSize: '14px', // Further reduced font size
    fontWeight: selectedTab === tabNumber ? '600' : '400',
    color: selectedTab === tabNumber ? '#00aaff' : '#333',
    textDecoration: 'none',
    borderBottom: selectedTab === tabNumber ? '3px solid #00aaff' : 'none',
    transition: 'color 0.3s ease, border-bottom 0.3s ease',
    display: 'inline-block',
    margin: '0 8px', // Reduced horizontal margin
  });

  return (
    <Navbar expand="lg" className="shadow-sm sticky-top" style={{ backgroundColor: '#ffffff', padding: '2px 0' }}> {/* Reduced top and bottom padding */}
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" onClick={() => handleSetSelectedTab(1)}>
          <img
            src="/krishna.png"
            alt="Krishna Travels Logo"
            style={{ height: '50px', objectFit: 'contain' }} // Reduced logo size further
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              <img
                src="/krishna.png"
                alt="Krishna Travels Logo"
                style={{ height: '35px', objectFit: 'contain' }} // Reduced logo size for consistency
              />
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={NavLink} to="/" onClick={() => handleSetSelectedTab(1)}>
                <span style={navStyle(1)}>Home</span>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cars" onClick={() => handleSetSelectedTab(2)}>
                <span style={navStyle(2)}>Cars</span>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/drivers" onClick={() => handleSetSelectedTab(3)}>
                <span style={navStyle(3)}>Drivers</span>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/drivering_job" onClick={() => handleSetSelectedTab(4)}>
                <span style={navStyle(4)}>Driving Job's</span>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/driving_school" onClick={() => handleSetSelectedTab(5)}>
                <span style={navStyle(5)}>Driving School</span>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavB;
