import React from 'react';
import Navbar from "../Component/Navbar/Navbar";
import Login from '../Component/LoginPage/Login';
import Comment from '../Component/Comments/Comment';
import Registration from '../Component/Registration/Registration';
import Feedback from '../Component/Feedback/Feedback';
import Team from '../Component/Team/Team';
import Overview from '../Component/Overview/Overview';
import Footer from '../Component/Footer/Footer';
import Support from '../Component/Support/Support';
import DownloadApp from '../Component/DownloadApp/DownloadApp';
import About from "../Component/about/About";
import Counter from '../Component/counter/Counter';
import AboutOne from '../Component/aboutOne/AboutOne';
import AboutTwo from '../Component/aboutTwo/AboutTwo';
import Explore from '../Component/explore/Explore';
import Review from '../Component/review/Review';
import Partners from '../Component/partners/Partners';



const Home = () => {
  return (
    <>
   <Navbar/>
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
   <Partners/>
  <Team/>
  <Support/>
 
  
  <Footer/>
  
   </>
  );
}

export default Home;
