import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavB() {
  const [selectedTab, setSelectedTab] = useState(0); 
  const location = useLocation();

  useEffect(() => {
    const tab = localStorage.getItem("tabNumber");
    if (tab !== null) {
      setSelectedTab(Number(tab));
    }
  }, []);

  const handleSetSelectedTab = (tabNumber) => {
    setSelectedTab(tabNumber);
    localStorage.setItem("tabNumber", tabNumber);
  };

  const navStyle = (tabNumber) => ({
    borderBottom: selectedTab === tabNumber ? '1px solid red' : 'none',
    padding: '8px 8px',
    fontWeight: selectedTab === tabNumber ? 'bold' : 'normal',
    color: selectedTab === tabNumber ? '#000' : '#333',
    textDecoration: 'none',
    cursor: 'pointer',
    color:'blue'
  });

  return (
    <Navbar expand="lg" className="mb-3" style={{ backgroundColor: "#DFDDDD" }}>
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src="/krishna.png"
            alt="logo"
            style={{ margin: "-10px" ,width:"100%",height:"80px"}}
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
                alt="logo"
                width={300}
                height={80}
                style={{ margin: "-10px" }}
              />
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
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
