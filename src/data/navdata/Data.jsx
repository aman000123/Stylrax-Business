import PhoneIcon from "@mui/icons-material/Phone";
import { FaClipboardList } from "react-icons/fa";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { MdOutlineContentCut } from "react-icons/md"
import { FaBell } from "react-icons/fa";
import UserProfile from "../../components/authentication/UserProfile/UserProfile";

const menuItems = [
  { id:1,icon: <PhoneIcon />, text: "+91 9988776544" },
  { id:2,icon: <MailOutlineIcon />, text: "samplemail.com" },
];
export const navItems = [
    { id:1,icon: <MdOutlineContentCut style={{fontSize:'22px'}}/>, text: "Salon Management", link: "salon/management"},
    { id:2,icon: <FaClipboardList style={{fontSize:'22px'}} />, text: "Appointments" ,link:'salon/appointment'},
    { id: 3, icon: <UserProfile/>, text: "D" },
 
    { id:4,icon:<FaBell style={{}}/>,link:'notification'}
  ];
export default menuItems;
