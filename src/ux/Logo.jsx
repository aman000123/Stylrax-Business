import { Link, NavLink } from "react-router-dom";
import logo from "../assets/image/stylrax_logo.png";

const Logo = (props) => {
  return (
    <div {...props}>
        <img src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
