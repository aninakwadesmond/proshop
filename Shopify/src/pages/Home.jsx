import { defer, Link, useLoaderData } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Products from '../components/Products';

import axios from 'axios';
import Pagination from '../components/Pagination';
import Meta from '../components/Meta';

import { Await } from 'react-router-dom';
import { Suspense } from 'react';
import SwipeComponent from '../components/SwipeComponent';

function Home() {
  const { pages, pageNumber } = useLoaderData();
  console.log('your pageNumber', pageNumber);
  const { products, topRating } = useLoaderData();

  console.log('product available', products, topRating);
  return (
    <>
      {/* <Meta title="Welcome to Proshop" /> */}
      <div className="flex flex-col items-start justify-start gap-4 w-screen overflow-x-hidden ">
        <Suspense
          fallback={
            <div className="flex items-center justify-center mt-5 w-full">
              <p className="text-center font-semibold text-gray-800  tracking-wide animate-spin w-10 h-10 rounded-full bordesr-2 border-b-black/70">
                {/* Loading */}
              </p>
            </div>
          }
        >
          <Await resolve={topRating}>
            {(topRating) => <SwipeComponent topRating={topRating} />}
          </Await>
        </Suspense>

        <Suspense
          fallback={
            <p className="text-center font-semibold text-gray-800">Loading</p>
          }
        >
          <Await resolve={products}>
            {(products) => <Products products={products} />}
          </Await>
        </Suspense>

        {/* <Pagination pages={pages} pageNumber={pageNumber} /> */}
      </div>
    </>
  );
}

async function loadProducts({ request, params }) {
  const { id, keyword } = params;
  // console.log('keyword params', params);

  const { data } = await axios.get(
    `https://proshopy-i2wk.onrender.com/proshop?${id && `page=${id}`}&${
      keyword && `keyword=${keyword}`
    }`,
    {
      withCredentials: true,
    }
  );

  console.log('your data ', data);
  return data;
}
async function loadTopRating({ request, params }) {
  // const { id, keyword } = params;
  console.log('keyword params', params);

  const { data } = await axios.get(
    `https://proshopy-i2wk.onrender.com/proshop/top`,
    {
      withCredentials: true,
    }
  );

  // console.log('your data ', data);
  return data;
}
export async function loader(args) {
  return defer({
    products: await loadProducts(args),
    topRating: loadTopRating(args),
  });
}

export default Home;
