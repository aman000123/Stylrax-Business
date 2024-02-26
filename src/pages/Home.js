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

const Home = () => {
  return (
    <>
   <Navbar/>
   <Login/>
   <Comment/>
   <Registration/>
   <Feedback/>
  <Team/>
  <Overview/>
  <DownloadApp/>
  <Support/>
  <Footer/>
  
   </>
  );
}

export default Home;
