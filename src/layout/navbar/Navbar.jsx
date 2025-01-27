import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../navbar/Navbar.module.css";
import Logo from "../../ux/Logo";
const Navbar = (props) => {
  // console.log(" Nav Bar ::>", props);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className={`${styles.nav} bg-black d-flex`}>
      <div className="align-items-center">
        <div className={styles.logo}>
          {/* <NavLink to={props.redirect}> */}
          <Logo />
          {/* </NavLink> */}
        </div>
      </div>
      <div>
        <ul className={`${styles.menu_list}`}>

          {props.data.map((item, index) => (
            <div key={index} className="d-flex">
              <div className={`${styles.icon} me-2`}>{item.icon}</div>

              <li className={styles.menuLi}>
                {item.text}
              </li>
            </div>
          ))}
        </ul>

        <div className={` ${styles.menu_icon} text-white`} onClick={toggleMenu}>
          <MenuIcon />
        </div>
        {menuOpen && (
          <ul className={`${styles.MenuIcon} bg-black text-white`}>
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
