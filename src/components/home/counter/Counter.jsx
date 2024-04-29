import styles from "../counter/Counter.module.css";


const data = [
    {
        // num: "40,000",
        txt: "Genuine Customers"
    },

    {
        // num: "₹1547Cr",
        txt: "Nearby Service Areas"
    },

    {
        // num: "1,250,000+",
        txt: "Safe and Secure Platform"
    },
]


export default function Counter() {
    return (
        <div className={`${styles.banner3} `}>
            <div className={`${styles.textContent} d-flex justify-content-center align-items-center text-white`}>
                {data.map((item,index) => (
                    <div className={`${styles.content} text-center`} key={index}>
                        <p className={styles.num}>{item.num}</p>
                        <p className={styles.txt}>{item.txt}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}




