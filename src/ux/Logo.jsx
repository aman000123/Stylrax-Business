import { Link } from "react-router-dom";
import logo from "../assets/image/stylrax_logo.png";
import { useNavigate } from "react-router-dom";
const Logo = (props) =>{
    const navigate = useNavigate();

      const handleLogoClick = () => {
        navigate("/dashboard");
      };
      return(
        <div {...props}>
         <Link href="/dashboard"> <img src={logo} alt="logo" onClick={handleLogoClick}/></Link>  
        </div>
    )
}
export default Logo;
