import React from 'react'
import NavB from '../../components/NavB'
import Footer from '../../components/Footer'
import DrivingJobsHome from '../../components/drivers/DrivingJobsHome'
const DrivingJobs = () => {
  return (
    <div>
       <NavB/>
       <div style={{ backgroundColor: '#f4f6f8' }}>
       <DrivingJobsHome/>
       </div>
       <Footer/>
    </div>
  )
}

export default DrivingJobs
