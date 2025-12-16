import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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

function AdminProducts() {
  const [data, setData] = useState(false);
  const { ProductItems } = useSelector((state) => state.products);
  const allProducts = useLoaderData();

  const { products } = ProductItems;
  console.log('all products ', ProductItems, products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(allProducts.products));
    console.log('allProducts', allProducts);
  }, []);

  // useEffect(() => {
  //   async function handleProducts() {
  //     const { data } = await axios.get('https://proshopy-i2wk.onrender.com/proshop', {
  //       withCredentials: true,
  //     });
  //     // console.log('backend', data);
  //     dispatch(getProduct(data.data));
  //   }
  //   handleProducts();
  // }, [data]);

  // console.log('your Data from action', data);
  // console.log('your active ', activeData);

  // console.log('why is active 2x the value ProductItems', ProductItems);
  // console.log('why is data 2x the value ProductItems', activeData);
  // useEffect(() => {
  //   if (!data) return;
  //   dispatch(addProducts(activeData));
  // }, []);
  // const { ProductItems } = useSelector((state) => state.products);

  // console.log('why is product 2x the value ProductItems', ProductItems);
  // useEffect(() => {
  //   console.log('activeon ', ProductItems);
  //   if (ProductItems.length > 0) return;
  //   dispatch(addProducts(data));
  // }, []);

  const { open } = useSelector((state) => state.responsive);

  async function handleNewProducts() {
    const { data } = await axios.post(
      'https://proshopy-i2wk.onrender.com/proshop',
      {},
      { withCredentials: true }
    );
    dispatch(addProducts([data]));
  }
  return (
    <div
      className="flex flex-col items-start justify-center my-5 w-[90%] mx-auto"
      style={open ? { marginTop: '6rem' } : {}}
    >
      <div className=" w-full flex items-center justify-between ">
        <h1 className="font-bold text-3xl text-start text-gray-800 tracking-normal">
          Products
        </h1>
        <button
          className="px-2 py-1 font-semibold text-sm flex items-center justify-center text-gray-50 bg-gray-950/70 hover:bg-gray-950/95 duration-300 cursor-pointer rounded-md md:px-4"
          onClick={handleNewProducts}
        >
          <FontAwesomeIcon
            icon={faEdit}
            className="text-sm text-gray-50 font-semibold "
          />
          create products
        </button>
      </div>
      <div className="overflow-x-auto w-full mt-3 border-collapse">
        <table className="m-w-max md:w-full  border-collapse [&_tbody]:even:bg-zinc-400/30 ">
          <thead className="w-full [&_th]:text-md [&_th]:text-gray-900/80 [&_th]:text-center ">
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </thead>
          {ProductItems &&
            ProductItems.map((product) => (
              <ProductData product={product} setData={setData} />
            ))}
        </table>
      </div>
    </div>
  );
}

function ProductData({ product, setData }) {
  const { _id: id, name, price, category, brand } = product;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleNavigateToEdit() {
    console.log('edit bar ');
    dispatch(EditProduct(product));
    navigate(`/admin/${id}/edit`);
  }

  async function handleRemoveProduct() {
    const { data } = await axios.delete(
      `https://proshopy-i2wk.onrender.com/proshop/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    if (data.status === 400) return toast.error(data.message);

    dispatch(getProduct(data.data));
    console.log('remaining data', data.data);
    // setData((prev) => !prev);

    return toast.success(data.message);
  }
  return (
    <tbody className="w-full [&_td]:text-[13px] [&_td]:text-zinc-800/70 [&_td]:text-center [&_td]:p-1   ">
      <td>{id}</td>
      <td className="line-clamp-1">{name}</td>
      <td>${price}</td>
      <td>{category}</td>
      <td>{brand}</td>
      <td className="flex  flex-row items-center justify-center md:justify-start  gap-1 md:flex-row">
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
    'https://proshopy-i2wk.onrender.com/proshop',
    {
      withCredentials: true,
    }
  );
  if (!data) return json({ message: 'Data not found ', status: 400 });
  console.log('data available', data);

  return data;
}

export default AdminProducts;
