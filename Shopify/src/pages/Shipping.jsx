import { useEffect, useState } from 'react';
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import Nav from '../components/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { setShippingAddress } from '../stores/Feautures/CartSlice';

function Shipping() {
  const [userAddress, setUserAddress] = useState();
  const navigate = useNavigate();
  const { open } = useSelector((state) => state.responsive);
  // return (
  //   <div>
  const data = useActionData();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      console.log('your data ', data);
      dispatch(setShippingAddress(data));
      navigate('/shipping/paymentMethod');
    }
  }, [data]);

  useEffect(() => {
    const Items = JSON.parse(localStorage.getItem('cart'));
    const { shippingAddress } = Items[0];

    setUserAddress(shippingAddress);
    console.log('addresing', shippingAddress);
  }, []);

  return (
    <div
      className="flex flex-col items-start justify-center gap-4 mt-5 "
      style={open ? { marginTop: '7rem' } : {}}
    >
      <Nav active={2} />
      <div className="flex flex-col items-center justify-center sm:w-[30rem] w-[20rem]  mx-auto pr-7 ">
        <Form
          method="post"
          className="flex flex-col items-start justify-center gap-6 w-full"
        >
          <h2 className="text-3xl text-gray-800/70 font-bold tracking-normal text-start capitalize">
            Shipping
          </h2>
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <p className="w-full flex flex-col items-start justify-center gap-1">
              <label
                htmlFor="emial"
                className="text-start text-zinc-400 text-sm capitalize tracking-tighter"
              >
                Address
              </label>
              <input
                name="address"
                type="text"
                defaultValue={userAddress?.address}
                className="w-full px-1 py-2 rounded-md border-1 border-zinc-500/60 placeholder:text-sm placeholder:tracking-tighter outline-0 text-md text-gray-500 tracking-wider h-[2.3rem]"
                placeholder="Enter email"
              />
            </p>
            <p className="w-full flex flex-col items-start justify-center gap-1">
              <label
                htmlFor="city"
                className="text-start text-zinc-400 text-sm capitalize tracking-tighter"
              >
                city
              </label>
              <input
                name="city"
                type="text"
                defaultValue={userAddress?.city}
                className="w-full px-1  outline-0 py-2 rounded-md border-1 border-zinc-500/60 placeholder:text-sm placeholder:tracking-tighter text-md text-gray-500 tracking-wider h-[2.3rem]"
                placeholder="Enter email address"
              />
            </p>
            <p className="w-full flex flex-col items-start justify-center gap-1">
              <label
                htmlFor="PostalCode "
                className="text-start text-zinc-400 text-sm capitalize tracking-tighter"
              >
                Postal code
              </label>
              <input
                name="PostalCode"
                type="text"
                defaultValue={userAddress?.PostalCode}
                className="w-full px-1  outline-0 py-2 rounded-md border-1 border-zinc-500/60 placeholder:text-sm placeholder:tracking-tighter text-md text-gray-500 tracking-wider h-[2.3rem]"
                placeholder="Enter password"
              />
            </p>
            <p className="w-full flex flex-col items-start justify-center gap-1">
              <label
                htmlFor="country"
                className="text-start text-zinc-400 text-sm capitalize tracking-tighter"
              >
                country
              </label>
              <input
                name="country"
                type="text"
                defaultValue={userAddress?.country}
                className="w-full px-1  outline-0 py-2 rounded-md border-1 border-zinc-500/60 placeholder:text-sm placeholder:tracking-tighter text-md text-gray-500 tracking-wider h-[2.3rem]"
                placeholder="Confirm password"
              />
            </p>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-sm capitalize bg-gray-950 shadow-md shadow-gray-950/20 hover:bg-gray-950/80 text-gray-50"
            onClick={() => toast.success('data')}
          >
            Continue
          </button>
          {/* <div className="flex items-center justify-start  text-sm text-zinc-900/90">
          Already have an account?
          <Link to="/login" className="text-gray-950 underline text-sm ">
            Login
          </Link>
        </div> */}
        </Form>
      </div>
    </div>
  );
  //   </div>
  // );
}

export async function action({ request, params }) {
  const data = await request.formData();
  const response = Object.fromEntries(data.entries());
  const cart = JSON.parse(localStorage.getItem('cart'));
  const events = cart[0];
  // console.log(data1, cart);
  // localStorage.setItem(
  //   'cart',
  //   JSON.stringify([{ cart, shippingAddress: response }])
  // );
  console.log('shipping', response);
  return response;
}

export default Shipping;
