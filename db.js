const mongoose = require('mongoose'); //для подключение к БД
// const MongoClient = require('mongodb').MongoClient;
const key = require('./key_monga');
// const { mongoPostType } = require('./mongooseSchema');

/* mongoose - подключаемся к БД */
mongoose
  .connect(key.mongoURI, { useNewUrlParser: true }, function (err) {
    if (err) throw err;

    // mongoPostType.find({}, (err, result) => {
    //   if (err) throw err;
    //   console.log('Successfully connected mongoose: ', result);
    // });
  })
  .catch((err) => console.error('\n Connection error! \n', err.message, '\n'))
  .then(() => console.log('MongoDB connected!'));

const db = mongoose.connection;

/** mongodb - подключаемся к БД */
// const client = new MongoClient(key.mongoURI, { useNewUrlParser: true });
// client.connect((err) => {
//   if (err) throw err;
//   const collection = client.db('book').collection('comments');

//   collection.find().toArray(function (err, results) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(results);
//   });

//   client.close();
// });

module.exports = db;
