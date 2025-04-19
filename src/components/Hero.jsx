import React, { useState } from 'react';
import Cars from './Cars';
import Drivers from './Drivers';

const Hero = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("drivers");

  const navItems = ["drivers", "cars"];

  return (
    <>
      <div className="relative  flex items-center justify-center">
        <img
        style={{width:"90%",marginTop:"-19px"}}
          src="/carNs.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      </div>

      <div style={styles.subNavar}>
        {navItems.map((item) => (
          <div
            key={item}
            onClick={() => setSelectedNavItem(item)}
            style={selectedNavItem === item ? styles.selectedNavItem : {}}
          >
            <div style={styles.navItemContainer}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </div>
          </div>
        ))}
      </div>
      {selectedNavItem=="cars"?(<div>
       <Cars/>
      </div>):(<div>
       <Drivers/>
      </div>)}
    </>
  );
};

const styles = {
  subNavar: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop:"-42px"
  },
  navItemContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  selectedNavItem: {
    borderBottom:"2px solid red",
    width:"50%"
  },
};

export default Hero;
