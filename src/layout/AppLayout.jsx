import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {

    console.log("AppLayout");
    //Check if token is present in local storage
    //If not redirect to login page


    useEffect(() => {
        console.log("AppLayout useEffect");
    }
    , []);

    return (
        <div>
           <Outlet/>
        </div>
    );
};

export default AppLayout;