const axios = require('axios');
const { Router } = require('express');
const { authLogin, authAdmin } = require('../auth/authUser');
const { Order } = require('../models/order-model');
const orderRouter = Router();

// @add an Order -private
orderRouter.post('/', authLogin, async (req, res, next) => {
  // console.log('order', req.body, res.user);
  // console.log('addressShip', req.body.shippingaddress);
  try {
    const {
      shippingaddress,
      paymentMethod,
      itemsPrice: itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderItems,
    } = req.body;

    console.log('reafy', shippingaddress, res.user);

    const order = new Order({
      user: res.user.id,
      shippingaddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderItems: orderItems.map((order) => {
        const { name, quantity: qty, image, price } = order;
        const product = order._id;
        return { name, qty, image, price, product, _id: null };
      }),
    });
    console.log('getall save ', order);
    const createdOrder = await order.save();
    console.log('save allll');
    // console.log(
    //   'activeated',
    //   )
    // );

    console.log('rannnging');
    return res.status(201).json(
      await createdOrder.populate('user', {
        name: 1,
        email: 1,
        isAdmin: 1,
        _id: 0,
      })
    );
  } catch (error) {
    res.status(500).json(error.message, error);
  }
});

// @get order by id -private
orderRouter.get('/get/:id', authLogin, async (req, res, next) => {
  console.log('welcome boss ', res.user);
  // console.log(res.user.id, res.user, req.user.id);
  const order = await Order.findById(req.params.id);
  console.log('your', order);
  if (!order) return res.status(400).json({ message: 'not found' });
  return res.status(201).json(order);
});

// @get all order -private
orderRouter.get('/all', authLogin, authAdmin, async (req, res) => {
  const orders = await Order.find({}).populate('user', {
    _id: 1,
    name: 1,
    email: 1,
  });

  console.log('all orders', orders);
  return res.status(200).json(orders);
});

//@upade all orders to paid//put //authLogin, authAdmin,
orderRouter.post('/:id/pay', async (req, res) => {
  console.log('hello data ');
  const { id } = req.params;
  const { userEmail, totalPrice, callbackUrl } = req.body;

  console.log(
    'all Odds',
    id,
    userEmail,
    totalPrice,
    callbackUrl,
    Math.floor(Number(totalPrice) * 100)
  );
  console.log(req.body);
  //initialize paystack;

  try {
    const payStack = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: userEmail,
        amount: Math.round(Number(totalPrice) * 100),
        metadata: { orderId: id },
        callback_url: callbackUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    console.log(id, userEmail, totalPrice, process.env.PAYSTACK_SECRET_KEY);
    res.json({
      paymentUrl: payStack.data.data.authorization_url,
    });
  } catch (error) {
    console.log('paystack error', error.response?.message || error.message);
  }

  //
});

orderRouter.get('/verify', async (req, res) => {
  const { reference } = req.query;
  const response = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );
  const paystackData = response.data.data;

  if (paystackData.status !== 'success') {
    return res.status(400).json({ message: 'Payment failed' });
  }
  // 🔑 get orderId from metadata
  const orderId = paystackData.metadata.orderId;

  // ✅ mark order as PAID
  // const order = await Order.findById(orderId);

  const orders = await Order.findByIdAndUpdate(
    orderId,
    { isPaid: true },
    { new: true }
  );

  if (!orders) return res.status(400).json({ message: 'not found order' });
  return res.status(201).json({ message: 'successful', data: orders });
});

// get all orders -admin
orderRouter.get('/getAll', authLogin, authAdmin, async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
});

//@update orders to delivered

orderRouter.put(
  '/:id/delivered',
  [authLogin, authAdmin],

  async (req, res, next) => {
    console.log('from deliver ', req.body, req.params.id);
    const isDelivered = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // const data = await Order.find({});
    console.log('hello', req.params.id, isDelivered);

    if (!isDelivered)
      return res
        .status(400)
        .json({ message: 'Not delivered' }, { status: 'pass' });
    res.status(201).json(isDelivered);
  }
);

module.exports = orderRouter;
