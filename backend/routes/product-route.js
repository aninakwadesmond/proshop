const axios = require('axios');
const { Router } = require('express');
const Products = require('../models/products-model');
const { authLogin, authAdmin } = require('../auth/authUser');
const { User } = require('../models/user-model');
const router = Router();

router.get('/', async (req, res, next) => {
  const pageSize = 8;
  const pageNumber = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Products.countDocuments({ ...keyword });
  const products = await Products.find({ ...keyword })

    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));
  console.log('products', products);

  //   const productsWithAvgRating = await Products.aggregate([
  //     //unwind reviews array
  //     brand
  // :
  // "Apple"
  // category
  // :
  // "Electronics"
  // countInStock
  // :
  // 10
  // createdAt
  // :
  // "2025-12-10T21:07:34.387Z"
  // description
  // :
  // "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working"
  // image
  // :
  // "/images/airpods.jpg"
  // name
  // :
  // "Airpods Wireless Bluetooth Headphones"
  // numReviews
  // :
  // "12"
  // price
  // :
  // 89.99
  // rating
  // :
  // 4.5
  // reviews
  // :
  // [{…}]
  // updatedAt
  // :
  // "2025-12-11T21:16:09.254Z"
  // __v
  // :
  // 2
  // _id
  // :
  // "6939e116a40493f6e7e544b9"
  //     {
  //       $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true },
  //     },
  //     //Group by product
  //     {
  //       $group: {
  //         _id: '$_id',
  //         name: { $first: '$name' },
  //         brand:{$first:'$brand'},
  //         category:{$first:'$category'},
  //         countInStock:{$first:'$countInStock'},
  //         createdAt:{$first:'$createdAt'},
  //         description:{$first:'$description'},
  //         image:{$first:'$image'},
  //         numReviews:{$first:'$numReviews'},
  //         price: { $first: '$price' },
  //         avgRating: { $avg: '$reviews.rating' },
  //         totalReviews: {
  //           $sum: {
  //             $cond: [{ $ifNull: ['$reviews', false] }, 1, 0],
  //           },
  //         },
  //       },
  //     },
  //     // 3️⃣ Default avgRating when no reviews
  //     {
  //       $addFields: {
  //         avgRating: { $ifNull: ['$avgRating', 0] },
  //       },
  //     },
  //   ]);

  // mongodb+srv://aninakwahdesmond3_db_user:<db_password>@cluster0.ypti1pb.mongodb.net/?appName=Cluster0
  res.status(200).json({
    products,
    pageNumber,
    pages: Math.ceil(count / pageSize),
  });
});

router.get('/top', async (req, res) => {
  //highest average reviews

  // const highReviews = await Products.aggregate([
  //   { $unwind: '$reviews' },
  //   {
  //     $group: {
  //       id: '$_id',
  //       avgRating: { $avg: '$reviews.rating' },
  //       totalReviews: { $sum: 1 },
  //       name: { $first: '$name' },
  //     },
  //   },
  //   { $sort: { avgRating: -1 } },
  //   { $limit: 3 },
  // ]);
  const highReviews = await Products.aggregate([
    { $unwind: '$reviews' },
    {
      $group: {
        _id: '$_id', // PRODUCT ID
        avgRating: { $avg: '$reviews.rating' },
        totalReviews: { $sum: 1 },
        name: { $first: '$name' },
        image: { $first: '$image' },
        price: { $first: '$price' },
      },
    },
    { $sort: { avgRating: -1 } },
    { $limit: 3 },
  ]);

  console.log(highReviews, 'high reviesw');

  res.status(200).json(highReviews);
});

router.post('/', authLogin, authAdmin, async (req, res) => {
  const productCreated = new Products({
    user: res.user._id,
    name: 'new Products',
    image: '/images/sample.jpg',
    brand: 'electronics',
    category: 'phone and Laptops ',
    price: 20,
    countInStock: 10,
  });
  const product = await productCreated.save();
  if (!product) return res.status(400).json({ message: 'invalid data' });
  res.status(200).json(product);
});

router.put('/:id', authLogin, authAdmin, async (req, res) => {
  console.log(req.body, 'body');
  const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log(product, 'all');

  if (!product)
    return res.status(400).json({ message: 'Failed to update', status: 400 });

  return res.status(200).json({ message: 'Succesfully updated' });
});

router.delete('/delete/:id', authLogin, authAdmin, async (req, res) => {
  const response = await Products.findByIdAndDelete(req.params.id, {
    new: true,
  });

  console.log('pass response', response);

  if (!response)
    return res.status(400).json({ message: 'Not deleted', status: 400 });
  const data = await Products.find({});

  return res
    .status(200)
    .json({ message: 'Successfully delected', status: 200, data });
});

router.post('/reviews/:id', authLogin, authAdmin, async (req, res) => {
  console.log('your respods', res.user);
  const { rating, comment } = req.body;
  const { id } = req.params;

  // console.log('details', rating, comment, id);

  //fincd user;
  const user = await User.findById(res.user.id);
  // 6939e5e7b5e8f292d1162349
  console.log('username', user);
  //find the products
  const product = await Products.findById(req.params.id);
  if (!product)
    return res.status(400).json({ message: 'No Product found', status: 400 });

  console.log(res.user.id);

  //check whether user already have an existing comment
  const alreadyReviewed = product.reviews.find(
    (eachReview) => eachReview.user.toString() === res.user.id.toString()
  );

  console.log('already', alreadyReviewed);

  console.log('already exist', alreadyReviewed);
  if (alreadyReviewed)
    return res
      .status(400)
      .json({ message: 'User already commented', status: 400 });
  const review = product.reviews.push({
    user: res.user.id,
    name: user.name,
    rating,
    comment,
  });
  console.log('review', review);

  const saveREview = await product.save();
  console.log('your new review ', saveREview);

  // const { data } = axios.get('https://proshop-8-4qyi.onrender.com/proshop', {
  //   withCredentials: true,
  // });
  // await Products.findById()

  return res.status(200).json(saveREview);
});
module.exports = router;
