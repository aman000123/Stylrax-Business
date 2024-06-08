import Navbar from '../../../layout/navbar/Navbar';
import About from '../about/About';
import Counter from "../counter/Counter";
import Overview from "../overview/Overview";
import AboutOne from "../aboutone/Aboutone"
import AboutTwo from "../abouttwo/Abouttwo";
import Comment from '../comment/Comment';
import Registration from "../registration/Registration";
import Feedback from '../feedback/Feedback';
import Explore from '../explore/Explore';
import Review from "../review/Review";
import DownloadApp from "../downloadapp/DownloadApp";
import Partners from "../partners/Partners";
import Team from "../team/Team";
import Support from '../support/Support';
import Footer from "../footer/Footer";
import menuItems from '../../../data/navdata/Data';
import LoginForm from '../../authentication/login/LoginForm';
const Main = () => {
  return (
    <>
    <Navbar data={menuItems} redirect="/"/>
    <LoginForm/> 
    <About/> 
    <Counter/>
    <Overview/>
    <AboutOne/>
    <AboutTwo/>
    <Comment/> 
    <Registration/>
    <Feedback/>
    <Explore/>
    <Review/>
    {/* <DownloadApp/> */}
    <Partners/>
    <Team/>
    <Support/>
    <Footer redirect="/"/>
    </>
  );
}

export default Main;
