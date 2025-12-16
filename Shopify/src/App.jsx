import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home, { loader as LoadProducts } from './pages/Home'; //  { loader }
import Navigation from './components/Navigation';
import RootNavigation from './pages/RootNavigation';
import ProductDetails, {
  action as actionReviews,
} from './pages/ProductDetails';
import store from './stores/store';
import { Provider } from 'react-redux';
import Cart from './pages/Cart';
import FormPage, { action as LoginAction } from './pages/FormPage';
import Register from './components/Register';
import { action as RegisterAction } from './pages/FormRegister';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shipping, { action as ShippingAction } from './pages/Shipping';
import ShippingAcocunt from './pages/ShippingAcocunt';
import PaymentMethod from './pages/PaymentMethod';
import PlaceOrder from './pages/PlaceOrder';
import { action as OrderAction } from './pages/PlaceOrderLayout';
import Oder from './pages/Oder';
import PlaceOrderLayout from './pages/PlaceOrderLayout';
import Profile, {
  action as UpdateAction,
  Loader as LoadCredentials,
} from './pages/Profile';
import AdminRoutes from './pages/AdminRoutes';
import Users, { Loader as UsersLoader } from './pages/Users';
import Admin, { Loader as LoaderOrders } from './pages/Admin';
import AdminProducts, { Loader as AdminLoader } from './pages/AdminProducts';

import { Loader as AdminProductLoader } from './pages/AdminRoutes';
import EditProducts, {
  action as actionEditProducts,
} from './pages/EditProducts';
import UserEdit, { action as actionUser } from './pages/UserEdit';

import { Helmet, HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootNavigation />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: LoadProducts,
      },
      {
        path: '/page/:id',
        element: <Home />,
        loader: LoadProducts,
      },
      {
        path: '/search/:keyword',
        element: <Home />,
        loader: LoadProducts,
      },
      {
        path: '/search/:keyword/page/:id',
        element: <Home />,
        loader: LoadProducts,
      },
      { path: '/:id', element: <ProductDetails />, action: actionReviews },
      { path: 'cart', element: <Cart /> },
      { path: 'login', element: <FormPage />, action: LoginAction },
      { path: 'register', element: <Register />, action: RegisterAction },
      {
        path: 'profile',
        element: <Profile />,
        loader: LoadCredentials,
        action: UpdateAction,
      },
      {
        path: '/shipping',
        element: <ShippingAcocunt />,

        children: [
          { index: true, element: <Shipping />, action: ShippingAction },
          { path: 'paymentMethod', element: <PaymentMethod /> },

          {
            path: 'placeOrder',
            element: <PlaceOrderLayout />,
            action: OrderAction,
            children: [
              {
                index: true,
                element: <PlaceOrder />,
              },
              { path: 'order/:id', element: <Oder />, action: UpdateAction },
            ],
          },
        ],
      },
      {
        path: '/admin',
        element: <AdminRoutes />,
        id: 'data',
        loader: AdminLoader,

        children: [
          { index: true, element: <Admin />, loader: LoaderOrders },
          {
            path: 'products',
            element: <AdminProducts />,
            loader: AdminProductLoader,
          },
          { path: 'users', element: <Users />, loader: UsersLoader },
          {
            path: ':id/edit',
            element: <EditProducts />,
            action: actionEditProducts,
          },
          {
            path: ':id/userEdit',
            element: <UserEdit />,
            action: actionUser,
          },
        ],
      },
      // { path: 'order/:id', element: <Oder />, action: OrderAction },
    ],
  },
]);

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" />
      </Provider>
    </HelmetProvider>
  );
}

export default App;
