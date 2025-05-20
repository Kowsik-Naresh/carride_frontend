import React from 'react'
import NavB from '../../components/NavB'
import Footer from '../../components/Footer'
import DrivingSchoolHome from '../../components/drivers/DrivingSchoolHome'
const DrivingSchool = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
       <NavB/>
       <div style={{ backgroundColor: '#f4f6f8', flex: 1 }}>
       <DrivingSchoolHome/>
       </div>
       <Footer className="mb-0"/>
    </div>
  )
}

export default DrivingSchool
