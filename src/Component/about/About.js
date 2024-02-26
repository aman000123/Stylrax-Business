import React from 'react'
import styles from "../../assets/scss/pages/home/about.module.css";

function About() {

  let data = <p>Stylrax, the Ultimate platform for freelancers and salon owners to showcase their skills
  and connect with <br/> clients. Empower your business with our innovative solutions.</p>
  return (
    <div className={styles.bgImage}>
      <div className={styles.flexible}>
        <div className={styles.heading}>
          <p>Become a part of Stylrax and Be Your Own Boss.</p>
        </div>
        <div className={styles.desc}>
          {data}
        </div>
      </div>
    </div>
  )
}

export default About;