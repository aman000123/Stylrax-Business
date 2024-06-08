import { Link, NavLink } from "react-router-dom";
import styles from "../footer/Footer.module.css";
import logo from "../../../assets/image/stylrax_logo.png";
import playstore from "../../../assets/image/gplay.svg";
import appstore from "../../../assets/image/imgAppstore.svg";
function Footer(props) {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.links}>
        <div className={styles.footerItem}>
          <i className={styles.designs}></i>
        </div>
        <div className={styles.footerLinks}>
          <NavLink to={props.redirect}>
            {" "}
            <img src={logo} alt="logo" className={styles.footerItem} />
          </NavLink>

          <Link to="/home/aboutus">About US</Link>
          <Link to="/home/contactus">Contact US</Link>
          <Link to="/home/codeofconduct">Code Of Conduct</Link>
          <Link to="/home/privacy">Privacy Policy</Link>
          <Link to="/home/terms-condition">Terms of use</Link>
          <div className={styles.iconDiv}>
          <img src={playstore} alt="playstore" className={styles.gplay} />
          <img src={appstore} alt="playstore" className={styles.appstore} />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
