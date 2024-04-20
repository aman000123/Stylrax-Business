import { Paper } from '@mui/material';
import { LuSwitchCamera } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
import styles from "./SwitchSalon.module.css";
// import { useEffect } from 'react';
// import { getSalon } from '../../../api/salon.api';
// import Notify from '../../../utils/notify'
const SwitchSalon = ({salons,show,onSelectSalon}) => {
  console.log("salons::::>",salons);
  console.log("show::::>",show);
  const handleSalonClick = (salonName, salonImage,id) => {
    onSelectSalon(salonName, salonImage,id); // Call the callback function with selected salon name and image and id
  };
 
  return (

    <Paper className={`${styles.switchPaper}`} elevation={15} style={{ borderRadius: '15px' }}>
      <div className={styles.main}>
        <div className={styles.mainDiv}>
          <div className='d-flex'>
            <LuSwitchCamera className={styles.switch} />
            <p>Switch Salon</p>
          </div>
          <p className='fw-bold'>or</p>
          <div className='d-flex mt-0'>
            <MdOutlineAddBox className={styles.add} />
            <p>Click Here to Add New Salon</p>
          </div>
        </div>
        <p className={styles.select}>Select Your Salon</p>
        {salons.map((salon) => (
          <div
            key={salon.id}
            className={styles.selectSalon}
            onClick={() => handleSalonClick(salon.name, salon.mainGateImageUrl,salon.id)} // Handle salon click
          >
            <img
              src={salon.mainGateImageUrl}
              alt={salon.name}
              className={styles.userImage}
            />
            <p>{salon.name}</p>
          </div>
        ))}
      </div>
    </Paper>
  );
}

export default SwitchSalon;
