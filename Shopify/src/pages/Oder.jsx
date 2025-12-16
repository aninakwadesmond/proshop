import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { json, useActionData, useNavigate } from 'react-router-dom';
import { setOrders } from '../stores/Feautures/Order';

function Oder() {
  const { orders } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.userInfo);
  const { open } = useSelector((state) => state.responsive);

  console.log('got order ', orders);
  const orderFromStore = orders[0] || orders;
  // console.log('orders Reloaded', orderFromStore);
  Object.keys(orders).length > 0 && orders.length > 0 ? orders[0] : orders;

  const [orderFromStorage, setOrderStorage] = useState(orderFromStore);

  const dispatch = useDispatch();

  console.log('array', Object.keys(orders));

  console.log('orderId ', orderFromStorage);
  const {
    _id: id,
    isDeliverd,
    isPaid,
    itemPrice,
    orderItems,
    paymentMethod,
    shippingPrice,
    taxPrice,
    shippingaddress,
    user,
    totalPrice,
    updatedAt,
    createdAt,
  } = orderFromStorage;
  const navigate = useNavigate();
  useEffect(() => {
    // async function getOrder() {
    //   const { data } = await axios.get(`https://proshop-8-4qyi.onrender.com/order/${id}`);
    //   dispatch(setOrderStorage(data));
    //   console.log('data', data);
    // }
    const ref = new URLSearchParams(location.search).get('reference');
    console.log('yourred ', ref);
    if (!ref) return;

    axios
      .get(`https://proshop-8-4qyi.onrender.com/order/verify?reference=${ref}`)
      .then((res) => {
        console.log('return back', res.data, res.data.data);

        dispatch(setOrderStorage(res.data.data));
        // navigate(`/shipping/placeOrder/order/${id}`);
      });
    // getOrder();
  }, []);

  console.log('check', orderFromStorage, orders);
  async function handlePay() {
    console.log('start pay 1');
    const callbackUrl = `${window.location.origin}/shipping/placeOrder/order/${id}`;
    console.log('start pay 1.5', callbackUrl);
    const { data } = await axios.post(
      `https://proshop-8-4qyi.onrender.com/order/${id}/pay`,
      {
        userEmail: user?.email || userInfo?.email,
        totalPrice,
        callbackUrl: callbackUrl,
      },
      { withCredentials: true }
    );
    console.log(data);
    console.log('start pay 2');
    window.location.href = data.paymentUrl;
  }

  async function handleDelivered() {
    const { data } = await axios.put(
      `https://proshop-8-4qyi.onrender.com/order/${id}/delivered`,
      { isDeliverd: true },

      { withCredentials: true }
    );
    if (!data) return json({ message: 'failed' });

    console.log('delivered', data);

    dispatch(setOrders(data));
  }

  return (
    <div
      className="grid grid-cols-12 w-[95%] mx-auto mt-2 gap-15 pr-10 overflow-x-hidden"
      style={open ? { marginTop: '7rem' } : {}}
    >
      <div className="flex flex-col items-start justify-center gap-6 col-span-12 md:col-span-8">
        <h2 className="font-bold md:text-2xl text-md text-gray-600 tracking-tighter col-span-8 text-start  ">
          Order {id}
        </h2>
        <div className="flex flex-col items-start justify-center gap-2 w-full border-b-1 border-zinc-300/70">
          <h3 className="text-xl text-gray-600 tracking-tight capitalize font-semibold">
            Shipping
          </h3>
          <div className="flex flex-col items-start justify-center g-1 w-full">
            <p className="flex items-center justify-start gap-2 w-full text-gray-500 flex-row">
              <span className="font-bold text-sm">Name:</span>
              <span className="font-semibold text-sm tracking-tighter">
                {user.name}
              </span>
            </p>
            <p className="flex items-center justify-start gap-2 w-full text-gray-500 flex-row">
              <span className="font-bold text-900 text-sm">Email:</span>
              <span className="font-semibold text-sm text-700 tracking-tighter">
                {user.email}
              </span>
            </p>
            <p className="flex items-center justify-start gap-2 w-full text-gray-500 flex-row">
              <span className="font-bold text-900 text-sm">Address:</span>
              <span className="font-semibold text-sm text-700 tracking-tighter">
                {shippingaddress.address}, {shippingaddress.city}{' '}
                {shippingaddress.PostalCode} ,{shippingaddress.country}
              </span>
            </p>
            <p
              className={`w-full bg-red-200 px-6 py-2 rounded-md border-1 border-zinc-100 font-semibold text-md my-2 ${
                orders.isDeliverd ? `bg-emerald-300` : `bg-red-400`
              } `}
              style={
                orders.isDeliverd
                  ? { backgroundColor: 'green', opacity: 0.7 }
                  : {}
              }
            >
              {!isDeliverd ? ' Not Delivered' : `Delivered on ${updatedAt}`}
            </p>
          </div>
        </div>
        <div className=" border-b border-zinc-300/70 flex flex-col items-start justify-center gap-1 w-full">
          <h2 className="font-bold text-xl text-gray-500 capitalize tracking-tighter">
            Payment method
          </h2>
          <p className="flex items-center justify-start gap-2 text-gray-500">
            <span className="font-bold text-sm">Method:</span>
            <span className="font-semibold text-sm">{paymentMethod}</span>
          </p>
          <p
            className={`w-full px-6 py-2 rounded-md border-1 border-zinc-100 font-semibold text-md text-gray-600 my-3  ${
              isPaid
                ? 'bg-emerald-200 text-emerald-700'
                : ' bg-red-200 text-red-600'
            }`}
          >
            {!isPaid ? ' Not Paid' : `Paid  on ${createdAt}`}
          </p>
        </div>
        <div className="flex flex-col w-full gap-2 text-xl text-gray-500 tracking-lg font-bold">
          <h2> Order Items</h2>
          <div className="flex flex-col items-start justify-center gap1 border-[0.5px] border-zinc-300/70 rounded-md w-[25rem] sm:w-full">
            {orderItems.map((el) => (
              <EachOrder order={el} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center col-span-12 md:col-span-4 shadow-xl shadow-gray-950/10 rounded-md max-h-max border-1 border-zinc-400/50 mt-10 w-[20rem]">
        <h2 className="font-bold tracking-normal text-md md:sm-text-2xl text-gray-500 px-4 py-3 border-b-1 border-zinc-300/50 w-full">
          Order Summary
        </h2>
        <div className="flex mt-1 flex-col items-start justify-center gap-1 w-[70%] mx-auto ">
          <p className="capitalize flex items-center justify-between w-full">
            <span className="md:text-sm font-semibold text-gray-500 text-[12px]">
              ItemsPrice
            </span>
            <span className="md:text-sm font-semibold text-gray-500 text-[12px]">
              ${orderItems.reduce((acc, cur) => acc + cur.price, 0)}
            </span>
          </p>
        </div>
        <div className="flex mt-1 flex-col items-start justify-center gap-1 w-[70%] mx-auto  ">
          <p className="capitalize flex items-center justify-between w-full">
            <span className="md:text-sm font-semibold text-gray-500 text-[12px]">
              Shipping
            </span>
            <span className=" font-semibold text-gray-500 md:text-sm text-[12px]">
              ${shippingPrice}
            </span>
          </p>
        </div>
        <div className="flex mt-1 flex-col items-start justify-center gap-1 w-[70%] mx-auto">
          <p className="capitalize flex items-center justify-between w-full">
            <span className=" md:text-sm text-[12px] font-semibold text-gray-500">
              Tax
            </span>
            <span className=" md:text-sm text-[12px] font-semibold text-gray-500">
              ${taxPrice}
            </span>
          </p>
        </div>
        <div className="flex mt-1 flex-col items-start justify-center gap-1 w-[70%] mx-auto mb-3 ">
          <p className="capitalize flex items-center justify-between w-full">
            <span className="text-sm font-semibold text-gray-500  md:text-sm text-[12px] ">
              Total
            </span>
            <span className="text-sm font-semibold text-gray-500  md:text-sm text-[12px]">
              ${totalPrice.toFixed(2)}
            </span>
          </p>
        </div>
        {!isPaid && (
          <div className="border-t-1 border-zinc-950/20 flex items-center justify-start w-full ">
            <button
              className="px-6 py-1 rounded-md bg-gray-950 text-gray-50 text-sm tracking-tight cursor-pointer hover:bg-gray-950/70 duration-300 mx-6 my-4 "
              onClick={handlePay}
            >
              Pay
            </button>
          </div>
        )}
        {userInfo.isAdmin && isPaid && (
          <div className="border-t-1 border-zinc-950/20 flex items-center justify-start w-full ">
            <button
              className="px-6 py-1 rounded-md bg-gray-950 text-gray-50 text-sm tracking-tight cursor-pointer hover:bg-gray-950/70 duration-300 mx-6 my-4 "
              onClick={handleDelivered}
            >
              Mark us delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EachOrder({ order }) {
  const { image, name, qty, price } = order;
  const uploads = image.split('.')[0].split('/');
  const upload = uploads.some((item) => item.toLowerCase().includes('uploads'));

  return (
    <div className="flex items-center justify-between w-full px-6 py-2 border-b-1 border-zinc-300/50">
      <div className="flex items-center justify-start gap-4 ">
        {!upload ? (
          <img
            src={image}
            alt="no Image found"
            className="w-[3.5rem] shadow-lg shadow-gray-950/20 rounded-md"
          />
        ) : (
          <img
            src={`https://proshop-8-4qyi.onrender.com${image}`}
            alt="image"
            className="w-[3.5rem] shadow-lg shadow-gray-950/20 rounded-md"
          />
        )}

        <p className="text-[11px] md:text-sm font-semibold text-gray-500 underline">
          {name}
        </p>
      </div>
      <p className="text-sm font-semibold text-gray-400">
        {qty} X ${price.toFixed(2)} = ${(qty * price).toFixed(2)}
      </p>
    </div>
  );
}

export default Oder;
