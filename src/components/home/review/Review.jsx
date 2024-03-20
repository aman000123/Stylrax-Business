import styles from "../review/Review.module.css";
import poster from "../../../assets/image/poster.png";


export default function Review() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.child}>
                    <p>"Love this platform! Easy sign-up, smooth appointments,
                        and a safe space for freelancers and salons. Highly recommended
                        for a hassle-free experience!"
                    </p>
                    <div className={styles.flexDiv}>
                        <div className={styles.imgDiv}>
                            <img src={poster} alt='' />
                        </div>
                        <div className={styles.textDiv}>
                            <p>Anil Kumar</p>
                            <h6>Salon Owner, Big Boss</h6>
                        </div>
                    </div>

                </div>

                <div className={styles.child}>
                    <p>"Love this platform! Easy sign-up, smooth appointments,
                        and a safe space for freelancers and salons. Highly recommended
                        for a hassle-free experience!"
                    </p>
                    <div className={styles.flexDiv}>
                        <div className={styles.imgDiv}>
                            <img src={poster} alt='' />
                        </div>
                        <div className={styles.textDiv}>
                            <p>Anil Kumar</p>
                            <h6>Salon Owner, Big Boss</h6>
                        </div>
                    </div>

                </div>

                <div className={styles.child}>
                    <p>"Love this platform! Easy sign-up, smooth appointments,
                        and a safe space for freelancers and salons. Highly recommended
                        for a hassle-free experience!"
                    </p>
                    <div className={styles.flexDiv}>
                        <div className={styles.imgDiv}>
                            <img src={poster} alt='' />
                        </div>
                        <div className={styles.textDiv}>
                            <p>Anil Kumar</p>
                            <h6>Salon Owner, Big Boss</h6>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}



