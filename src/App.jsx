
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AppRoute from './AppRoute';
import './App.css';

function App() {

   // Get the auth state from the store
   const auth = useSelector(state => state.auth);
   const isVerifiedUser = useSelector(state => state.auth.isVerifiedUser);
   return (
      <>
         <AppRoute authToken={auth.token} isVerifiedUser={isVerifiedUser} />
         <ToastContainer />
      </>
   );
}

export default App;

