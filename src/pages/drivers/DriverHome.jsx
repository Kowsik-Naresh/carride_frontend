import React from 'react'
import NavB from '../../components/NavB'
import Footer from '../../components/Footer'
import Drivers from '../../components/drivers/Drivers'

const DriverHome = () => {
  return (
    <div>
     <NavB/>
     <div style={{ backgroundColor: '#f4f6f8' }}>
     <Drivers/>
     </div>
    <Footer/>
    </div>
  )
}

export default DriverHome
