import styles from "../Viewmore/Viewmore.module.css";
import { Paper } from '@mui/material';
import stylistimg1 from "../../../assets/image/stylistimg1.png"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from "react";
import { getSalonSingleService } from "../../../api/salon.management";

const data = [
    {
        img: stylistimg1,
        hairstyle: "Under Fade",
        rupee: "100",
        edit : "Edit"
    },

    {
        img: stylistimg1,
        hairstyle: "Under Fade",
        rupee: "100",
        edit : "Edit"
    },

    {
        img: stylistimg1,
        hairstyle: "Under Fade",
        rupee: "200",
        edit : "Edit"
    },

    {
        img: stylistimg1,
        hairstyle: "Under Fade",
        rupee: "400",
        edit : "Edit"
    },

    {
        img: stylistimg1,
        hairstyle: "Under Fade",
        rupee: "500",
        edit : "Edit"
    }
]


function ViewMore({id}) {
    const[service,setService] = useState([])
    console.log("single service salon",id)
    useEffect(()=>{
        const getService = async()=>{
        const res = await getSalonSingleService(id)
        const service = res.data;
        setService(service)
        }
        getService();
        },[])
      
    return (
        <div className={styles.mainDiv}>
            <p className={styles.para}>Haircut</p>
            {
                data.map((value) => (
                    <Paper key ={data.id} className={styles.paper}>
                        <img src={value.img} alt='' />
                        <div className={styles.secDiv}>
                            <div>
                                <p className={styles.spanOne}>{value.hairstyle}</p>
                                <p>{value.rupee}<CurrencyRupeeIcon className={styles.rupee} /></p>
                            </div>
                            <Switch />
                        </div>
                        <button>{value.edit}</button>
                    </Paper>
                ))
            }
            <Paper className={styles.paper}>
                <img src={stylistimg1} alt='' />
                <div className={styles.secDiv}>
                    <div>
                        <p className={styles.spanOne}>Under Fade</p>
                        <p>100<CurrencyRupeeIcon className={styles.rupee} /></p>
                    </div>
                    <Switch />
                </div>
                <button>Edit</button>
            </Paper>
        </div>
    )
}

export default ViewMore
