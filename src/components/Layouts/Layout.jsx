import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { useCheckSession } from "../../services/hooks/useCheckSession"

const Layout = () => {
  const checkSession = useCheckSession()
  return (
    <div className='d-flex flex-row'>
      <Navbar />
      
        <Outlet />
      
    </div>
  );
};

export default Layout;
