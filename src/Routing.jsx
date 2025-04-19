import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarHome from './pages/CarHome';
import DriverHome from './pages/DriverHome';
import DrivingSchool from './pages/DrivingSchool';
import DrivingJobs from './pages/DrivingJobs';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cars" element={<CarHome/>} />
        <Route path="/drivers" element={<DriverHome />} />
        <Route path="/driving_school" element={<DrivingSchool/>} />
        <Route path="/drivering_job" element={<DrivingJobs/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
