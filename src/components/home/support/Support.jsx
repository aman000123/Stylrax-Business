import styles from '../support/Support.module.css'
import CallIcon from '@mui/icons-material/Call';
import WorkIcon from '@mui/icons-material/Work';
 import cards from '../../../assets/image/img-cards.png.svg'

function Support() {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.contact}>
                <div className={styles.dialIcon}>
                <CallIcon />
                </div>
                <div className={styles.contactNum}>
                    <p>Customer Support</p>
                    <span>911-000000</span>
                </div>
            </div>
            <div className={styles.payment}>
                <p>Payment Supports</p>
                <div className={styles.paymentOption}>
                    <img src={cards} alt='cards' className={styles.image}/>
                </div>

            </div>
            <div className={styles.partners}>
                <p>Partner with</p>
                <div className={styles.partner}>
                    <WorkIcon className={styles.workIcon}/>
                    <span>Lorem Now</span>
                </div>

            </div>

        </div>
    )
}

export default Support