import { useDispatch, useSelector } from 'react-redux';
import Nav from '../components/Nav';
import { setPaymentMethod } from '../stores/Feautures/CartSlice';
import { useEffect, useState } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';

function PaymentMethod() {
  const dispatch = useDispatch();
  const [check, setCheck] = useState('');
  const navigate = useNavigate();
  const data = useActionData();
  const { open } = useSelector((state) => state.responsive);

  function handleSetPaypal(e) {
    e.preventDefault();
    dispatch(setPaymentMethod(check));
    navigate('/shipping/placeOrder/');
  }
  return (
    <div
      className="flex flex-col items-start justify-center gap-3 mt-6"
      style={open ? { marginTop: '7rem' } : {}}
    >
      <Nav active={3} />
      <div className="flex flex-col items-start justify-center sm:w-120 gap-3 mx-auto mt-4">
        <h1 className="font-bold text-start text-3xl text-gray-600 tracking-tight">
          Payment Method
        </h1>
        <div className="flex flex-col items-start justify-center gap-1">
          <p className="font-bold text-sm text-gray-500 text-start tracking-tighter">
            Select Method
          </p>
          <div className="flex items-center justify-start gap-1">
            <input
              type="radio"
              className="w-4  accent-gray-900 cursor-pointer select-all"
              id="radio"
              value={check}
              onChange={() => setCheck('paypal')}
            />
            <label
              htmlFor="radio"
              className="text-sm text-gray-600 tracking-normal font-normal"
            >
              Paypal or credit card
            </label>
          </div>
          <button
            className="px-4 py-1 rounded-md bg-gray-900 text-gray-50 text-sm tracking-tighter hover:bg-gray-900/70 duration-400 lowercase cursor-pointer"
            onClick={(e) => handleSetPaypal(e)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
