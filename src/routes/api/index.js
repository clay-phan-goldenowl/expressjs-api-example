const express = require('express');
const postRoutes = require('./post.route');
const userRoutes = require('./user.route');

const router = express.Router();

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;
