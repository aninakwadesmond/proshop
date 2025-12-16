import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function ShippingAcocunt() {
  const { userInfo } = useSelector((state) => state.userInfo);
  console.log(userInfo);
  return <div>{userInfo ? <Outlet /> : <Navigate to="/login" replace />}</div>;
}

export default ShippingAcocunt;
