import { Link, NavLink } from "react-router-dom";
import styles from "../footer/Footer.module.css";
import logo from "../../../assets/image/stylrax_logo.png";

function Footer(props) {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.links}>
        <div className={styles.footerItem}>
    <NavLink to={props.redirect}>    <img src={logo} alt="logo" /></NavLink>
          <i className={styles.designs}></i>
        </div>
        <div className={styles.footerLinks}>
          <Link to="/home/aboutus">About US</Link>
          <Link to="/home/contactus">Contact US</Link>
          <Link to="/home/codeofconduct">Code Of Conduct</Link>
          <Link to="/home/privacy">Privacy Policy</Link>
          <Link to="/home/terms-condition">Terms of use</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
