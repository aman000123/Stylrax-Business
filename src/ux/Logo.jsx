import { NavLink } from "react-router-dom";
import logo from "../assets/image/stylrax_logo.png";

const Logo = (props) => {
  return (
    <div {...props}>
      <NavLink to="/">
        <img src={logo} alt="logo" width="230px" />
      </NavLink>
    </div>
  );
};

export default Logo;
