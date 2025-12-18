const products = require('./data/products');
const user = require('./data/user');
const { Order } = require('./models/order-model');
const Products = require('./models/products-model');
const { User } = require('./models/user-model');

//connect to mongoose
// require('../backend/utils/connect')();

async function importData() {
  try {
    await Order.deleteMany();
    await Products.deleteMany();
    await User.deleteMany();

    // const allUsers = user.map((el) => {
    //   const salt = bcrypt.genSalt(10);
    //   const passcode = bcrypt.haha(el.password, salt);
    //   return (el.password = passcode);
    // });
    const users = await User.insertMany(user);
    const userAdmin = users[0]._id;
    const productsContent = products.map((el) => {
      return { ...el, userAdmin };
    });

    await Products.insertMany(productsContent);
    console.log('products added');

    if (require.main === module) process.exit();
  } catch (error) {
    console.log('Failed to add data', error.message);
    if (require.main === module) process.exit(1);
  }
}

async function removeAllData() {
  try {
    await Order.deleteMany();
    await Products.deleteMany();
    await User.deleteMany();
    console.log('Products removed');
  } catch (error) {
    console.log(error.message);
  }
}

if (require.main === module) {
  if (process.argv[2] === '-d') {
    removeAllData();
  } else {
    importData();
  }
}
// if (process.argv[2] === '-d') {
//   removeAllData();
// } else {
//   importData();
// }

module.exports = { importData };
