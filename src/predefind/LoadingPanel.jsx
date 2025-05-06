import React from 'react';

const LoadingPanel = () => {
  // Inline Styles Object
  const overlayStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f6f8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0',
    left: '0',
  };

  const spinnerStyle = {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    animation: 'spin 1s linear infinite',
  };

  const loadingTextStyle = {
    marginTop: '20px',
    fontSize: '1.2rem',
    color: '#333',
  };

  return (
    <div style={overlayStyle} >
      <div style={spinnerStyle}></div>
      <p style={loadingTextStyle}>Loading...</p>
    </div>
  );
};

export default LoadingPanel;
