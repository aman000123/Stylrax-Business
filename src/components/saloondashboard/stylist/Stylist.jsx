import styles from "./Stylist.module.css";
import stylistimg1 from "../../../assets/image/stylistimg1.png";
import stylistimg2 from "../../../assets/image/stylistimg2.png";
import stylistimg3 from "../../../assets/image/stylistimg3.png";
import stylistimg4 from "../../../assets/image/stylistimg4.png";
import stylistimg5 from "../../../assets/image/stylistimg5.png";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


let data = [
    {
        imgsrc: stylistimg1,
        aboutstylistOne: "Debhasis",
        aboutstylistTwo: "HairStylist and Stylist Artist",
        aboutstylistThree: "* 4.2(1.2k)Rating",
    },

    {
        imgsrc: stylistimg2,
        aboutstylistOne: "Debhasis",
        aboutstylistTwo: "HairStylist and Stylist Artist",
        aboutstylistThree: "* 4.2(1.2k)Rating",
    },

    {
        imgsrc: stylistimg3,
        aboutstylistOne: "Debhasis",
        aboutstylistTwo: "HairStylist and Stylist Artist",
        aboutstylistThree: "* 4.2(1.2k)Rating",
    },

    {
        imgsrc: stylistimg4,
        aboutstylistOne: "Debhasis",
        aboutstylistTwo: "HairStylist and Stylist Artist",
        aboutstylistThree: "* 4.2(1.2k)Rating",
    },

    {
        imgsrc: stylistimg5,
        aboutstylistOne: "Debhasis",
        aboutstylistTwo: "HairStylist and Stylist Artist",
        aboutstylistThree: "* 4.2(1.2k)Rating",
    },

]
function Stylist() {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.secDiv}>
                <h4>Stylist</h4>
            </div>

            <div className={styles.content}>
                {
                    data.map((value, index) => (
                        <paper key={index} className={styles.paper}>
                            <div className={styles.stylist}>
                                <div>
                                    <img src={value.imgsrc} alt='' />
                                </div>

                                <div className={styles.aboutStylist}>
                                    <p>{value.aboutstylistOne}<br />
                                        <span className={styles.spanOne}>{value.aboutstylistTwo}</span><br />
                                        <span className={styles.spanTwo}>{value.aboutstylistThree}</span>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <MoreHorizIcon className={styles.dots} />
                            </div>
                        </paper>
                    ))
                }
            </div>

        </div>
    )
}

export default Stylist
