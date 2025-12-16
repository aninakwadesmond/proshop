import { faStar, faStarHalf, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Link, useActionData } from 'react-router-dom';
import { addToChart } from '../stores/Feautures/CartSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setDetails } from '../stores/Feautures/Details';
import Meta from '../components/Meta';

function ProductDetails() {
  const [refresh, setRefresh] = useState(false);
  const { productDetails, naming } = useSelector((state) => state.details);

  const { userInfo } = useSelector((state) => state.userInfo);
  console.log(productDetails, naming);
  const { cartItem } = useSelector((state) => state.cartItems);
  const [quantity, setQuantity] = useState(1);
  const response = useActionData();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!response) return;

    dispatch(setDetails(response));
  }, [response, dispatch]);

  const {
    image,
    name,
    description,
    brand,
    category,
    price,
    countInStock,
    rating,
    numReviews,
    reviews,
  } = productDetails;
  const avg = reviews.reduce((acc, cur) => acc + cur?.rating, 0);

  const isReminder = rating % 1 !== 0;

  function handleAddtoCart() {
    dispatch(addToChart({ ...productDetails, quantity }));
  }
  // console.log(Array.from({ length: countInStock }, (_, i) => i + 1));

  const uploads = image.split('.')[0].split('/');
  const upload = uploads.some((item) => item.toLowerCase().includes('uploads'));

  return (
    <>
      <Meta title={name} />
      <div className="flex flex-col items-center justify-center gap-2 my-4 overflow-x-hidden w-full">
        <div className=" flex items-start  justify-center flex-col gap-4 w-[95%] mx-auto">
          <Link
            className="px-2 py-1 rounded-md bg-zinc-40 text-center text-sm capitalize shadow-lg shadow-zinc-400 tracking-tight"
            to=".."
            relative="path"
          >
            Go Back
          </Link>
          {/* // flex flex-col w-full gap-2 items-start justify-center
        sm:justify-start sm:flex-row md:items-center flex-wrap */}
          <div
            className=" grid grid-cols-2 lg:grid-cols-7 w-full gap-4  sm:grid-cols-5 pr-5
        "
          >
            <p className="w-full lg:col-span-3  sm:col-span-3 col-span-2 rounded-md overflow-hidden">
              {!upload ? (
                <img
                  src={image}
                  alt="no Image found"
                  className="h-full hover:scale-102 duration-500 cursor-pointer rounded-md"
                />
              ) : (
                <img
                  src={`https://proshopy-i2wk.onrender.com${image}`}
                  alt="image"
                  className="h-full hover:scale-102 duration-500 cursor-pointer rounded-md"
                />
              )}

              {/* <img
                src={image}
                alt="mouse Image"
                className="h-full hover:scale-102 duration-500 cursor-pointer rounded-md"
              /> */}
            </p>

            {/* <div className="flex items-center justify-start gap-6"> */}
            <div className="flex flex-col items-start justify-start    sm:w-full  gap-2  sm:gap-4  sm:col-span-2 lg:col-span-2 col-span-2 p-2 shadow-lg shadow-zinc-400/40 rounded-md">
              <h2 className="font-bold text-lg capitalize text-gray-950/60 tracking-wide">
                {name}
              </h2>
              <div className="flex items-center justify-start gap-1 flex-wrap mt-4">
                <div className="flex items-center justify-start   gap-1 border-t-1 border-b-1 p-2 border-gray-900/40 w-full ">
                  {Array.from({ length: Math.floor(avg) }, (_, i) => i).map(
                    (el) => (
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-amber-300 text-[10px]"
                      />
                    )
                  )}
                  {isReminder && (
                    <FontAwesomeIcon
                      icon={faStarHalf}
                      className="text-amber-300 text-[10px]"
                    />
                  )}
                  <p className="text-sm text-gray-400">{`${avg} review`} </p>
                </div>
                <p className="flex items-center justify-start  border-b-1 p-2 border-gray-900/20 w-full  font-semibold text-zinc-500 text-sm ">
                  {` Price $${price}`}
                </p>
                <p className="font-semibold text-[12px] tracking-wide text-sm text-gray-600 mt-4">
                  {description}
                </p>
              </div>
            </div>
            <div className=" sm:w-[12rem] rounded-md shadow-lg shadow-zinc-400 flex flex-col gap-2 items-center justify-center overflow-x-hidden sm:max-h-max sm:col-span-2 lg:col-span-2 col-span-2">
              <p className="flex items-center justify-between [&_span]:`text-sm text-gray-600 px-1 py-2 w-full border-b-[0.5px] border-gray-400">
                <span>Price</span>
                <span>{`$${price}`}</span>
              </p>
              <p className="flex items-center justify-between [&_span]:`text-sm text-gray-600 px-1 py-2 w-full border-b-[0.5px] border-gray-400">
                <span>Status</span>
                <span>{`${countInStock}`}</span>
              </p>
              {countInStock > 0 && (
                <p className="flex items-center justify-between [&_span]:`text-sm text-gray-600 px-1 py-2 w-full border-b-[0.5px] border-gray-400">
                  <span>Qty</span>
                  <select
                    name="qty"
                    id=""
                    className="rounded-sm px-3 py-1 border-[0.5px] outline-0 w-[5rem] border-gray-700/50"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    {Array.from({ length: countInStock }, (_, i) => i + 1).map(
                      (el) => (
                        <option value={el}>{el}</option>
                      )
                    )}
                  </select>
                </p>
              )}

              <p className="flex items-center justify-start p-2 w-full ">
                <button
                  className=" bg-gray-700 text-gray-50 font-semibold capitalize tracking-normal rounded-sm shadow-lg shadow-gray-700/20 p-1 cursor-pointer"
                  onClick={handleAddtoCart}
                >
                  Add to Cart
                </button>
              </p>
            </div>
            {/* </div> */}
            <div className="flex flex-col items-start justify-center col-span-2 sm:col-span-3 lg:col-span-3 w-full ">
              <div className="flex flex-col items-start justify-center w-full">
                <h2 className="px-4 py-2 rounded bg-zinc-300 text-md capitalize font-bold text-gray-900 w-full">
                  Reviews
                </h2>
                {reviews.map((review) => (
                  <Review review={review} />
                ))}
              </div>
              <div className="mt-4 pt-3 border-t-[0.5px] border-zinc-400 flex flex-col items-start justify-center gap-2 w-full ">
                <h2 className="px-4 py-2 rounded bg-zinc-300 text-md capitalize font-bold text-gray-900/60 w-full">
                  Write a Customer Review
                </h2>
                {Object.keys(userInfo).length > 0 ? (
                  <Form
                    method="post"
                    className="w-full flex flex-col gap-[0.5px] "
                  >
                    <div className="flex flex-col gap-1 items-start justify-start w-full">
                      <p className="font-semibold text-sm capitalize tracking-tighter text-zinc-500">
                        Rating
                      </p>
                      <select
                        name="rating"
                        id="rating"
                        className="w-full rounded-md border-[0.5px] border-zinc-300 px-1 py-1 text-sm outline-0 text-gray-600 font-semibold"
                      >
                        <option value="">Select...</option>
                        <option value="1">1-Poor</option>
                        <option value="2">2-Cool</option>
                        <option value="3">3-Good</option>
                        <option value="4">4-Very Good</option>
                        <option value="5">5-Excellent</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 items-start justify-start w-full">
                      <p className="font-semibold text-sm capitalize tracking-tighter text-zinc-500">
                        comment
                      </p>
                      <textarea
                        name="comment"
                        id=""
                        rows="3"
                        className="px-1 py-2 rounded-md border-[0.5px] border-zinc-300 resize-none w-full outline-0 text-sm font-semibold tracking-tight text-zinc-500"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="p-1 rounded-md text-gray-50 bg-gray-950/60 tracking-tighter capitalize text-center my-2 w-[4rem] hover:bg-gray-900 duration-300 cursor-pointer"
                    >
                      Submit
                    </button>
                  </Form>
                ) : (
                  <h2 className="px-4 py-2 rounded bg-blue-300 text-sm capitalize font-bold text-blue-50 w-full">
                    Please sign in to write a review
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Review({ review }) {
  const { name, rating, comment, createdAt } = review;
  console.log('createdAt', createdAt);

  const date = createdAt?.split('.')[0]?.split('T') || Date.now;
  const day = date[0];
  const time = date[1];
  console.log('date', date, day, time);
  // console.log(date, day, time);
  return (
    <div className="my-2 flex flex-col gap-1 items-start justify-center">
      <h2 className="font-semibold text-gray-500 text-sm capitalize ">
        <FontAwesomeIcon
          icon={faUser}
          className="text-sm font-semibold text-zinc-400"
        />
        {name}
      </h2>
      <p className="flex items-center justify-start">
        {Array.from({ length: rating }, (_, i) => i).map((el) => (
          <FontAwesomeIcon icon={faStar} className="text-sm text-amber-300" />
        ))}
      </p>
      <h3 className="mb-2 text-sm text-gray-400 text-[10px]">{comment}</h3>
      <span className="text-[10px] text-zinc-300 ">{`${day}, ${time}`}</span>
    </div>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const response = Object.fromEntries(formData.entries());
  const id = request.url.split('/')[3];

  try {
    const { data } = await axios.post(
      `https://proshopy-i2wk.onrender.com/proshop/reviews/${id}`,
      response,
      {
        withCredentials: true,
      }
    );
    console.log('review data', data, data.status);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(error.response, error.response.data);
    }
    toast.error(error.response.data.message);
  }
}

export default ProductDetails;
