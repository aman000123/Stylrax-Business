
import styles from '../../assets/scss/pages/home/downloadApp.module.css'
import mobileImg from '../../assets/image/mobileImg-removebg-preview.png';
 import playstore from '../../assets/image/Link → img-gplay.png.svg'
 import appstore from '../../assets/image/Link → img-appstore.png.svg'

function DownloadApp() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.mobileImage}>
        <img src={mobileImg} alt='mobile-Image' />
      </div>
      <div className={styles.downloadmainDiv}>
        <h3>Lorem Ipsum Sit Dot Stylrax App</h3>
        <p>Download the App NOW! it’s smart easy and fast</p>
        <div className={styles.downloadLink}>
          <img src={playstore} alt='playstore' className={styles.gplay} />
          <img src={appstore} alt='playstore'
            className={styles.appstore} />
        </div>
      </div>

    </div>
  )
}

export default DownloadApp