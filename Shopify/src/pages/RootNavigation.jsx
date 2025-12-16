import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import axios from 'axios';

function RootNavigation() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

// export async function action({ request, params }) {
//   await axios.get('https://proshopy-i2wk.onrender.com/user/logout');
// }

export default RootNavigation;
