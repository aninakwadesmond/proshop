const currentState = ['Sign In', 'Shipping', 'Payment', 'Place Order'];
function Nav({ active }) {
  return (
    <div className="sm:w-[50%] mx-auto flex items-center justify-center gap-4">
      {currentState.map((el, index) =>
        index === active - 1 ? (
          <p className="font-semibold text-sm tracking-tight text-zinc-900 capitalize">
            {el}
          </p>
        ) : (
          <p className="font-semibold text-sm tracking-tight text-zinc-300 capitalize">
            {el}
          </p>
        )
      )}
    </div>
  );
}

export default Nav;
