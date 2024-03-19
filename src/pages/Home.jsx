import React from 'react';
import Login from '../components/LoginPage/Login';
import Comment from '../components/Comments/Comment';
import Registration from '../components/Registration/Registration';
import Feedback from '../components/Feedback/Feedback';
import Team from '../components/Team/Team';
import Overview from '../components/Overview/Overview';
import Footer from '../components/Footer/Footer';
import Support from '../components/Support/Support';
import DownloadApp from '../components/DownloadApp/DownloadApp';
import About from "../components/about/About";
import Counter from '../components/counter/Counter';
import AboutOne from '../components/aboutOne/AboutOne';
import AboutTwo from '../components/aboutTwo/AboutTwo';
import Explore from '../components/explore/Explore';
import Review from '../components/review/Review';
import Partners from '../components/partners/Partners';
import Navbar from "../components/Navbar/Navbar";
import menuItems from '../components/navData/data';



const Home = () => {
  return (
    <>
    <Navbar data={menuItems}/>
   <Login/>
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
   <DownloadApp/>
   <Partners/>3
  <Team/>
  <Support/>
  <Footer/>
  
   </>
  );
}

export default Home;
