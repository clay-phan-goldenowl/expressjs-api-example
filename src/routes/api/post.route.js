const express = require('express');
const { validate } = require('express-validation');
const postController = require('../../controllers/post.controller');
const {
  createPostValidation,
  getPostValidation,
  deletePostValidation,
  editPostValidation,
} = require('../../validations/post.validation');

const router = express.Router();

// GET /api/posts
router.route('/')
  .get(postController.listPost);

// POST /api/posts
router.route('/')
  .post(validate(createPostValidation, { keyByField: true }), postController.createPost);

// GET /api/posts/:id
router.route('/:id')
  .get(validate(getPostValidation), postController.showPost);

// DELETE /api/posts/:id
router.route('/:id')
  .delete(validate(deletePostValidation), postController.deletePost);

// EDIT /api/post/:id
router.route('/:id')
  .patch(validate(editPostValidation), postController.editPost);

module.exports = router;
