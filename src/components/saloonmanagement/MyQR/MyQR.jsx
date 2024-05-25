import Notify from "../../../utils/notify";
import Session from '../../../service/session';
import { useState, useEffect } from 'react';
import { myQr } from '../../../api/salon.management';
import styles from "./MyQR.module.css";

const MyQR = () => {
  const salonId = Session.get("salonId");
  const [qr, setQr] = useState("");

  useEffect(() => {
    const getQr = async () => {
      try {
        const response = await myQr(salonId);
        const myQR = response.data; 
        console.log("qr::>", myQR);
        setQr(myQR);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    getQr();
  }, [salonId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Salon QR Code',
          text: 'Check out this QR code for our salon.',
          files: [
            new File([await fetch(`data:image/png;base64,${qr}`).then(res => res.blob())], 'salon_qr_code.png', { type: 'image/png' })
          ]
        });
      } catch (error) {
        Notify.error('Error sharing: ' + error.message);
      }
    } else {
      Notify.error('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      {qr && (
        <>
          <img src={`data:image/png;base64,${qr}`} alt="QR Code" className={styles.myQr} />
          <div className={styles.buttonContainer}>
            <a
              href={`data:image/png;base64,${qr}`}
              download="salon_qr_code.png"
              className={styles.downloadBtn}
            >
              <button className={styles.button}>Download</button>
            </a>
            <button className={styles.button} onClick={handleShare}>Share</button>
          </div>
        </>
      )}
    </div>
  );
}

export default MyQR;
