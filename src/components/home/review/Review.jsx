import styles from "../review/Review.module.css";
import poster from "../../../assets/image/poster.png";


let data = [
    {
        about: <p>&quot;Love this platform! Easy sign-up, smooth appointments,
            and a safe space for freelancers and salons. Highly recommended
            for a hassle-free experience!&quot;</p>,
        img: poster,
        name: "Anil Kumar",
        profession: "Salon Owner, Big Boss"
    },

    {
        about: <p>&quot;Love this platform! Easy sign-up, smooth appointments,
            and a safe space for freelancers and salons. Highly recommended
            for a hassle-free experience!&quot;</p>,
        img: poster,
        name: "Anil Kumar",
        profession: "Salon Owner, Big Boss"
    },

    {
        about: <p>&quot;Love this platform! Easy sign-up, smooth appointments,
            and a safe space for freelancers and salons. Highly recommended
            for a hassle-free experience!&quot;</p>,
        img: poster,
        name: "Anil Kumar",
        profession: "Salon Owner, Big Boss"
    }
]

export default function Review() {
    return (
        <>
            <div className={`${styles.main} d-flex align-items-center`}>
                {
                    data.map((value) => (
                        <div className={`${styles.child} d-flex flex-column`}>
                            <p>{value.about}</p>
                            <div className={`${styles.flexDiv} d-flex justify-content-center align-items-center`}>
                                <div className={styles.imgDiv}>
                                    <img src={value.img} alt='' />
                                </div>
                                <div className={`${styles.textDiv} d-flex justify-content-between flex-column`}>
                                    <p>{value.name}</p>
                                    <h6>{value.profession}</h6>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}



