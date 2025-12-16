import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToChart, removeCart } from '../stores/Feautures/CartSlice';

function Cart() {
  const { cartItem, totalCost } = useSelector((state) => state.cartItems);

  console.log('your cartItems', cartItem, totalCost);

  const cartData =
    cartItem.length > 0 && Object.keys(cartItem[0]).includes('cart')
      ? cartItem[0].cart
      : cartItem;

  const dispatch = useDispatch();

  const { open } = useSelector((state) => state.responsive);

  function handleChange() {}
  return (
    <div
      className="grid grid-cols-5 my-4 w-full"
      style={open ? { marginTop: '7rem' } : {}}
    >
      <div className="w-[95%] mx-auto flex flex-col items-start justify-center col-span-5 gap-4  sm:col-span-3 max-h-max">
        <h2 className="text-4xl font-bold tracking-wide text start text-gray-600/80 ">
          Shopping Cart
        </h2>
        {cartData.length > 0 ? (
          <div className="flex flex-col items-start justify-center gap-2 mx-auto sm:w-full">
            {cartData.map((cart) => (
              <EachCart cart={cart} />
            ))}
          </div>
        ) : (
          <p className="py-3 px-2 text-start font-normal tracking tight w-full bg-blue-100/80 rounded-md text-sm text-gray-800/90 ">
            You currently have no item in your cart .
            <Link
              to="../"
              relative="path"
              className="underline underline-offset-1  text-blue-500 text-sm"
            >
              Go back
            </Link>
          </p>
        )}
      </div>
      <div className=" rounded-md shadow-lg shadow-gray-500/30 flex flex-col items-start justify-center col-span-5 md:col-span-2 px-2 py-3 w-[12rem] md:w-[15rem] border-[1px] border-gray-400 space-y-6  max-h-max mx-auto justify-end ">
        <div className="text-xl text-zinc-500 font-bold tracking-normal flex flex-col items-start justify-center gap-1 border-b-[1px] border-gray-400 w-full pb-6">
          <h2>Subtotal ({cartItem.length}) items</h2>
          <p className="text-start font-semibold text-gray-500 text-md tracking-tight ">
            {`$${Number(totalCost).toFixed(2)}`}
          </p>
        </div>
        <Link
          to="/shipping"
          className=" px-4 py-2 rounded-md text-zinc-400 bg-gray-900 shadow-md shadow-gray-300/50"
        >
          Add to checkout
        </Link>
      </div>
      <div className="w-screen text-center text-sm mt-15 text-gray-500 capitalize flex item-center justify-center">
        &copy; Proshop 2025
      </div>
    </div>
  );
}

function EachCart({ cart }) {
  const { image, name, price, quantity, countInStock } = cart;
  const [select, setSelect] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setSelect(quantity);
  }, []);

  const uploads = image.split('.')[0].split('/');
  const upload = uploads.some((item) => item.toLowerCase().includes('uploads'));

  function handleSetCart(e) {
    setSelect(e.target.value);
    dispatch(addToChart({ ...cart, quantity: e.target.value }));
  }

  function handleRemoveCart() {
    dispatch(removeCart(cart));
  }
  return (
    <div className="flex items-center justify-between sm:w-[90%] mx-auto  border-b-[1px] border-gray-400/50 pb-4 w-full">
      <div className="flex items-center justify-center gap-6 ">
        {!upload ? (
          <img
            src={image}
            alt="no Image found"
            className="max-w-[3.5rem]  sm:max-w-[5rem] rounded-md shadow-lg shadow-gray-400/20 hover:scale-105 duration-500 cursor-pointer"
          />
        ) : (
          <img
            src={`https://proshop-8-4qyi.onrender.com${image}`}
            alt="image"
            className="max-w-[3.5rem]  sm:max-w-[5rem] rounded-md shadow-lg shadow-gray-400/20 hover:scale-105 duration-500 cursor-pointer"
          />
        )}

        <p className="text-[10px] sm:text-sm font-normal underline text-gray-800 w-[6rem] sm:w-[10rem]">
          {name}
        </p>
      </div>
      <p className="text-zinc-500 sm:text-md font-semibold tracking-normal text-sm">
        {`$${price}`}
      </p>
      <div className="flex items-center justify-start gap-1 sm:gap-6 flex-col sm:flex-row">
        <select
          name="items-Select"
          id="content"
          value={select}
          onChange={(e) => handleSetCart(e)}
          className="rounded-md border-[1px] border-zinc-400 px-2 py-1 w-[4rem] outline-0 sm:w-[8rem]"
        >
          {Array.from({ length: countInStock }, (_, i) => i + 1).map(
            (number) => (
              <option value={number}>{number}</option>
            )
          )}
        </select>
        <button
          className="p-1 sm:p-2 flex items-center justify-center bg-zinc-400 cursor-pointer hover:bg-red-300 duration-500 "
          onClick={handleRemoveCart}
        >
          <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
        </button>
      </div>
    </div>
  );
}

export default Cart;
