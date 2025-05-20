import React from 'react'
import NavB from '../../components/NavB'
import Footer from '../../components/Footer'
import Drivers from '../../components/drivers/Drivers'

const DriverHome = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavB />
      
      <div style={{ backgroundColor: '#f4f6f8', flex: 1 }}>
        <Drivers />
      </div>

      <Footer />
    </div>
  )
}

export default DriverHome
