import { useDispatch } from 'react-redux';
import { setAdmin } from '../stores/Feautures/Navigation';
import { Link } from 'react-router-dom';

function AdminDropDown() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-start justify-start text-md gap-2 bg-zinc-200 shadow-md shadow-gray-400/50 rounded-md py-2 absolute top-full left-[50%] -translate-x-[50%] [&_a]:hover:bg-gray-500/60 w-[10rem] [&_a]:px-2 z-50">
      <Link
        to="/admin/products"
        className="text-zinc-900 text-md font-semibold block w-full text-center hover:scale-103 duration-300"
        onClick={() => dispatch(setAdmin())}
      >
        Products
      </Link>
      <Link
        to="/admin/users"
        className="text-zinc-900 text-md font-semibold block w-full text-center hover:scale-103 duration-300"
        onClick={() => dispatch(setAdmin())}
      >
        User
      </Link>
      <Link
        to="/admin"
        className="text-zinc-900 text-md font-semibold block w-full text-center hover:scale-103 duration-300"
        onClick={() => dispatch(setAdmin())}
      >
        orders
      </Link>
    </div>
  );
}

export default AdminDropDown;
