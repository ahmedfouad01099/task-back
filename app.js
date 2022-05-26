const express = require("express");

const mongoose = require("mongoose");
const path = require("path");

const app = express();

const postsRoutes = require("./routes/posts");

app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true }));

const root = require("path").join(__dirname, "build");
app.use(express.static(root));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/posts", postsRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 400;
  const message = error.message;
  const data = error.data;
  const isSuccess = error.isSuccess;

  res.status(status).json({
    statusCode: status,
    errorMessage: message,
    responseData: data,
    isSuccess,
  });
});

mongoose
  .connect(
    "mongodb+srv://ahmedfouad:2255@cluster0.vnnvp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log(128, "connected...................");
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => console.log(err));
