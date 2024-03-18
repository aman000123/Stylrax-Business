import React from 'react'
import styles from "../../assets/scss/pages/home/counter.module.css";


const data = [
    {
        num: "40,000",
        txt: "Partners already on board"
    },

    {
        num: "₹1547Cr",
        txt: "Paid out to partners in 2022"
    },

    {
        num: "1,250,000+",
        txt: "Services delivered each month"
    },
]


export default function Counter() {
    return (
        <div className={styles.banner3}>
            <div className={styles.textContent}>
                {data.map((item,index) => (
                    <div className={styles.content} key={index}>
                        <p className={styles.num}>{item.num}</p>
                        <p className={styles.txt}>{item.txt}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}




