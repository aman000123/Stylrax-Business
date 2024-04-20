import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { PiUserCircleLight } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../../store/auth.slice';
import styles from "../UserProfile/UserProfile.module.css";
import { useNavigate } from 'react-router-dom';
const UserProfile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    navigate("/home")
    console.log("Logout");
  };

  return (
    <div>
      <div onClick={toggleMenu} className={styles.avtar}>
        <Avatar alt="Demy Sharp" src="/static/images/avatar/1.jpg" tabIndex={-1}/>
      </div>
      {menuOpen && (
        <Paper  className= {styles.paper} elevation={10} >
            <Paper className={styles.main} elevation={10}>
          <ul className={`${styles.profile_menu}  text-white bg-black`}>
            <div className='d-flex'>
            <Avatar alt="Demy Sharp" src="/static/images/avatar/1.jpg" className={styles.avtar_img} />
            <li className='mx-3'>D</li>
            </div>
            <div className='d-flex'>
            <PiUserCircleLight className={styles.icon}/>
            <li onClick={handleEditProfile} className={styles.profile}>Edit Profile</li>
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
