import  { useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { MdOutlineAddBox } from 'react-icons/md';
import { LuSwitchCamera } from 'react-icons/lu';
import { Paper } from '@mui/material';
import styles from './SwitchSalon.module.css';
import { useNavigate } from 'react-router-dom';

const SwitchSalon = ({ salons, onSelectSalon , selectedSalonId }) => {
  const navigate = useNavigate();
 

  const handleSalonClick = (salonName, salonImage, id,homeService) => {
    onSelectSalon(salonName, salonImage, id,homeService);
  };
  useEffect(() => {
    const selectedSalon = document.querySelector(`.selectSalon[data-id='${selectedSalonId}']`);
    if (selectedSalon) {
      const allSalons = document.querySelectorAll('.selectSalon');
      allSalons.forEach((salon) => salon.classList.remove('selected'));
      selectedSalon.classList.add('selected');
    }
  }, [selectedSalonId]);
  return (
    <>
      <Paper className={`${styles.switchPaper}`} elevation={15} style={{ borderRadius: '15px' ,border:'none'}}>
        <div className={styles.main}>
          <div className={styles.mainDiv}>
            <div className="d-flex">
              <LuSwitchCamera className={styles.switch} />
              <p>Switch salon</p>
            </div>
            <p className="fw-bold">or</p>
            <div className="d-flex mt-0" onClick={() => navigate('/salon/dashboard/newsalon')}>
              <MdOutlineAddBox className={styles.add} />
              <p>Click here to add a new salon</p>
            </div>
          </div>
          <p className={styles.select}>Select Your Salon</p>
          {salons.map((salon) => (
             <div
             key={salon.id}
             className={clsx(styles.selectSalon, { [styles.selected]: salon.id === selectedSalonId })}
             onClick={() => handleSalonClick(salon.name, salon.mainGateImageUrl, salon.id,salon.homeService)}
           >
              <img src={salon.mainGateImageUrl} alt={salon.name} className={styles.userImage} />
              <p>{salon.name}</p>
            </div>
          ))}
        </div>
      </Paper>
    </>
  );
};

SwitchSalon.propTypes = {
  salons: PropTypes.array.isRequired,
  onSelectSalon: PropTypes.func.isRequired,
};

export default SwitchSalon;


