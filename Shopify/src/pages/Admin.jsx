import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { json, useLoaderData, useNavigate } from 'react-router-dom';
import { setOrders } from '../stores/Feautures/Order';

function Admin() {
  const data = useLoaderData();
  // console.log('data', data);

  const { open } = useSelector((state) => state.responsive);
  return (
    <div
      className="flex flex-col items-start justify-start gap-2 w-[95%] mx-auto "
      style={open ? { marginTop: '6rem' } : {}}
    >
      <h1 className="font-bold text-3xl text-gray-950/70 tracking-normal capitalize mt-4 ">
        Orders
      </h1>
      <div className="overflow-x-auto w-full ">
        <table className=" border-collapse min-w-max">
          <thead className="w-full  [&_th]:p-1  ">
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID </th>
            <th>DELIVERED</th>
            <th></th>
          </thead>
          <tbody className="w-full [&_tr]:not-even:bg-zinc-300/30 [&_tr]:hover:bg-zinc-400/40  [&_tr]:hover:cursor-pointer">
            {data.map((order) => (
              <Orders order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Orders({ order }) {
  const { _id: id, user, isPaid, isDeliverd, totalPrice, createdAt } = order;
  console.log('each order', order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDetails() {
    const { data } = await axios.get(
      `https://proshopy-i2wk.onrender.com/order/get/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch(setOrders(data));
    navigate(`/shipping/placeOrder/order/${id}`);
  }
  return (
    <tr className="[&_td]:text-center [&_td]:p-1 [&_td]:text-sm [&_td]:text-gray-950/80 [&_td]:font-semibold">
      <td>{id}</td>
      <td>{user?.name}</td>
      <td>{String(createdAt).split('T')[0]}</td>
      <td>${totalPrice.toFixed(2)}</td>
      <td>{String(isPaid)}</td>
      <td>
        {isDeliverd ? (
          <FontAwesomeIcon
            icon={faCheck}
            className="text-emerald-500 text-lg font-bold"
          />
        ) : (
          <FontAwesomeIcon
            icon={faClose}
            className="text-red-400 text-lg font-bold"
          />
        )}
      </td>
      <td>
        <button
          className="px-4 py-1 rounded-md bg-gray-950/60 hover:bg-gray-950/90 text-gray-50 duration-300 cursor-pointer shadow-sm shadow bg-950/10 text-sm"
          onClick={handleDetails}
        >
          Details
        </button>
      </td>
    </tr>
  );
}

export async function Loader({ request, params }) {
  const { data } = await axios.get(
    'https://proshopy-i2wk.onrender.com/order/all',
    {
      withCredentials: true,
    }
  );

  if (!data) return json({ message: 'No orders Found' });

  console.log('loader set ', data);

  return data;
}

export default Admin;
