import { Link, useParams } from 'react-router-dom';

function Pagination({ pages, pageNumber }) {
  const { id, keyword } = useParams();
  return (
    <div className="w-[90%] mx-auto mt-10">
      <div
        className="max-w-[8rem] flex items-center justify-center border-1 border-gray-950 rounded-md"
        style={pages === 1 ? { width: '3rem' } : {}}
      >
        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
          <Link
            to={`${keyword ? `/search/${keyword}` : ''}/page/${page}`}
            className="p-1 border-[0.5px] w-full text-center text-md font-semibold hover:scale-102 duration-300 "
            style={
              pageNumber === page
                ? { backgroundColor: 'gray', color: '#fff' }
                : {}
            }
          >
            {page}
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Pagination;
