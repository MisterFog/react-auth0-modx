const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  user: String,
  profilePicture: String,
  title: String,
  text: String,
  created: {
    type: Date,
    default: Date.now,
  },
  // объединение двух схем https://code.tutsplus.com/ru/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527
  // admin: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Admin',
  // },
  date_resp: Date,
  text_resp: String,
});

const adminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date_resp: {
    type: Date,
    default: Date.now,
  },
  text_resp: String,
});

// Экспортируем наружу данную модель:
// Экспортируем результат работы данной модели в базе
// т.е. мы говорим mongoosu, что при помощи метода model
// мы хотим зарегистрировать в БД новую коллекцию users
// и модель каждого поста будет являться схемой userSchema
const mongoPostType = mongoose.model('comments', commentSchema);
const mongoAdminType = mongoose.model('admin', adminSchema);

module.exports = { mongoPostType, mongoAdminType };
