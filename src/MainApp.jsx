import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './store/auth.slice';
import { Navigate, Outlet } from 'react-router-dom';
import { getProfile } from './api/account.api';

const AppLayout = ({ authToken }) => {

    const dispatch = useDispatch();

   if (!authToken) {
      return <Navigate to="/home" />;
   }

    useEffect(() => {
        loadProfileInfo();
    }, [authToken]);

    const loadProfileInfo = async () => {
        const { data } = await getProfile();
        const storyPayload = {
            profileStatus: data.profileStatus,
            email: data.email,
            phoneNumber: data.phoneNumber,
            role: data.role,
        }
        dispatch(setUserInfo(storyPayload));
    };

    return (
        <Outlet />
    );
};

export default AppLayout;
