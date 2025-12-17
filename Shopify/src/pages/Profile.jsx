import axios from 'axios';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Await,
  defer,
  Form,
  json,
  useActionData,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUserInfo } from '../stores/Feautures/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { setOrders } from '../stores/Feautures/Order';

function Profile() {
  const { user, order } = useLoaderData();
  const response = useActionData();
  const dispatch = useDispatch();
  const { name, email } = data;

  useEffect(() => {
    if (!response) return;
    dispatch(setUserInfo(response));
  }, [response, dispatch]);

  return (
    <div className="grid grid-cols-12 gap-6 mt-4 overflow-x-hidden w-full items-start">
      <Suspense fallback={<p>Loading</p>}>
        <Await resolve={user}>{(user) => <UserProfile user={user} />}</Await>
      </Suspense>

      <Suspense fallback={<p>Loading</p>}>
        <Await resolve={order}>{(order) => <MyOrders order={order} />}</Await>
      </Suspense>
    </div>
  );
}

function UserProfile({ user }) {
  const { name, email } = user;
  const { open } = useSelector((state) => state.responsive);

  return (
    <div
      className="flex flex-col items-start justify-start max-h-max gap-4 col-span-12 md:col-span-4  w-full mx-2 pr-6 align-top"
      style={open ? { marginTop: '6rem' } : {}}
    >
      <h1 className="font-bold md:text-2xl  text-md tracking-tight text-gray-950/70 capitalize mb-1">
        user profile
      </h1>
      <Form
        method="post"
        className="flex flex-col items-start justify-center gap-1 w-full"
      >
        <div className="flex flex-col items-start justify-center  w-full">
          <label htmlFor="" className="text-sm text-semibold text-zinc-600">
            Name
          </label>
          <input
            type="text"
            className="border-[0.5px] outline-0 p-1 rounded-md shadow-md shadow-gray-950/5 w-full text-sm text-zinc-500 border-zinc-300"
            placeholder=""
            defaultValue={name}
            name="name"
          />
        </div>
        <div className="flex flex-col items-start justify-center  w-full">
          <label htmlFor="" className="text-sm text-semibold text-zinc-600">
            Emial
          </label>
          <input
            type="email"
            className="border-[0.5px] outline-0 p-1 rounded-md shadow-md shadow-gray-950/5 w-full text-sm text-zinc-500 border-zinc-300"
            placeholder=""
            defaultValue={email}
            name="email"
          />
        </div>
        <div className="flex flex-col items-start justify-center  w-full">
          <label htmlFor="" className="text-sm text-semibold text-zinc-600">
            Password
          </label>
          <input
            type="password"
            className="border-[0.5px] outline-0 p-1 rounded-md shadow-md shadow-gray-950/5 w-full text-sm text-zinc-500 border-zinc-300"
            placeholder=""
            name="password"
          />
        </div>
        <div className="flex flex-col items-start justify-center  w-full">
          <label htmlFor="" className="text-sm text-semibold text-zinc-600">
            Confirm
          </label>
          <input
            type="password"
            className="border-[0.5px] outline-0 p-1 rounded-md shadow-md shadow-gray-950/5 w-full text-sm text-zinc-500 border-zinc-300"
            placeholder=""
            name="confirmPassword"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-1 text-sm text-gray-50 bg-gray-950 rounded-md shadow-sm shadow-gray-950/10 hover:bg-gray-950/80 duration-500 cursor-pointer mt-3"
        >
          Update
        </button>
      </Form>
    </div>
  );
}

function MyOrders({ order }) {
  console.log('all orders', order);
  return (
    <div className="flex flex-col items-start justify-start  gap-2 mx-4    w-full pr-6  col-span-12 md:col-span-8 md:gap-6">
      <h1 className="font-bold md:text-2xl tracking-tight text-gray-950/70 capitalize mb-1 text-md">
        My Orders
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse  ">
          <thead className="w-full divide-x-2 divide-amber-800 ">
            <tr className="w-full  [&_th]:text-md [&_th]:text-zinc-600 [&_th]:font-semibold  bg-zinc-400/40 px-2 py-1 rounded-md flex items-center justify-between ">
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVEERED</th>
              <th>VIEW</th>
            </tr>
          </thead>
          <tbody className="divide-y-[0.5px] divide-zinc-300/50 [&_tr]:even:bg-gray-400/30 [&_tr]:rounded-md w-full ">
            {order.map((ord) => (
              <TableRow eachOrder={ord} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableRow({ eachOrder }) {
  const { _id: id, createdAt, totalPrice, isPaid, isDeliverd } = eachOrder;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleViewSelectedOrder() {
    const { data } = await axios.get(
      `https://proshop-8-4qyi.onrender.com/order/get/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log('currentData', data);
    dispatch(setOrders(data));
    navigate(`/shipping/placeOrder/order/${id}`);
  }
  return (
    <tr className="w-full  [&_td]:text-[13px] [&_td]:text-zinc-600 [&_td]:font-semibold p-1 [&_td]:line-clamp-1 flex items-center justify-between gap-3 ">
      <td className="  ">{id}</td>
      <td>{String(createdAt).split('T')[0]}</td>
      <td>${totalPrice.toFixed(2)}</td>
      <td>{isPaid.toString(0, 2)}</td>
      <td>
        {!isDeliverd ? (
          <FontAwesomeIcon icon={faClose} className="text-red-700" />
        ) : (
          <FontAwesomeIcon icon={faCheck} className="text-emerald-600" />
        )}
      </td>
      <td>
        <button
          className="border-1 border-zinc-300/50 px-2 py-1 rounded-md hover:bg-gray-950/70 text-gray-50 text-sm bg-gray-950/50 cursor-pointer tracking-tight duration-300"
          onClick={handleViewSelectedOrder}
        >
          Detials
        </button>
      </td>
    </tr>
  );
}

async function LoadUser() {
  const { data } = await axios.get(
    'https://proshop-8-4qyi.onrender.com/user/me',
    {
      withCredentials: true,
    }
  );
  if (!data) return json({ message: 'Error data ', status: 400 });

  console.log('user data', data);
  return data;
}

async function LoadOrders() {
  const { data } = await axios.get(
    'https://proshop-8-4qyi.onrender.com/order/all',
    {
      withCredentials: true,
    }
  );
  if (!data) return json({ message: 'Error data ', status: 400 });
  console.log('all data', data);
  return data;
}
export async function Loader({ request, params }) {
  return defer({
    user: await LoadUser(),
    order: await LoadOrders(),
  });
}

export async function action({ request, params }) {
  const response = await request.formData();
  const events = Object.fromEntries(response.entries());
  console.log('youe events', events);

  if (events.password !== events.confirmPassword)
    return toast.error('Password does not match ');

  const { data } = await axios.put(
    'https://proshop-8-4qyi.onrender.com/user/me',
    events,
    {
      withCredentials: true,
    }
  );
  if (!data) return toast.error('Profile not updated');
  toast.success('Profile updated');
  return data;
}

export default Profile;
