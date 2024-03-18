
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AppRoute from './AppRoute';

function App() {

   const authToken = useSelector(state => state.auth.token);
   const location = useLocation();

   if (!authToken && location.pathname !== "/") {
      return <Navigate to="/" />;
   }

   return (
      <>
         <AppRoute authToken={authToken} />
         <ToastContainer />
      </>
   );
}

export default App;

