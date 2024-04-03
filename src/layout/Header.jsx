import  "./layout.css";
import Logo from "../ux/Logo";
import { Stack } from "react-bootstrap";

const Header = ({children}) => {
  return (
    <Stack direction="horizontal" className="bg-black text-white layout__header px-5">
            <Logo className="logo"/>
            <div className="ms-auto">
                {children}
            </div>
    </Stack>
  );
};
export default Header;