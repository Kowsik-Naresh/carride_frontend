import React from 'react'
import NavB from '../../components/NavB'
import Footer from '../../components/Footer'
import DrivingJobsHome from '../../components/drivers/DrivingJobsHome'
const DrivingJobs = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
       <NavB/>
       <div style={{ backgroundColor: '#f4f6f8', flex: 1 }}>
       <DrivingJobsHome/>
       </div>
       <Footer className="mb-0"/>
    </div>
  )
}

export default DrivingJobs
