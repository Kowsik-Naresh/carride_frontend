import React from 'react'
import NavB from '../../components/NavB'
import Footer from '../../components/Footer'
import DrivingSchoolHome from '../../components/drivers/DrivingSchoolHome'
const DrivingSchool = () => {
  return (
    <div>
       <NavB/>
       <div style={{ backgroundColor: '#f4f6f8' }}>
       <DrivingSchoolHome/>
       </div>
       <Footer/>
    </div>
  )
}

export default DrivingSchool
