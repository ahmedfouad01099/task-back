const { validationResult } = require("express-validator");
const posts = require("../model/posts");

exports.createPosts = (req, res, next) => {
  console.log("5------", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    error.isSuccess = false;
    throw error;
  }

  const newPost = new posts({
    title: req.body.title,
    desc: req.body.desc,
    url: req.body.url,
    createdAt: new Date().toISOString(),
  });

  return newPost
    .save()
    .then(() => {
      res.status(200).send({
        isSuccess: true,
        statusCode: 200,
        errorMessage: null,
        responseData: {
          message: "creating post success.",
          post: newPost,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getPosts = (req, res, next) => {
  posts.find().then((posts) => {
    return res
      .status(200)
      .send({
        isSuccess: true,
        statusCode: 200,
        errorMessage: null,
        responseData: { posts },
      });
  });
};
