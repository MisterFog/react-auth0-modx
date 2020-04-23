const { mongoPostType } = require('./mongooseSchema');

/** Create */
const createPost = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a Post',
    });
  }

  const post = new mongoPostType(body);

  if (!post) {
    return res
      .status(400)
      .json({ success: false, error: 'not finde shema post' });
  }

  post
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: post._id,
        name: post.user,
        title: post.title,
        comment: post.text,
        message: 'Post created!',
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Post not created!',
      });
    });
};

/** Update */
const updatePost = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  await mongoPostType.findOne({ _id: req.params.id }, (err, post) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Post not found!',
      });
    }
    post.title = body.title;
    post.text = body.text;
    post
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: post._id,
          message: 'Post updated!',
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Post not updated!',
        });
      });
  });
};

/** Delete */
const deletePost = async (req, res) => {
  await mongoPostType
    .findOneAndDelete({ _id: req.params.id }, (err, post) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      // if (!post) {
      //   return res
      //     .status(404)
      //     .json({ success: false, error: `Post not found` });
      // }

      return res
        .status(200)
        .json({ success: true, _id: req.params.id, data: post });
    })
    .catch((err) => console.log(err));
};

/** findOne */
const getPostById = async (req, res) => {
  await mongoPostType
    .findOne({ _id: req.params.id }, (err, post) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!post) {
        return res
          .status(404)
          .json({ success: false, error: `Post not found` });
      }
      return res.status(200).json({ success: true, data: post });
    })
    .catch((err) => console.log(err));
};

/** Find */
const getPosts = async (req, res) => {
  await mongoPostType
    .find({}, (err, posts) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!posts.length) {
        return res
          .status(404)
          .json({ success: false, error: `Post not found` });
      }
      return res.status(200).json({ success: true, data: posts });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
};
