import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import { faTreeCity } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { redirect, useNavigate, useSubmit } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function PlaceOrder() {
  const { shipppingAddress, paymentMethods, cartItem, totalCost } = useSelector(
    (state) => state.cartItems
  );

  const shippingAddress =
    Object.keys(shipppingAddress).length > 0
      ? shipppingAddress
      : cartItem[0].shippingAddress;
  console.log('keys');
  const cartData =
    cartItem.length > 0 && Object.keys(cartItem[0]).includes('cart')
      ? cartItem[0].cart
      : cartItem;
  console.log('ship', shippingAddress);
  const { address, country, city, PostalCode } = shippingAddress;
  const itemsPrice = cartData.reduce((acc, cur) => acc + cur.price, 0);
  const submit = useSubmit();
  const shippingPrice = cartData.reduce((a, c) => a + c.shippingPrice, 0);
  const taxPrice = cartData.reduce((a, c) => a + Number(c.taxPrice), 0);
  const navigate = useNavigate();
  const { open } = useSelector((state) => state.responsive);

  function handleSubmit() {
    submit(
      {
        orderItems: JSON.stringify(cartData),
        ShippingAddress: JSON.stringify(shippingAddress),
        paymentMethod: JSON.stringify(paymentMethods),
        itemsPrice: JSON.stringify(itemsPrice),
        shippingPrice: JSON.stringify(shippingPrice),
        taxPrice: JSON.stringify(taxPrice),
        totalPrice: JSON.stringify(totalCost),
      },
      { method: 'post', action: '/shipping/placeOrder/' }
    );
  }
  return (
    <div
      className=" flex flex-col items-start justify-center gap-3 mt-7 md:w-screen w-[95%] mx-auto overflow-x-hidden"
      style={open ? { marginTop: '7rem' } : {}}
    >
      <Nav active={4} />
      <div className="grid grid-cols-12 gap-10 w-[90%] mx-auto">
        {/* <div className="col-span-8"> */}
        <div className="flex flex-col items-start justify-center gap-3  w-full md:col-span-8 col-span-12 mx-auto mr-7">
          <div className="flex flex-col items-start justify-center gap-2 pb-6 border-b border-zinc-300/50 w-full ">
            <h2 className="font-bold text-2xl text-gray-600 tracking-tight">
              Shipping Address
            </h2>
            <p className="text-sm text-gray-600 capitalize  flex items-center justify-start gap-1">
              <span className="font-bold text-sm text-gray-500 [&_span]:font-semibold  [&_span]:text-gray-600 ">
                Address:
              </span>
              <span className="text-sm font-semibold text-gray-400 tracking-tight ">
                {address}
              </span>
              ,
              <span className="text-sm font-semibold text-gray-400 tracking-tight ">
                {city}
              </span>
              <span className="text-sm font-semibold text-gray-400 tracking-tight ">
                {PostalCode}
              </span>
              ,
              <span className="text-sm font-semibold text-gray-400 tracking-tight ">
                {country}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 py-4 pb-6 border-b border-zinc-300/50 w-full">
            <h2 className="font-bold text-2xl text-gray-600 tracking-tight">
              Payment Method
            </h2>
            <div className="flex items-center justify-start gap-1">
              <span className="font-bold text-sm text-gray-500 [&_span]:font-semibold  [&_span]:text-gray-600 ">
                Method:{paymentMethods || 'Paypal'}
              </span>
              <span className="text-sm font-semibold text-gray-400 tracking-tight capitalize ">
                {paymentMethods}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 py-4 pb-6 border-b border-zinc-300/50 w-full">
            <h2 className="font-bold text-2xl text-gray-600 tracking-tight">
              Order Items
            </h2>
            <div className="flex flex-col items-start justify-center gap-3 w-full mr-6">
              {cartData.map((cart) => (
                <Cart cart={cart} />
              ))}
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="md:col-span-4 col-span-12 border-[0.5px] shadow-lg shadow-gray-950/10 max-h-max rounded-md border-zinc-300 mr-7">
          <h2 className="text-xl text-gray-600 tracking-normal font-bold capitalize w-full p-2 border-b-[0.5px] border-zinc-300/50">
            Order summary
          </h2>
          <p className="flex items-center justify-between   w-[20rem] p-2 border-b-[0.5px] border-zinc-300/50">
            <span className="font-semibold text-lg text-gray-500">Items:</span>
            <span className="font-semibold tracking-normal text-lg  text-gray-600">
              $ {itemsPrice}
            </span>
          </p>
          <p className="flex items-center justify-between   w-[20rem] p-2 border-b-[0.5px] border-zinc-300/50">
            <span className="font-semibold text-lg text-gray-500">
              Shipping:
            </span>
            <span className="font-semibold tracking-normal text-lg  text-gray-600">
              $ {cartData.reduce((a, c) => a + c.shippingPrice, 0)}
            </span>
          </p>
          <p className="flex items-center justify-between   w-[20rem]  p-2 border-b-[0.5px] border-zinc-300/50">
            <span className="font-semibold text-lg text-gray-500">Tax:</span>
            <span className="font-semibold tracking-normal text-lg  text-gray-600">
              $ {cartData.reduce((a, c) => a + Number(c.taxPrice), 0)}
            </span>
          </p>
          <p className="flex items-center justify-between   w-[20rem]  p-2 border-b-[0.5px] border-zinc-300/50">
            <span className="font-semibold text-lg text-gray-500">Total:</span>
            <span className="font-semibold tracking-normal text-lg  text-gray-600">
              $ {totalCost}
            </span>
          </p>
          <p className="flex items-center justify-between   w-full  p-2 border-b-[0.5px] border-zinc-300/50 h-10">
            {/* <span className="font-semibold text-lg text-gray-500">Total:</span>
            <span className="font-semibold tracking-normal text-lg  text-gray-600">
              $20.00
            </span> */}
          </p>
          <button
            className="px-6 py-2 bg-gray-950 cursor-pointer text-gray-50 text-sm my-4 mx-3 rounded-md hover:bg-gray-950/70 duration-300 shadow-lg shadow-gray-950/10"
            onClick={handleSubmit}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

function Cart({ cart }) {
  const { name, image, price, quantity } = cart;
  const uploads = image.split('.')[0].split('/');
  const upload = uploads.some((item) => item.toLowerCase().includes('uploads'));
  return (
    <div className="w-full flex items-center justify-start sm:justify-between w-full">
      <div className="flex items-center justify-start gap-2 sm:gap-3">
        {!upload ? (
          <img
            src={image}
            alt="no Image found"
            className="w-[4rem] shadow-md shadow-gray-950/10"
          />
        ) : (
          <img
            src={`http://localhost:5000${image}`}
            alt="image"
            className="w-[4rem] shadow-md shadow-gray-950/10"
          />
        )}

        <p className="sm:text-sm text-[11px] text-gray-500 tracking-tighter underline font-semibold w-[7rem]">
          {name}
        </p>
      </div>
      <p className="text-md text-gray-600 tracking-normal font-semibold">
        {quantity} X {price} = ${quantity * price}
      </p>
    </div>
  );
}

export default PlaceOrder;
