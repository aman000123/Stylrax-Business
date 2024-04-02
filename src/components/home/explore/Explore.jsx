import styles from "../explore/Explore.module.css";

export default function Explore() {

    let data = <p>&quot;Explore success stories from freelancers and salon owners
        who have<br /> thrived on Stylrax. Learn how our platform has helped
        them expand their<br /> client base and achieve new heights in their careers</p>
    return (
        <div className={styles.textCenter}>
            <p className="text-center">{data}</p>
        </div>
    )
}

