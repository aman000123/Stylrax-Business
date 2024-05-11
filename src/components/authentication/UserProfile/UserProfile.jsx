import React, { useState, useEffect, useRef } from 'react';
import { PiUserCircleLight } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeSalonID, removeSalons, removeToken, removeUserInfo } from '../../../store/auth.slice';
import styles from "../UserProfile/UserProfile.module.css";
import { useNavigate } from 'react-router-dom';
import Session from '../../../service/session';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import EditProfile from '../../editprofile/EditProfile';
const UserProfile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const profile = Session.get("profileImageUrl")
  const firstName = Session.get("firstName")

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    console.log("Toggle popup called");
    setIsPopupOpen(!isPopupOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };



  const handleLogout = () => {
    dispatch(removeToken());
    dispatch(removeUserInfo());
    dispatch(removeSalonID());
    dispatch(removeSalons());
    
    navigate("/home");
    console.log("Logout");
  };

  return (
    <div ref={menuRef}>
      <div onClick={toggleMenu} className={styles.avtar}>
        <img src={profile} className={styles.avtar_img} tabIndex={-1} />
      </div>
      {menuOpen && (
        <Paper  className= {styles.paper} elevation={10} >
            <Paper className={styles.main} elevation={10}>
          <ul className={`${styles.profile_menu}  text-white bg-black`}>
            <div className='d-flex'>
            <img src={profile} className={styles.avtar_img} />
            <li className='mx-3'>{firstName}</li>
            </div>
            <div className='d-flex'onClick={togglePopup}>
            <PiUserCircleLight className={styles.icon}/>
            <li className={styles.profile}>Edit profile</li>
            </div>
            <div className='d-flex'onClick={handleLogout}>
                <IoLogOutOutline className={`${styles.icon}`}/>
            <li >Logout</li>
            </div>
          </ul>
          </Paper>
        </Paper>
      )}
 {isPopupOpen && (
        <Modal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={isPopupOpen}
          onClose={togglePopup}
          slots={{ backdrop: StyledBackdrop }}
        >
          <ModalContent>
            <EditProfile onClose={togglePopup} />
          </ModalContent>
        </Modal>
      )}    </div>
  );
}

export default UserProfile;
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
  background-color: rgba(255, 255, 255, 0.8);
  border:none !important;
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
  background-color: grey;
  border:none;
  `;

const ModalContent = styled('div')(
  () => css`
    display: flex;
    flex-direction: row;
    gap: 5px;
    overflow: auto;
    height: 100vh;
    border:none;
    margin-top:60px;
    padding-bottom:60px;

    ::-webkit-scrollbar {
      display: none !important; /* Hide scrollbar for webkit browsers (Chrome, Safari, etc.) */
      border:none !important
    }
  `);