import { Paper } from '@mui/material';
import { LuSwitchCamera } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
import orangeSpecs from "../../../assets/image/orangeSpecs.png";
import styles from "./SwitchSalon.module.css";
const SwitchSalon = () => {
    const salonData = [
        { id: 1, name: "Hair Salon", image: orangeSpecs },
        { id: 2, name: "Hair Salon", image: orangeSpecs },
        { id: 3, name: "Hair Salon", image: orangeSpecs },
      ];
  return (
    
    <Paper className={`${styles.switchPaper}`} elevation={15}style={{ borderRadius: '15px' }}>
        <div className={styles.main}>
      <div className={styles.mainDiv}>
        <div className='d-flex'>
      <LuSwitchCamera className={styles.switch}/>
      <p>Switch Salon</p>
      </div>
      <p className='fw-bold'>or</p>
      <div className='d-flex mt-0'>
      <MdOutlineAddBox className={styles.add}/>
      <p>Click Here to Add New Salon</p>
      </div>
      </div>
      <p className={styles.select}>Select Your Salon</p>
      {salonData.map((salon) => (
        <div key={salon.id} className={styles.selectSalon}>
          <img src={salon.image} alt={salon.name} className={styles.userImage}/>
          <p>{salon.name}</p>
        </div>
      ))}
      </div>
    </Paper>
  );
}

export default SwitchSalon;
