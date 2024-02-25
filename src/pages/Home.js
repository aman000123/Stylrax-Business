import React from 'react';
import Navbar from "../Component/Navbar/Navbar";
import Banner from '../Component/Banner/Banner';
import Comment from '../Component/Comments/Comment';
import Registration from '../Component/Registration/Registration';
import Feedback from '../Component/Feedback/Feedback';
import Team from '../Component/Team/Team';
import Banner4 from '../Component/Banner4/Banner4';
import Footer from '../Component/Footer/Footer';
import Support from '../Component/Support/Support';
import DownloadApp from '../Component/DownloadApp/DownloadApp';
const Home = () => {
  return (
    <>
   <Navbar/>
   <Banner/>
   <Comment/>
   <Registration/>
   <Feedback/>
  <Team/>
  <Banner4/>
  <DownloadApp/>
  <Support/>
  <Footer/>
  
   </>
  );
}

export default Home;
