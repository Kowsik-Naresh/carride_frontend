import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { BiHome, BiUserCircle } from 'react-icons/bi';
import { CarFrontFill, MortarboardFill } from 'react-bootstrap-icons';
import { GiMassDriver, GiSteeringWheel } from 'react-icons/gi';
import { FaSchool } from 'react-icons/fa';
import '../css/navb.css'
function NavB() {
  const [selectedTab, setSelectedTab] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const tab = localStorage.getItem('tabNumber');
    if (tab) setSelectedTab(Number(tab));
  }, []);

  useEffect(() => {
    if (location.pathname.includes('/cars')) {
      setSelectedTab(2);
    } else if (location.pathname.includes('/drivers')) {
      setSelectedTab(3);
    } else if (location.pathname.includes('/driving_job')) {
      setSelectedTab(4);
    } else if (location.pathname.includes('/driving_school')) {
      setSelectedTab(5);
    }else if(location.pathname.includes('/profile')){
      setSelectedTab(6);
    } else if (location.pathname === '/') {
      setSelectedTab(1);
    } else {
      setSelectedTab(0); // fallback
    }
  }, [location]);

  const handleSetSelectedTab = (tabNumber) => {
    setSelectedTab(tabNumber);
    localStorage.setItem('tabNumber', tabNumber);
  };

  const navStyle = (tabNumber) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '6px 12px',
    fontSize: '18px',
    fontWeight: selectedTab === tabNumber ? '600' : '400',
    color: selectedTab === tabNumber ? '#00aaff' : '#333',
    textDecoration: 'none',
    borderBottom: selectedTab === tabNumber ? '3px solid #00aaff' : 'none',
    transition: 'color 0.3s ease, border-bottom 0.3s ease',
  });

  return (
    <Navbar expand="lg" className="shadow-sm sticky-top" style={{ backgroundColor: '#ffffff', padding: '2px 0' }}>
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" onClick={() => handleSetSelectedTab(1)}>
          <img
            src="/krishna.png"
            alt="Krishna Travels Logo"
            style={{ height: '50px', objectFit: 'contain' }}
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
                style={{ height: '35px', objectFit: 'contain' }}
              />
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="ms-auto align-items-start">
              <Nav.Link as={NavLink} to="/" style={navStyle(1)} onClick={() => handleSetSelectedTab(1)}>
                <BiHome size={18} /> Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cars" style={navStyle(2)} onClick={() => handleSetSelectedTab(2)}>
                <CarFrontFill size={18} /> Cars
              </Nav.Link>
              <Nav.Link as={NavLink} to="/drivers" style={navStyle(3)} onClick={() => handleSetSelectedTab(3)}>
                <GiSteeringWheel size={18} /> Drivers
              </Nav.Link>
              <Nav.Link as={NavLink} to="/driving_job" style={navStyle(4)} onClick={() => handleSetSelectedTab(4)}>
                <MortarboardFill size={18} /> Driving Jobs
              </Nav.Link>
              <Nav.Link as={NavLink} to="/driving_school" style={navStyle(5)} onClick={() => handleSetSelectedTab(5)}>
                <FaSchool size={18} /> Driving School
              </Nav.Link>
              <Nav.Link as={NavLink} to="/profile" style={navStyle(6)} onClick={() => handleSetSelectedTab(6)}>
                <BiUserCircle size={18} /> Account
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavB;
