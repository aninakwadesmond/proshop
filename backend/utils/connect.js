const mongoose = require('mongoose');

module.exports = async function () {
  return (
    mongoose
      // .connect('mongodb://localhost/proshop')
      .connect(
        'mongodb+srv://aninakwahdesmond3_db_user:@mista334@cluster0.odjki9w.mongodb.net/?appName=Cluster0'
      )
      .then(() => {
        console.log('Connected to the db ');
      })
      .catch((err) => console.log(err, err.message))
  );
};
//
// {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
