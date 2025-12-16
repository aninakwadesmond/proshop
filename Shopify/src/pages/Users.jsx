import {
  faCancel,
  faCheck,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { json, Link, useLoaderData, useNavigate } from 'react-router-dom';
import {
  addProducts,
  EditProduct,
  getProduct,
} from '../stores/Feautures/Products';
import { useEffect, useState } from 'react';
import EditProducts from './EditProducts';
import { toast } from 'react-toastify';
import {
  getAlluser,
  setUserInfo,
  userToEdit,
} from '../stores/Feautures/userSlice';

function Users() {
  const dataLoader = useLoaderData();
  const [data, setData] = useState(false);
  const { users: userInfo } = useSelector((state) => state.userInfo);

  const { open } = useSelector((state) => state.responsive);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlluser(dataLoader));
    console.log('users available', userInfo);
  }, []);

  useEffect(() => {
    async function handleProducts() {
      const { data } = await axios.get(
        'https://proshop-8-4qyi.onrender.com/user/all',
        {
          withCredentials: true,
        }
      );

      // dispatch(getProduct(data));
      dispatch(getAlluser(data));
    }
    handleProducts();
  }, [data]);

  // console.log('your Data from action', data);
  // console.log('your active ', activeData);

  console.log('why is active 2x the value userInfo', userInfo);
  // console.log('why is data 2x the value userInfo', activeData);
  // useEffect(() => {
  //   if (!data) return;
  //   dispatch(addProducts(activeData));
  // }, []);
  // const { userInfo } = useSelector((state) => state.products);

  console.log('why is product 2x the value userInfo', userInfo);
  // useEffect(() => {
  //   console.log('activeon ', userInfo);
  //   if (userInfo.length > 0) return;
  //   dispatch(addProducts(data));
  // }, []);

  async function handleNewProducts() {
    const { data } = await axios.post(
      'https://proshop-8-4qyi.onrender.com/proshop',
      {},
      { withCredentials: true }
    );
    dispatch(addProducts([data]));
    setData((prev) => !prev);
  }
  return (
    <div className="flex flex-col items-start justify-center my-5 w-[90%] mx-auto">
      <div
        className=" w-full flex items-center justify-between "
        style={open ? { marginTop: '6rem' } : {}}
      >
        <h1 className="font-bold text-3xl text-start text-gray-800 tracking-normal">
          Users
        </h1>
        <button
          className="px-4 py-1 font-semibold text-sm flex items-center justify-center text-gray-50 bg-gray-950/70 hover:bg-gray-950/95 duration-300 cursor-pointer rounded-md"
          onClick={handleNewProducts}
        >
          <FontAwesomeIcon
            icon={faEdit}
            className="text-sm text-gray-50 font-semibold "
          />
          create products
        </button>
      </div>
      <div className="overflow-x-auto w-full mt-3">
        <table className="w-full border-collapse [&_tbody]:even:bg-zinc-400/30 ">
          <thead className="w-full [&_th]:text-md [&_th]:text-gray-900/80 [&_th]:text-center ">
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </thead>
          {userInfo &&
            userInfo.map((product) => (
              <ProductData product={product} setData={setData} />
            ))}
        </table>
      </div>
    </div>
  );
}

function ProductData({ product, setData }) {
  // const { _id: id, name, price, category, brand } = product;
  const { _id: id, name, isAdmin, email } = product;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleNavigateToEdit() {
    dispatch(userToEdit(product));
    navigate(`/admin/${id}/userEdit`);
  }

  async function handleRemoveProduct() {
    const { data } = await axios.delete(
      `https://proshop-8-4qyi.onrender.com/user/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log('remove data ', data);
    if (data.status === 400 || data.status === 301)
      return toast.error(data.message);
    setData((prev) => !prev);
    return toast.success(data.message);
  }
  return (
    <tbody className="w-full [&_td]:text-[13px] [&_td]:text-zinc-800/70 [&_td]:text-center [&_td]:p-1 ">
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <a href={`mailto:${email}`} className="underline">
          {email}
        </a>
      </td>
      <td>
        {isAdmin === 'true' ? (
          <FontAwesomeIcon
            className="text-lg font-semibold text-emerald-500"
            icon={faCheck}
          />
        ) : (
          <FontAwesomeIcon
            className="text-lg font-semibold text-red-500"
            icon={faCancel}
          />
        )}
      </td>

      <td className="flex items-center justify-start gap-1">
        <button onClick={handleNavigateToEdit}>
          <FontAwesomeIcon
            icon={faEdit}
            className="font-semibold text-md text-gray-800/60  hover:text-gray-800 duration-300 cursor-pointer"
          />
        </button>
        <button onClick={handleRemoveProduct}>
          <FontAwesomeIcon
            icon={faTrash}
            className="font-semibold text-sm p-2 bg-red-400/80 text-red-50 cursor-pointer hover:bg-red-400 duration-300 rounded-sm"
          />
        </button>
      </td>
    </tbody>
  );
}

export async function Loader() {
  const { data } = await axios.get(
    'https://proshop-8-4qyi.onrender.com/user/all',
    {
      withCredentials: true,
    }
  );

  // console.log('user reader from bakcend', data);
  if (!data) return json({ message: 'Failed to load Users', status: 400 });

  return data;
}

export default Users;
