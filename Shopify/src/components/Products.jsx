import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import products from '../products';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setDetails } from '../stores/Feautures/Details';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import SwipeComponent from './SwipeComponent';

function Products({ products: data }) {
  // const data = useLoaderData();
  // const
  console.log(data);
  const params = useParams();
  console.log(params, 'params');
  const { pages, pageNumber } = data;

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-screen overflow-x-hidden ">
      {/* <SwipeComponent /> */}
      <div className="w-[95%] mx-auto flex flex-col mt-5">
        <h2 className="text-xl capitalize text-gray-400 tracking-normal mb-3 font-bold">
          latest products
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 space-x-4 space-y-3 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {(data.products || products).map((card) => (
            <Link to={`/${card._id}`}>
              <Cart card={card} />
            </Link>
          ))}
        </div>

        {pages === 1 && pages === pageNumber ? (
          ''
        ) : (
          <Pagination pages={pages} pageNumber={pageNumber} />
        )}
        {/* <Pagination pages={pages} pageNumber={pageNumber} /> */}
        <div className="w-full text-center text-sm my-5 text-gray-500 capitalize">
          &copy; Proshop 2025
        </div>
        {/* <img src="https://proshopy-i2wk.onrender.com/Uploads\cap.png" alt="image" /> */}
      </div>
    </div>
  );
}

function Cart({ card }) {
  const dispatch = useDispatch();
  const {
    name,
    image,
    brand,
    category,
    price,
    countInStock,
    rating,
    numReviews,
    reviews,
  } = card;

  const avg = reviews.reduce((acc, cur) => acc + cur?.rating, 0);

  console.log('each Image', image);
  const isReminder = rating % 1 !== 0;

  function handleDetails() {
    dispatch(setDetails(card));
  }

  const uploads = image.split('.')[0].split('/');
  const upload = uploads.some((item) => item.toLowerCase().includes('uploads'));

  return (
    <div
      className="px-2 py-2 flex flex-col space-y-2 w-full border-2 border-gray-200/60 rounded-md shadow-gray-300/50 shadow-md hover:scale-103 duration-500 cursor-pointer"
      onClick={handleDetails}
    >
      {/* <img src={image} alt={name} className="w-full " /> */}
      {/* <img src="../../../Uploads/cap.png" alt="" className="w-full " /> */}

      {!upload ? (
        <img src={image} alt="no Image found" className="w-full " />
      ) : (
        <img src={`https://proshopy-i2wk.onrender.com${image}`} alt="image" />
      )}

      <h2 className="font-bold text-sm line-clamp-1 text-zinc-600">{name}</h2>
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: Math.floor(avg) }, (_, i) => i).map((star) => (
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-300 text-sm"
            />
          ))}
          {isReminder && (
            <FontAwesomeIcon
              icon={faStarHalf}
              className="text-yellow-300 text-sm"
            />
          )}
        </div>
        <p className="text-sm text-zinc-400">{avg} reviews</p>
      </div>
      <p className="text-md font-bold tracking-wide text-gray-400">
        {`$${price}`}
      </p>
    </div>
  );
}
export default Products;
