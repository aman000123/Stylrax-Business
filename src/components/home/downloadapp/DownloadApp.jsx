import styles from "../downloadapp/DownloadApp.module.css";
import mobileImg from "../../../assets/image/mobileImg.png";
import playstore from "../../../assets/image/gplay.svg";
import appstore from "../../../assets/image/imgAppstore.svg";

function DownloadApp() {
  return (
    <div className={styles.main}>
      <div className={styles.mainDiv}>
        <div className={styles.mobileImage}>
          <img src={mobileImg} alt="mobile-Image" />
        </div>
        <div className={styles.downloadmainDiv}>
          <h3>Lorem Ipsum Sit Dot Stylrax App</h3>
          <p>Download the App NOW! it’s smart easy and fast</p>
          <div className={styles.downloadLink}>
            <img src={playstore} alt="playstore" className={styles.gplay} />
            <img src={appstore} alt="playstore" className={styles.appstore} />
          </div>
        </div>
      </div>
      <h3 className={styles.brands}>CHOICE OF 5,500+ BRANDS</h3>
    </div>
  );
}

export default DownloadApp;
