import { LiaUserClockSolid } from "react-icons/lia";
import hair from "../../assets/image/hair.png";
import PhoneIcon from "@mui/icons-material/Phone";
import { FaClipboardList } from "react-icons/fa";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { MdOutlineContentCut } from "react-icons/md";

import { FaBell } from "react-icons/fa";
const menuItems = [
  { id:1,icon: <PhoneIcon />, text: "+91 9988776544" },
  { id:2,icon: <MailOutlineIcon />, text: "samplemail.com" },
  { id:3,icon: <AccountCircleOutlinedIcon />, text: "Sign in" }
];
export const navItems = [
    { id:1,icon: <MdOutlineContentCut style={{fontSize:'22px'}}/>, text: "Salon Management", link:"salon-management" },
    { id:2,icon: <FaClipboardList style={{fontSize:'22px'}} />, text: "Appointments" ,link:'appointment'},
    { id:3,icon: <AccountCircleOutlinedIcon/>, text: "HairClinic",link:'hair-clinic' },
    { id:4,icon:<FaBell/>,link:'notification'}
  ];
export default menuItems;
