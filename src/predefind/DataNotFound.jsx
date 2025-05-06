import React from 'react';
import { Container } from 'react-bootstrap';
import { TbNotesOff } from 'react-icons/tb';

const DataNotFound = ({ text }) => {
  return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <TbNotesOff size={100} color='orange' />
        </div>
        <div style={{ fontSize: '20px', fontWeight: '500', color: '#333' }}>
          {text || "No Data Available"}
        </div>
      </Container>
    </div>
  );
};

export default DataNotFound;
