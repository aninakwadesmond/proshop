import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { json, Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { addProducts } from '../stores/Feautures/Products';
import axios from 'axios';

function AdminRoutes() {
  const { userInfo } = useSelector((state) => state.userInfo);
  // const { ProductItems } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const data = useLoaderData();
  useEffect(() => {
    dispatch(addProducts(data.products));
  }, []);
  return (
    <div>{userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" />}</div>
  );
}

export async function Loader() {
  const { data } = await axios.get('http://localhost:5000/proshop', {
    withCredentials: true,
  });
  if (!data) return json({ message: 'No data available', status: '403' });

  // console.log('action data ', data);

  return data;
}

export default AdminRoutes;
