import Avatar from '@mui/material/Avatar';
import { useState, useEffect, useRef } from 'react';
import { PiUserCircleLight } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeSalonID, removeSalons, removeToken, removeUserInfo } from '../../../store/auth.slice';
import styles from "../UserProfile/UserProfile.module.css";
import { useNavigate } from 'react-router-dom';
import Session from '../../../service/session';

const UserProfile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const profile = Session.get("profileImageUrl")
  const firstName = Session.get("firstName")

  console.log("radhya image::>",profile)
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

  const handleEditProfile = () => {
    // Logic for handling Edit Profile action
    console.log("Edit Profile");
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
            <div className='d-flex'>
            <PiUserCircleLight className={styles.icon}/>
            <li onClick={handleEditProfile} className={styles.profile}>Edit profile</li>
            </div>
            <div className='d-flex'onClick={handleLogout}>
                <IoLogOutOutline className={`${styles.icon}`}/>
            <li >Logout</li>
            </div>
          </ul>
          </Paper>
        </Paper>
      )}
    </div>
  );
}

export default UserProfile;
