// import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function SwipeComponent({ topRating: products }) {
  console.log('top 3 rating', products);
  const swiperRef = useRef();

  const [activeIndex, setActiveIndex] = useState(0);
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    console.log('activeIndex', activeIndex, 'length', totalLength);
  }, [activeIndex]);

  const { open } = useSelector((state) => state.responsive);
  const { user } = useSelector((state) => state.nav);

  return (
    <>
      <style>
        {` 
  .swiper-pagination {
    display: flex !important;
    justify-content: center;
    align-items: center;
    gap: 8px; 
  }


  .swiper-pagination-bullet {
    width: 24px;
    height: 12px;
    background: silver;
    opacity: 1; /* override Swiper default */
    transition: 0.3s ease;
  
  }


  .swiper-pagination-bullet-active {
    background: 'black'
    width: 24px;
    // border-radius: 10px;
  }

`}
      </style>
      <div
        className="w-full h-[20rem] my-5 mx-auto relative sm:w-[50rem]  sm:h-[25rem] md:w-[60rem] md:w-[30rem] "
        style={open ? { marginTop: user ? '10rem' : '7rem' } : {}}
      >
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          // navigation
          // pagination={{ clickable: true }}
          onSwiper={(swipe) => {
            swiperRef.current = swipe;
            setTotalLength(swipe.slides.length);
          }}
          onSlideChange={(swipe) => setActiveIndex(swipe.activeIndex)}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="w-full h-full"
        >
          {products.map((product) => {
            const { image } = product;
            console.log('your image', image, product);
            const uploads = image.split('.')[0].split('/');
            const upload = uploads.some((item) =>
              item.toLowerCase().includes('uploads')
            );
            return (
              <SwiperSlide className="w-full h-full " product={product}>
                {/* const {(image, name, price)} = product; */}
                <div className="flex items-center justify-start h-full relative  bg-slate-500/50">
                  {!upload ? (
                    <img
                      src={image}
                      alt="no Image found"
                      className="w-full h-full sm:clip sm:w-[70%]"
                    />
                  ) : (
                    <img
                      src={`https://proshop-8-4qyi.onrender.com${image}`}
                      alt="image"
                      className="w-full h-full sm:clip sm:w-[70%]"
                    />
                  )}
                  {/* <img
                    src={image}
                    alt={product.name}
                    className="w-[70%] h-full clip"
                  /> */}
                  {/* <div className=" bg-slate-500/50  w-[30%] h-full"></div> */}
                  <div className="absolute bottom-0 left-0 right-0 top-[85%] bg-gray-950/50 text-md sm:text-xl md:text-2xl text-gray-50 font-bold flex flex-col items-center justify-center px-2 py-4">
                    {product.name} (${product.price})
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex w-full justify-between items-center absolute left-0 h-full top-0 z-50 pr-5">
          <button
            onClick={() => swiperRef.current.slidePrev()}
            style={activeIndex === 0 ? { visibility: 'hidden' } : {}}
          >
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              className="text-3xl  text-gray-950/50 hover:text-gray-950/90 duration-300 cursor-pointer"
            />
          </button>

          <button
            onClick={() => swiperRef.current.slideNext()}
            style={
              activeIndex === totalLength - 1 ? { visibility: 'hidden' } : {}
            }
          >
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              className="text-3xl  text-gray-950/50 hover:text-gray-950/90 duration-300 cursor-pointer"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default SwipeComponent;
