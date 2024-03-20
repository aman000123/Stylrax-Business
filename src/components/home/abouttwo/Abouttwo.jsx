import styles from "../abouttwo/Abouttwo.module.css";
import doubleQuotes from "../../../assets/image/doubleQuotes.svg.png";
import cross from "../../../assets/image/cross.png";
import meeting from "../../../assets/image/meeting.png";

export default function AboutTwo() {
    return (
        <div className={styles.main}>
            <div>
                <img src={meeting} alt="" className={styles.meeting}></img>
            </div>
            <div className={styles.section1}>
                    <img  src={doubleQuotes} alt='' className={styles.quotes} />
                <div className={styles.text}>
                    <p> Choose Stylrax for a dynamic and supportive<br/> community.
                        We provide a user-friendly<br /> interface, seamless appointment
                        management,<br /> and a secure environment for professionals to<br /> thrive
                    </p>
                </div>
                <img  src={cross} alt='' className={styles.crossImg}/>
            </div>
        </div>
    )
}

