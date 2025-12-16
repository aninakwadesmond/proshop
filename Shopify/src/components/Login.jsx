import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUserInfo } from '../stores/Feautures/userSlice';
import Nav from './Nav';

function Login() {
  const data = useActionData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.responsive);

  useEffect(() => {
    console.log('available', data);
    if (!data) return;

    console.log('start', data);
    dispatch(setUserInfo(data));
    return navigate('/');
  }, [data?.name]);

  return (
    <div
      className="flex flex-col items-start justify-center gap-4 mt-10  "
      style={open ? { marginTop: '6rem ' } : {}}
    >
      <Nav active={1} />
      <div className="flex flex-col items-center justify-center mx-auto px-4 md:w-[30rem] w-full">
        <Form
          method="post"
          className="flex flex-col items-start justify-center gap-6 w-full"
        >
          <h2 className="text-xl text-gray-800/70 font-bold tracking-normal text-start capitalize md:text-3xl">
            Sign Up
          </h2>
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <label
              htmlFor="emial"
              className="text-start text-zinc-400 text-sm capitalize tracking-tighter"
            >
              Enter address
            </label>
            <input
              type="text"
              name="email"
              className="w-full p-1 rounded-md border-1 border-zinc-500/60 placeholder:text-sm placeholder:tracking-tighter outline-0 text-md text-gray-500 tracking-wider md:py-2"
              placeholder="Enter email"
            />
            <label
              htmlFor="emial"
              className="text-start text-zinc-400 text-sm capitalize tracking-tighter"
            >
              password
            </label>
            <input
              type="text"
              name="password"
              className="w-full p-1  outline-0 md:py-2 rounded-md border-1 border-zinc-500/60 placeholder:text-sm placeholder:tracking-tighter text-md text-gray-500 tracking-wider"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-sm capitalize bg-gray-950 shadow-md shadow-gray-950/20 hover:bg-gray-950/80 text-gray-50"
            onClick={() => toast.success('welcome')}
          >
            Sign In
          </button>
          <div className="flex items-center justify-start capitalize text-sm text-zinc-900/90">
            New customer?
            <Link to="/register" className="text-gray-950 underline text-sm ">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
