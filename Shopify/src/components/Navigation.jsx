import React, { useEffect, useRef, useState } from 'react';
import {
  faArrowCircleDown,
  faCartPlus,
  faNavicon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToChart } from '../stores/Feautures/CartSlice';
import Cookie from 'js-cookie';
import { setUserInfo } from '../stores/Feautures/userSlice';
import { setAdmin, setUser } from '../stores/Feautures/Navigation';
import { setOpen } from '../stores/Feautures/responsive';
import AdminDropDown from './AdminDropDown';

function Navigation() {
  const [out, setOut] = useState(false);
  const { cartItem } = useSelector((state) => state.cartItems);
  const { userInfo } = useSelector((state) => state.userInfo);
  const { user, admin } = useSelector((state) => state.nav);
  const { keyword } = useParams();
  const [search, setSearch] = useState(keyword);

  const { registerInfo } = useSelector((state) => state.register);
  const [cook, setCook] = useState();

  console.log('nav', cartItem);

  const cartData =
    cartItem.length > 0 && Object.keys(cartItem[0]).includes('cart')
      ? cartItem[0].cart
      : cartItem;
  const { cart } = cartItem;
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.userInfo);

  useEffect(() => {
    console.log('statrt p1');
    if (!out) return;
    console.log('statrt p2');
    async function logout() {
      console.log(' p3');
      await axios.get('https://proshop-8-4qyi.onrender.com/user/logout', {
        withCredentials: true,
      });
      dispatch(setUserInfo(null));

      console.log(' p4');
      setOut(false);
      console.log(' p5');
    }
    logout();
  }, [out]);

  // useEffect(() => {
  //   const jwt = Cookie.get('jwt');
  //   if (!jwt) {
  //     dispatch(setUserInfo(null));
  //     localStorage.removeItem('userInfo');
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log('storageLocal', JSON.parse(localStorage.getItem('cart')));
  //   dispatch(
  //     addToChart(
  //       localStorage.getItem('cart')
  //         ? JSON.parse(localStorage.getItem('cart'))
  //         : []
  //     )
  //   );
  // }, []);

  const navigate = useNavigate();
  function handleSearch(e) {
    e.preventDefault();
    // setSearch(e.target.value);
    if (search) {
      const input = search.trim();
      navigate(`/search/${input}`);
      setSearch('');
    } else {
      navigate('/');
    }
  }

  function handleUser() {
    dispatch(setUser());
  }
  // function handleLogout() {
  //   setOut(true);
  // }
  // const [open, setOpen] = useState(false);
  const { open } = useSelector((state) => state.responsive);
  console.log('here is open', open);
  const searchActive = useRef(null);
  useEffect(() => {
    searchActive.current?.focus();
  }, [open]);

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-gray-800 pr-10 relative w-screen">
      <p className="flex items-center justify-center gap-2">
        <FontAwesomeIcon icon={faPaypal} className="text-xl text-zinc-400" />

        <Link
          to="/"
          className="text-lg tracking-tighter text-zinc-300 font-bold capitalize"
        >
          Proshop
        </Link>
      </p>
      <span className="flex sm:hidden" onClick={() => dispatch(setOpen())}>
        <FontAwesomeIcon
          icon={faNavicon}
          className="text-zinc-200 text-xl cursor-pointer"
        />
      </span>
      <div
        className="flex items-center justify-center gap-2  absolute top-full  bg-gray-800   z-50 flex-col left-0 right-0 mx-auto px-2  hidden space-y-6 sm:flex-row sm:relative sm:space-y-0 sm:flex sm:justify-between sm:w-full"
        style={open ? { display: 'block' } : {}}
      >
        <div className="flex items-center justify-center gap-2  sm:flex   sm:ml-20 sm:mr-10 md:w-[50%]">
          <input
            type="text"
            className="outline-0 px-2 py-1 rounded-md bg-white text-md text-md tracking-normal w-full text-sm font-semibold text-gray-900/70 "
            placeholder="search"
            ref={searchActive}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="  text-md text-center rounded-md px-2 py-1 tracking-tighter shadow-xl shadow green-500/30 text-emerald-400 cursor-pointer border-1 border-emerald-400 sm:text-sm"
            onClick={handleSearch}
          >
            search
          </button>
        </div>

        <div className="flex items-center  gap-2  justify-start sm:w-auto ">
          <div className=" items-center justify-between [&_p]:text-zinc-400 gap-2 flex md:flex ease duration-500 w-full sm:w-auto ">
            <Link
              to="/cart"
              className="flex items-center justify-center gap-1 relative text-zinc-400"
            >
              <FontAwesomeIcon icon={faCartPlus} className=""></FontAwesomeIcon>
              {cartData.length > 0 && (
                <span className="absolute -top-[50%] right-[30%] h-4 w-4 rounded-full bg-green-400 text-green-100 text-[12px] flex items-center justify-center font-bold ">
                  {cartData.reduce((acc, cur) => acc + Number(cur.quantity), 0)}
                </span>
              )}

              <span className="capitalize text-sm tracking-tighter">Cart</span>
            </Link>
            <button
              // to="login"
              className="flex items-center justify-center gap-1 text-zinc-300 capitalize text-sm tracking-tighter relative border-0 cursor-pointer"
              onClick={handleUser}
            >
              <FontAwesomeIcon icon={faUser} />
              {userInfo ? userInfo.name : 'Sign In'}
              {user && (
                <div className="absolute mt-1 top-[100%] left-[50%] -translate-x-[50%] flex flex-col items-start justify-center p-2 rounded-md shadow-md shadow-gray-900/20 bg-gray-100 w-[10rem] z-50">
                  <Link
                    to="/profile"
                    className="text-md text-zinc-500 font-semibold tracking-normal border-b-1 border-zinc-400/20 text-center w-full"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/login"
                    className="text-md text-zinc-500 font-semibold tracking-normal border-b-1 border-zinc-400/20 text-center w-full cursor-pointer"
                    onClick={() => setOut(true)}
                  >
                    logout
                  </Link>
                </div>
              )}
            </button>
            {userInfo && userInfo.isAdmin === 'true' && (
              <div className="flex flex-col items-center justify-start relative">
                <div
                  className="flex items-center justify-start gap-1 cursor-pointer"
                  onClick={() => dispatch(setAdmin())}
                >
                  <span className="text-md text-zinc-50 tracking-normal capitalize font-semibold">
                    Admin
                  </span>
                  <FontAwesomeIcon
                    icon={faArrowCircleDown}
                    className="text-sm text-gray-300 font-bold"
                  />
                </div>
                {admin && <AdminDropDown />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
