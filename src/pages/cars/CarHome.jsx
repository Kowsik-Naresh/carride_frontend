import React from 'react'
import NavB from '../../components/NavB'
import Footer from '../../components/Footer'
import Cars from '../../components/cars/Cars'
const CarHome = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavB/>
      <div style={{ backgroundColor: '#f4f6f8', flex: 1 }}>
        <Cars/>
      </div>
      <Footer/>
    </div>
  )
}

export default CarHome
