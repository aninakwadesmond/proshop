// function FormRegister() {
//   return <REsi>
// }

import axios from 'axios';
import Register from '../components/Register';

// export default FormRegister;
function FormRegister() {
  return <Register />;
}

export async function action({ request, params }) {
  const dataInput = await request.formData();
  const events = Object.fromEntries(dataInput.entries());

  const { data } = await axios.post(
    'https://proshop-8-4qyi.onrender.com/user',
    events,
    {
      withCredentials: true,
    }
  );
  console.log(data);
  return data;
}

export default FormRegister;
