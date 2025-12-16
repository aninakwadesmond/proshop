import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserEdit() {
  const { current } = useSelector((state) => state.userInfo);

  const { name, email, isAdmin } = current;
  // const [Image, setImage] = useState(image);

  // async function handleImageUpload(e) {
  //   const formData = new FormData();
  //   formData.append('image', e.target.files[0]);
  //   try {
  //     const { data } = await axios.post(
  //       'https://proshop-8-4qyi.onrender.com/upload',
  //       formData,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     console.log('your ImageData', data);
  //     setImage(data.image);

  //     toast.success(data.message);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // }
  return (
    <div className="mt-5 w-full flex flex-col items-start, justify-start gap-3">
      <div className="flex-col flex items-start justify-start gap-4 w-[90%] mx-auto">
        <Link
          to="/admin/users"
          className="px-4 py-2 font-semibold text-md capitalize text-gray-50 bg-zinc-400/60 hover:bg-zinc-400 duration-300 text-center cursor-pointer rounded-md"
        >
          Go back
        </Link>
        <div className="flex flex-col items-start justify-start gap-4 w-[30rem] mx-auto">
          <h1 className="font-bold text-3xl text-gray-950/50 tracking-normal">
            Edit User
          </h1>
          <Form
            method="put"
            className="w-full flex flex-col gap-2"
            encType="multipart/form-data"
          >
            <EditInput
              label="Name"
              type="text"
              name="name"
              defaultInput={name}
            />
            <EditInput
              label="Email"
              type="email"
              name="email"
              defaultInput={email}
            />
            <EditInput
              label="isAdmin"
              type="checkbox"
              name="isAdmin"
              defaultInput={isAdmin}
              checkbox={true}
              checked={isAdmin}
            />

            <button
              type="submit"
              className="px-4 py-1 font-semibold text-md capitalize text-gray-50 bg-gray-950/70 hover:bg-gray-950 duration-300 text-center cursor-pointer rounded-md w-[5rem]"
            >
              Update
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function EditInput({
  label,
  type,
  name,
  defaultInput,
  onChange,
  Image,
  checkbox,
  checked,
}) {
  return (
    <div
      className="flex flex-col items-start justify-start gap-[2px] w-full"
      style={
        checkbox
          ? {
              flexDirection: 'row',
              alignItems: 'center',
              width: 'auto',
              gap: '.5rem',
            }
          : {}
      }
    >
      <label htmlFor="" className="text-sm capitalize text-zinc-600/80">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={Image}
        defaultValue={defaultInput}
        checked={checked}
        className="outline-0 px-2 py-1 w-full rounded-md shadow-md shadow-gray-950/10 text-sm text-gray-950/60 border-[0.5px] border-zinc-400/50 accent-emerald-300"
        onChange={onChange}
        style={checkbox ? { width: 'auto', order: -10 } : {}}
      />
    </div>
  );
}

export async function action({ request, params }) {
  console.log('action start');
  const values = await request.formData();
  const response = Object.fromEntries(values.entries());

  console.log('response', response, request.url.split('/')[4]);

  const { data } = await axios.put(
    `https://proshop-8-4qyi.onrender.com/user/${request.url.split('/')[4]}`,
    response,
    {
      withCredentials: true,
    }
  );
  if (data.status === 400) return toast.error(data.message);

  toast.success(data.message);
  return redirect('/admin/users');
}

export default UserEdit;
