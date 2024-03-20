import barber1 from "../../../assets/image/barber1.png";
import barber2 from "../../../assets/image/barber2.png";
import barber3 from "../../../assets/image/barber3.png";
import barber4 from "../../../assets/image/barber4.png";
import doubleQuotes from "../../../assets/image/doubleQuotes.svg.png";
import cross from "../../../assets/image/cross.png";
import styles from "../aboutone/Aboutone.module.css";


export default function AboutOne() {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.sectionOne}>
                <div>
                    <img src={barber1} alt=''></img>
                    <img src={barber2} alt=''></img>
                </div>
                <div>
                    <img src={barber3} alt=''></img>
                    <img src={barber4} alt=''></img>
                </div>
            </div>

            <div className={styles.section2}>
                <div className={styles.imgOne}>
                    <img src={doubleQuotes} alt=''/>
                </div>
                <div className={styles.text}>
                    <p> At Stylrax, We are dedicated to<br /> revolutionizing the way
                        freelancers and<br />  Salon owners grow their businesses.<br />
                        Discover how platform creates<br /> opportunities for
                        professionals to reach a<br /> wider audience and succeed in their<br /> endeavors  
                       </p>
                </div>
                <div className={styles.img2}>
                    <img className='img2' src={cross} alt=''/>
                </div>
            </div>
        </div>

    )
}


