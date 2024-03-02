import React from 'react';
import Navbar from "../Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import starImage from "../../assets/image/starImage.png";
import logo from "../../assets/image/logo.png";
import styles from "../../assets/scss/pages/home/accountCreation.module.css";
import menuItems from '../navData/data';

const Account = () => {
  return (
   <>
   <Navbar data={menuItems}/>
  <Outlet/>
   <footer className={styles.footer} >
  <main className={styles.main}>
     <div className={styles.mainDiv}>
      <ul className={styles.list}>
        <li>Business</li>
        <li>Customer service</li>
        <li>Conditions of use</li>
        <li>Privacy Policy</li>
      
      </ul>
      
     
    {/* <p>© 2023-2024, Stylrax.com, Inc. or its affiliates</p> */}
   
      <div className=''>
        <img src={logo} alt='stars'className={styles.starImage}/>
      </div>
     </div>
    </main>
  </footer>
   </>
  );
}

export default Account;
