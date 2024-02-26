import React, { useState } from "react";
import logo from "../../assets/image/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import styles from "../../assets/scss/pages/home/Navbar.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className={styles.nav}>
      <div className="align-items-center">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div>
        <ul className={styles.menu_list}>
          <div className="d-flex">
            <PhoneIcon className={`${styles.icon} me-2`} />
            <li>+91 9988776544</li>
          </div>

          <div className="d-flex">
            <MailOutlineIcon className={`${styles.icon} me-2`} />
            <li>samplemail.com</li>
          </div>
          <div className="d-flex">
            <AccountCircleOutlinedIcon className={`${styles.icon} me-2`} />
            <li>Sign in</li>
          </div>
        </ul>
        <div
          className={`${styles.icon} ${styles.menu_icon} `}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </div>
        {menuOpen && (
          <ul className={`${styles.MenuIcon}`}>
            <div className="d-flex">
              <PhoneIcon className={`${styles.icon} me-2`} />
              <li>+91 9988776544</li>
            </div>

            <div className="d-flex">
              <MailOutlineIcon className={`${styles.icon} me-2`} />
              <li>samplemail.com</li>
            </div>
            <div className="d-flex">
              <AccountCircleOutlinedIcon className={`${styles.icon} me-2`} />
              <li>Sign in</li>
            </div>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
