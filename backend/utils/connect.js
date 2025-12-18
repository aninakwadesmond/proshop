const mongoose = require('mongoose');
const { importData } = require('../seeded');

module.exports = async function () {
  return (
    mongoose
      // .connect('mongodb://localhost/proshop')
      .connect(
        // 'mongodb+srv://aninakwahdesmond3_db_user:mista334@cluster0.odjki9w.mongodb.net/?appName=Cluster0'
        'mongodb+srv://aninakwahdesmond3_db_user:mista334@cluster0.ypti1pb.mongodb.net/?appName=proshop'
      )
      .then(() => {
        importData();
        console.log('Connected to the db 2 ');
      })
      .catch((err) => console.log(err, err.message))
  );
};
//
// {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
