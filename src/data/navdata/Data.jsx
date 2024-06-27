import PhoneIcon from "@mui/icons-material/Phone";
import { FaClipboardList } from "react-icons/fa";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { MdOutlineContentCut } from "react-icons/md";
import UserProfile from "../../components/authentication/UserProfile/UserProfile";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    id: 1,
    icon: (
      <NavLink href="tel:+918700882039" style={{ textDecoration: 'none', color: 'inherit' }}>
        <PhoneIcon />
        <span style={{ marginLeft: '5px' }}>+91 8700882039</span>
      </NavLink>
    )
  },
  {
    id: 2,
    icon: (
      <NavLink href="mailto:support@stylrax.com" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MailOutlineIcon />
        <span style={{ marginLeft: '5px' }}>support@stylrax.com</span>
      </NavLink>
    )
  }
];

export const navItems = [
  {
    id: 1,
    icon: <MdOutlineContentCut style={{ fontSize: '22px' }} />,
    text: "Salon Management",
    link: "salon/management"
  },
  {
    id: 2,
    icon: <FaClipboardList style={{ fontSize: '22px' }} />,
    text: "Appointments",
    link: 'salon/appointment'
  },
  {
    id: 3,
    icon: <UserProfile />
  },
  // { id: 4, icon: <FaBell style={{}} />, link: 'notification' }
];

export default menuItems;
