import React, { useEffect } from 'react';

const Notification = ({ requirements, onClose }) => {
  useEffect(() => {
    if (!requirements || !requirements.status) return;

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [requirements, onClose]);

  if (!requirements || !requirements.status) return null;

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return {
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
        };
      case 'failure':
        return {
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
        };
      case 'warning':
      case 'alert':
        return {
          backgroundColor: '#fff3cd',
          color: '#856404',
          border: '1px solid #ffeeba',
        };
      default:
        return {
          backgroundColor: '#e2e3e5',
          color: '#383d41',
          border: '1px solid #d6d8db',
        };
    }
  };

  const getIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return '✔️'; // Check mark icon for success
      case 'failure':
        return '❌'; // Cross mark icon for failure
      case 'warning':
      case 'alert':
        return '⚠️'; // Warning icon for alert or warning
      default:
        return '';
    }
  };

  const style = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 9999,
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    fontWeight: '500',
    minWidth: '250px',
    textAlign: 'center',
    transition: 'opacity 0.3s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // This places the icon before the message
    ...getStatusStyle(requirements.status),
  };

  return (
    <div style={style}>
      <span style={{ marginRight: '10px' }}>{getIcon(requirements.status)}</span>
      {requirements.message}
    </div>
  );
};

export default Notification;
