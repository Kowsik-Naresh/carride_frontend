import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarHome from './pages/cars/CarHome';
import DriverHome from './pages/drivers/DriverHome';
import DrivingSchool from './pages/drivers/DrivingSchool';
import DrivingJobs from './pages/drivers/DrivingJobs';
import DriversDetail from './components/drivers/DriversDetails';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cars" element={<CarHome/>} />
        <Route path="/drivers" element={<DriverHome />} />
        <Route path="/drivers/:driverId" element={<DriversDetail />} />
        <Route path="/driving_school" element={<DrivingSchool/>} />
        <Route path="/drivering_job" element={<DrivingJobs/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
