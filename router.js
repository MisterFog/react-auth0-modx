const express = require('express');

const CRUD = require('./CRUDcntrl');

const router = express.Router();

router.post('/post', CRUD.createPost);
router.put('/post/:id', CRUD.updatePost);
router.delete('/post/:id', CRUD.deletePost);
router.get('/post/:id', CRUD.getPostById);
router.get('/posts', CRUD.getPosts);

module.exports = router;
