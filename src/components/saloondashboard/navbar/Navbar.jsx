import  { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../navbar/Navbar.module.css";
import { NavLink } from "react-bootstrap";
import Logo from "../../../ux/Logo";
// import PropTypes from 'prop-types';
const Navbar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className={styles.nav}>
      <div className="align-items-center">
        <div className={styles.logo}>
         <Logo/>
        </div>
      </div>
      <div>
        <ul className={`${styles.menu_list}`}>
          {props.data.map((item, index) => (
            <div key={index} className="d-flex">
              <div className={`${styles.icon} me-2`}>{item.icon}</div>

              <NavLink href={`/${item.link}`}>
                {item.text}
              </NavLink>
            </div>
          ))}
        </ul>

        <div className={` ${styles.menu_icon} `} onClick={toggleMenu}>
          <MenuIcon />
        </div>
        {menuOpen && (
          <ul className={`${styles.MenuIcon} text-white pt-4`}>
            {props.data.map((item, index) => (
              <div key={index} className="d-flex gap-3 pb-2">
                 <span className={`${styles.icon}`}>{item.icon}</span>
                 <NavLink href={`/${item.link}`}>
                {item.text}
              </NavLink>              
              </div>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
