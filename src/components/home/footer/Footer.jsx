import { Link } from 'react-router-dom';
import styles from '../footer/Footer.module.css';
import logo from "../../../assets/image/logo.png";
import AppStore from '../../../assets/image/img-appstore.svg';
import GooglePlays from '../../../assets/image/img-gplay.svg'
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa6";
function Footer() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.links}>
        <div className={styles.footerItem}>
          <img src={logo} />
          <i className={styles.designs}></i>
        </div>
        <div className={styles.footerItem}>
          <Link href="">Hair Salon</Link>
          <Link href="">Spa & Wellness</Link>
          <Link href="">Skin Care Services</Link>
          <Link href="">Personal Grooming Services</Link>
          <Link href="">Bridal Services</Link>
          <Link href="">Nail Salon</Link>
        </div>
        <div className={styles.footerItem}>
          <Link href="">Stylrax Skin Care Clinic</Link>
          <Link href="">Stylrax Hair Treatment Clinic</Link>
          <Link href="">Stylrax Anti-Aging Treatment Clinic</Link>
          <Link href="">Stylrax Cosmetic Treatment Clinic</Link>
          <Link href="">Stylrax Clinic</Link>

        </div>
        <div className={styles.footerItem}>
          <Link href="">Pricing</Link>
          <Link href="">Refer A Friend</Link>
          <Link href="">Packages</Link>
          <Link href="">Offers</Link>
          <Link href="">Gift Card</Link>
          <Link href="">Blogs</Link>
        </div>
        <div className={styles.footerItem}>
          <Link to="/home/aboutus">About US</Link>
          <Link to="/home/codeofconduct">Code Of Conduct</Link>
          <Link to="/home/privacy">Privacy Policy</Link>
          <Link to="/home/terms-condition">Terms of use</Link>
        </div>

      </div>
      <div className={styles.socialMedia}>
        <div className={styles.socialMediaItems}>
          <p className={styles.social}>Get Social</p>
          <div className={styles.socialIcons}>
            <MdFacebook />
            <FaInstagram />
            <FaXTwitter />
            <CiLinkedin />
            <FaYoutube />
          </div>
        </div>
        <div className={styles.socialMediaItems}>
          <p>Subscribe to Our Newsletter</p>
          <form>
            <input type="text" placeholder='Enter Mobile Number' />
            <button>Submit</button>
          </form>
        </div>
        <div className={styles.socialMediaItems}>
          <p>Download Our App </p>
          <div className={styles.downloadsLogo}>
            <img src={AppStore} alt="Apple store"  />
            <img src={GooglePlays} alt="Google play store" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Footer