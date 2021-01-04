const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const Post = require('../models/post.model');
const { postSerializer, postCollectionSerializer } = require('../serializers/post.serializer');

exports.listPost = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = 5;
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    if (!posts) throw Error('404 Not Found');
    res.status(httpStatus.OK)
      .json({
        posts: postCollectionSerializer(posts),
        total: totalPosts,
      });
  } catch (error) {
    res.status(httpStatus['400_MESSAGE'])
      .json({ msg: error });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    if (!savedPost) throw Error('Something when wrong when saving post');
    res.status(httpStatus.CREATED)
      .json({ post: postSerializer(savedPost) });
  } catch (error) {
    res.status(httpStatus['400_MESSAGE'])
      .json({ msg: error });
  }
};

exports.showPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Post not found',
      });
    }
    res.status(httpStatus.OK)
      .json(postSerializer(post));
  } catch (error) {
    res.status(httpStatus['400_MESSAGE'])
      .json({ msg: error });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const idPost = req.params.id;
    const post = await Post.findByIdAndDelete(idPost);
    if (!post) throw Error('Post not found!');
    res.status(httpStatus.OK)
      .json({ success: true });
  } catch (error) {
    res.status(httpStatus['400_MESSAGE'])
      .json({ msg: error });
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const idPost = req.params.id;
    const dataPostEdited = req.body;
    const postEdited = await Post.findByIdAndUpdate(idPost, dataPostEdited);
    if (!postEdited) throw Error('Post not found!');
    res.status(httpStatus.OK)
      .json({ post: postSerializer(postEdited) });
  } catch (error) {
    res.status(httpStatus['400_MESSAGE'])
      .json({ msg: error });
  }
};
