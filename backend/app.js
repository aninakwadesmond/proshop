// require('express-async-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const config = require('config');
const cors = require('cors');
const express = require('express');
const error = require('./utils/error');
const router = require('./routes/product-route.js');
const userRoute = require('./routes/user-route.js');
const orderRouter = require('./routes/order-route.js');
const ImageRoute = require('./routes/Uploade-route.js');

// const productRoute = require('./routes/product-route');

const app = express();

app.use(express.json());

// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
const allowedOrigins = [
  'http://localhost:5173',
  'https://proshop-1.netlify.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// { origin: '/http://localhost:5173', credentials: true }

app.use(cookieParser());
const port = process.env.PORT || 5000;
// const port = 6000;

//connect to mongoose
require('../backend/utils/connect')();
//prod
require('../backend/utils/prod.js')(app);

app.use('/proshop', router);
app.use('/user', userRoute);
app.use('/order', orderRouter);
app.use('/upload', ImageRoute);

// const root = __dirname.split('\\').splice(0, 4).join('\\');
// // console.log(__dirname, 'your dirname', path.join(root, '/Uploads'));
// // console.log(__dirname.split('\\').splice(0, 4).join('\\'));
// // const __dirname = path.resolve();
// app.use('/Uploads', express.static(path.join(root, '/Uploads')));

const uploadsPath = path.join(__dirname, '..', 'Uploads');
app.use('/Uploads', express.static(uploadsPath));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/Shopify/build')));

  //resirect any false app to the root index
  // app.get('*', (req, res) =>
  //   res.sendFile(path.resolve(__dirname, 'Shopify', 'build', 'index.html'))
  // );
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Shopify/dist/index.html'));
  });
}

app.use(error);

app.listen(port, () => console.log(`conneted to port ${port}`));
