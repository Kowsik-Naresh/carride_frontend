import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarHome from './pages/cars/CarHome';
import DriverHome from './pages/drivers/DriverHome';
import DrivingSchool from './pages/drivers/DrivingSchool';
import DrivingJobs from './pages/drivers/DrivingJobs';
import DriversDetail from './components/drivers/DriversDetails';
import UserRegistrationForm from './components/user/UserRegistrationForm';
import UserAccount from './pages/user/UserAccount';
import CarDetails from './components/cars/CarDetails';

const Routing = () => {
  const [UserDetails, setUserDetails] = useState({});

  useEffect(() => {
    // Check if the user item exists in localStorage
    const storedUser = localStorage.getItem("user");

    // If it exists and is valid JSON, parse it, else return an empty object
    if (storedUser && storedUser != undefined) {
      try {
        const user = JSON.parse(storedUser);
        setUserDetails(user);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarHome />} />
        <Route path="/drivers" element={<DriverHome />} />
        <Route path="/drivers/:driverId" element={<DriversDetail />} />
        <Route path="/driving_school" element={<DrivingSchool />} />
        <Route path="/driving_job" element={<DrivingJobs />} />
        <Route path="/user_registration" element={<UserRegistrationForm />} />
        <Route
          path="/profile"
          element={
            Object.keys(UserDetails).length > 0
              ? <UserAccount user={UserDetails} />
              : <UserAccount />
          }
        />
       <Route path="/cars/:carId" element={<CarDetails />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
