import React, { useEffect, useRef, useState } from 'react';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { MdOutlineAddBox } from 'react-icons/md';
import { LuSwitchCamera } from 'react-icons/lu';
import { Paper } from '@mui/material';
import styles from './SwitchSalon.module.css';
import NewSalon from '../addNewSalon/NewSalon';

const SwitchSalon = ({ salons, onSelectSalon }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const extraComponentRef = useRef(null);
  const togglePopup = (event) => {
    //event.stopPropagation();
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSalonClick = (salonName, salonImage, id) => {
    onSelectSalon(salonName, salonImage, id);
  };

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
            <div className="d-flex mt-0" onClick={togglePopup}>
              <MdOutlineAddBox className={styles.add} />
              <p>Click here to add a new salon</p>
            </div>
          </div>
          <p className={styles.select}>Select Your Salon</p>
          {salons.map((salon) => (
            <div
              key={salon.id}
              className={styles.selectSalon}
              onClick={() => handleSalonClick(salon.name, salon.mainGateImageUrl, salon.id)}
            >
              <img src={salon.mainGateImageUrl} alt={salon.name} className={styles.userImage} />
              <p>{salon.name}</p>
            </div>
          ))}
        </div>
      </Paper>
      {isPopupOpen && (
        <Modal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={isPopupOpen}
          onClose={togglePopup}
          slots={{ backdrop: StyledBackdrop }}
          
        >
          <ModalContent className='border-none'>
            <NewSalon onClose={togglePopup}/>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

SwitchSalon.propTypes = {
  salons: PropTypes.array.isRequired,
  onSelectSalon: PropTypes.func.isRequired,
};

export default SwitchSalon;

// Styles for Modal
const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div className={clsx({ 'base-Backdrop-open': open}, className)} ref={ref} {...other} />
  );
});
Backdrop.propTypes = {
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

Backdrop.displayName = 'Backdrop';

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none !important;
  -webkit-scrollbar-width: none;
 
  .MuiPaper-root { /* Target the Paper component inside the modal */
  border: none !important; /* Hide the border */
  box-shadow: none !important; /* Hide any box shadow */
}

`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: white;
  border:none;
  -webkit-tap-highlight-color: white;
`;

const ModalContent = styled('div')(
  () => css`
    display: flex;
    flex-direction: row;
    gap: 5px;
    overflow: scroll;
    height:100vh;
    border:none;
    padding-top:40px;
    margin-bottom:80px;
    ::-webkit-scrollbar {
      display: none !important; /* Hide scrollbar for webkit browsers (Chrome, Safari, etc.) */
      border:none !important
    }
  `
);
