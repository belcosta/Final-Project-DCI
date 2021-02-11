const { Router } = require("express");
const session = require("express-session");
var express = require("express");
const mongoose = require("mongoose");
//var cors = require("cors");
require("dotenv").config();
const app = express();
const UserModel = require("../Final-Project-DCI/Models/userModel");
const expValidator = require("express-validator");
const Logger = require("morgan");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const protectedRoutes = require("./routes/protectedRoutes");

//Define PORT
const PORT = process.env.PORT || 5000;

//listen to a port
const url = process.env.MONGO_URIJose;
//connect to DataBase
const connectDB = async () => {
  try {
    //connect return Promise → async/await needed
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    //exit process with failure
    process.exit(1);
  }
};

//MiddleWares
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(Logger("dev"));
//app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(expValidator());
//app.use(authenticateToken());
app.use("/resources", require("./routes/resources"));
app.use("/posts", protectedRoutes);

///All routes
//register user
app.post("/register", (req, res, next) => {
  let newUser = req.body;
  console.log(newUser);

  req.check("name", "invalid name").isLength({ min: 3 });
  req.check("userName", "invalid userName"),
    req.check("email").isEmail().normalizeEmail(),
    req.check("password", "Password").isLength({ min: 3 });

  let errors = req.validationErrors();
  if (errors) {
    res.send({ validation: errors });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          console.log({ success: "validated successfully" });
          let instance = new UserModel({
            name: newUser.name,
            userName: newUser.userName,
            email: newUser.email,
            password: hash,
          });
          instance.save((err, result) => {
            if (err) {
              res.send({ msg: false, err });
            } else {
              res.send(result);
              console.log(result);
            }
          });
        }
      });
    });
  }
});

//login user
app.post("/login", (req, res, next) => {
  let newUser = req.body;
  const userName = newUser.userName;
  const user = { name: userName };
  console.log(userName);
  UserModel.findOne({
    userName: newUser.userName,
  })
    .then((result) => {
      bcrypt.compare(newUser.password, result.password, function (err, output) {
        if (err) {
          console.log(err);
        } else {
          const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
          refreshTokens.push(refreshToken);
          const accessToken = generateAccessToken(user);
          req.session.user = result;
          res.send({
            accessToken: accessToken,
            logIn: output,
            refreshToken: refreshToken,
          });
        }
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

//create a new token
let refreshTokens = [];
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

//expire time to the token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}

//add to db
const posts = [
  {
    userName: "Joseluis",
    title: "post 1",
  },
];
//this route auth {authenticateToken middleware auth!}
app.get("/posts", authenticateToken, (req, res) => {
  console.log(req.user);
  res.json(posts.filter((post) => post.userName === req.user.name));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  //if we have authHeard return authHeader
  const token = authHeader && authHeader.split(" ")[1];

  //if it didnt send the token return error
  if (token == null) return res.sendStatus(401);

  //verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // we see you have a token but is not longer valid NO ACCESS
    if (err) return res.sendStatus(403);
    // user payload
    req.user = user;

    next();
  });
}

app.delete("/logout", (req, res, next) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  //successfully delete this token(204)
  res.sendStatus(204);
});

connectDB();

app.listen(PORT, () => console.log(`Server started on Port${PORT}`));
