import Navbar from "../components/saloondashboard/navbar/Navbar";
import { navItems } from '../../src/data/navdata/Data';
import { Outlet } from 'react-router-dom';
function SalonDashboard() {
  return (
    <>
    <Navbar data={navItems}/>
    <Outlet/>
    </>

  )
}

export default SalonDashboard;