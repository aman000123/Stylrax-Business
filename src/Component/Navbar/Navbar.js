import React, { useState } from "react";
import logo from "../../assets/image/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../../assets/scss/pages/home/Navbar.module.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Salon from "../salonAppointment/SalonAppointment";
const Navbar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const navigate = useNavigate();

  // const handleClick = () => {
  //   // Navigate to the appointment page when the nav link is clicked
  //   navigate('/salon-dashboard/appointment');
    
  // };
 
  return (
    <nav className={styles.nav}>
      <div className="align-items-center">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div>
        <ul className={styles.menu_list}>
         
          {props.data.map((item, index) => (
            <div key={index} className="d-flex">
             <div className={`${styles.icon} me-2`}>{item.icon}</div> 
           
              <NavLink href={`salon-dashboard/${item.link}`}>{item.text}</NavLink>
              
            </div>
            
          ))}
        </ul>
       
        <div
          className={` ${styles.menu_icon} `}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </div>
        {menuOpen && (
          <ul className={`${styles.MenuIcon}`}>
           
            {props.data.map((item, index) => (
              <div key={index} className="d-flex">
                {item.icon}
                <li>{item.text}</li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
