import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';
import { setRegisterInfo } from '../stores/Feautures/registerSlice';
import { toast } from 'react-toastify';

function Register() {
  const data = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(setRegisterInfo(data));
      navigate('/');
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center max-w-[30rem] mt-5 mx-auto px-4">
      <Form
        method="post"
        className="flex flex-col items-start justify-center gap-6 w-full"
      >
        <h2 className="text-3xl text-gray-800/70 font-bold tracking-normal text-start capitalize">
          Sign Up
        </h2>
        <div className="flex flex-col items-start justify-center gap-1 w-full">
          <p className="w-full flex flex-col items-start justify-center gap-1">
            <label
              htmlFor="emial"
              className="text-start text-zinc-400 text-sm capitalize tracking-tighter"
            >
              name
            </label>
            <input
              name="name"
              type="text"
              className="w-full px-1 py-2 rounded-md border-1 border-zinc-500/60 placeholder:text-sm placeholder:tracking-tighter outline-0 text-md text-gray-500 tracking-wider h-[2.3rem]"
              placeholder="Enter email"
            />
          </p>
          <p className="w-full flex flex-col items-start justify-center gap-1">
            <label
              htmlFor="emial"
              className="text-start text-zinc-400 text-sm capitalize tracking-tighter"
            >
              email address
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-1  outline-0 py-2 rounded-md border-1 border-zinc-500/60 placeholder:text-sm placeholder:tracking-tighter text-md text-gray-500 tracking-wider h-[2.3rem]"
              placeholder="Enter email address"
            />
          </p>
          <p className="w-full flex flex-col items-start justify-center gap-1">
            <label
              htmlFor="password"
              className="text-start text-zinc-400 text-sm capitalize tracking-tighter"
            >
              Enter password
            </label>
            <input
              name="password"
              type="text"
              className="w-full px-1  outline-0 py-2 rounded-md border-1 border-zinc-500/60 placeholder:text-sm placeholder:tracking-tighter text-md text-gray-500 tracking-wider h-[2.3rem]"
              placeholder="Enter password"
            />
          </p>
          <p className="w-full flex flex-col items-start justify-center gap-1">
            <label
              htmlFor="password"
              className="text-start text-zinc-400 text-sm capitalize tracking-tighter"
            >
              Confirm password
            </label>
            <input
              name="c-password"
              type="text"
              className="w-full px-1  outline-0 py-2 rounded-md border-1 border-zinc-500/60 placeholder:text-sm placeholder:tracking-tighter text-md text-gray-500 tracking-wider h-[2.3rem]"
              placeholder="Confirm password"
            />
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-md text-sm capitalize bg-gray-950 shadow-md shadow-gray-950/20 hover:bg-gray-950/80 text-gray-50"
          onClick={() => toast.success('data')}
        >
          Register
        </button>
        <div className="flex items-center justify-start  text-sm text-zinc-900/90">
          Already have an account?
          <Link to="/login" className="text-gray-950 underline text-sm ">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
