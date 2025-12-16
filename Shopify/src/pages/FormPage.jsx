import axios from 'axios';
import Login from '../components/Login';

function FormPage() {
  return <Login />;
}

export async function action({ request, params }) {
  const dataInput = await request.formData();
  const credetials = Object.fromEntries(dataInput.entries());

  console.log(credetials);

  const { data } = await axios.post(
    'https://proshop-8-4qyi.onrender.com/user/login',
    credetials,
    {
      withCredentials: true,
    }
  );

  // console.log('your data ', data);
  return data;
}
export default FormPage;
