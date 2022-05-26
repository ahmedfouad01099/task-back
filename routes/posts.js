const express = require("express");
const { body, check } = require("express-validator");
const postController = require("../controller/posts");

const router = express.Router();

// ===>  /posts
router.post(
  "/create",
  [
    body("title", "title is required & must be min 3 to 15 char").isLength({
      min: 3,
      max: 15,
    }),
    body("url", "url is required & must be a valid url").isURL({
      min: 3,
      max: 15,
    }),
  ],
  postController.createPosts
);

router.get("/get", postController.getPosts);

module.exports = router;
