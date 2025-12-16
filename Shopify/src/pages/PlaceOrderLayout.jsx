import axios from 'axios';

import { toast } from 'react-toastify';
import Nav from '../components/Nav';
import { Outlet, useActionData, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrders } from '../stores/Feautures/Order';

function PlaceOrderLayout() {
  const data = useActionData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;
    dispatch(setOrders(data));

    navigate(`/shipping/placeOrder/order/${data._id}`);
  }, [data]);
  return (
    <div className="w-screen h-auto">
      {/* <Nav /> */}
      <Outlet />
    </div>
  );
}

export async function action({ request, params }) {
  const response = await request.formData();
  const result = Object.fromEntries(response.entries());
  console.log('to action', result);
  const orderItems = JSON.parse(result.orderItems);
  // console.log('orderItems', orderItems);
  const shippingaddress = JSON.parse(result.ShippingAddress);
  const paymentMethod = JSON.parse(result.paymentMethod);
  const itemsPrice = JSON.parse(result.itemsPrice);
  const shippingPrice = JSON.parse(result.shippingPrice);
  const taxPrice = JSON.parse(result.taxPrice);
  const totalPrice = JSON.parse(result.totalPrice);

  console.log('hello', taxPrice, shippingPrice);
  console.log(
    orderItems,
    shippingaddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  );

  const { data } = await axios.post(
    'https://proshop-8-4qyi.onrender.com/order',
    {
      orderItems,
      shippingaddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    },
    {
      withCredentials: true,
    }
  );

  if (!data) toast.error('Item not successfully ordered');
  console.log('backend data', data);

  // return redirect(`/shipping/order/${data._id}`);
  return data;
}
export default PlaceOrderLayout;
