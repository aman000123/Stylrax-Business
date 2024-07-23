import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./store/auth.slice";
import { Navigate, Outlet } from "react-router-dom";
import { getProfile } from "./api/account.api";
import PropTypes from 'prop-types';

const AppLayout = ({ authToken, isVerifiedUser }) => {
  const dispatch = useDispatch();
  if (!authToken) {
    return <Navigate to="/home" />;
  } else if (!isVerifiedUser) {
    return <Navigate to="/account/create" />;
  }

 

    useEffect(() => {
        loadProfileInfo();
    }, [authToken]);

    const loadProfileInfo = async () => {
        const { data} = await getProfile();
        const storyPayload = {
            profileStatus: data.profileStatus,
            email: data.email,
            phoneNumber: data.phoneNumber,
          //  id: salons.map(salon => salon.id),
            role: data.role,
        }
        dispatch(setUserInfo(storyPayload));
    };

    return (
        <Outlet />
    );
};

AppLayout.propTypes = {
  authToken: PropTypes.string,
  isVerifiedUser: PropTypes.bool
};
export default AppLayout;
