const mongoose = require('mongoose');

module.exports = async function () {
  return mongoose
    .connect('mongodb://localhost/proshop')
    .then(() => {
      console.log('Connected to the db ');
    })
    .catch((err) => console.log(err, err.message));
};
//
// {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
