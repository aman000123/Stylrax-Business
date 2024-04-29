import styles from "../about/About.module.css";

function About() {
  let data = (
    <p>
      {/* Stylrax, the Ultimate platform for freelancers and salon owners to
      showcase their skills and connect with <br /> clients. Empower your
      business with our innovative solutions. */}
      Partner with us. Let us handle appointments, service history, and new
      requests, so you can focus on more important thing — delivering
      exceptional customer service.
    </p>
  );

  // let data1 = "Become a part of Stylrax and Be Your Own Boss.";
  let data1 = "Stylrax empowers you to prioritize your customers!.";

  return (
    <div
      className={`${styles.bgImage} d-flex justify-content-center align-items-center text-center `}
    >
      <div
        className={`${styles.flexible} d-flex justify-content-center align-items-center flex-column `}
      >
        <div className={styles.heading}>
          <p>{data1}</p>
        </div>
        <div className={styles.desc}>{data}</div>
      </div>
    </div>
  );
}

export default About;
