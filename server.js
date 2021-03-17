var express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
const User = require("./Models/UserModel");
const expValidator = require("express-validator");
const Logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");

//Define PORT
const PORT = process.env.PORT || 5000;

const url = process.env.MONGO_URIBel;
// const url = process.env.MONGO_URIJose;

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
app.use(cors());
app.use(Logger("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.SECRET));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 5 * 60 * 1000,
      httpOnly: false,
      secure: false, // for normal http connection if https is there we have to set it to true
    },
  })
);
app.use(cors());
app.use(Logger("dev"));
app.use(expValidator());
app.use("/resources", require("./routes/resources"));
app.use("/comments", require("./routes/comments"));
app.use("/users", require("./routes/users"));
//app.use("/posts", protectedRoutes);

//deploying on Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// middleware to deploy on Heroku
app.use(express.static(path.join(__dirname, "client", "build")));


///All routes

//register user
app.post("/register", async (req, res, next) => {
  let newUser = await req.body;
  let users = await User.find({ email: newUser.email });
  console.log(newUser);
  req.check("name", "invalid name").isLength({ min: 3 });
  req.check("userName", "invalid userName").isLength({ min: 3 });
  req
  .check("email")
  .isEmail()
  .withMessage("Email is not correct")
  .normalizeEmail()
  .withMessage("email not normalized")
  .custom(function () {
    if (users.length) {
      return false;
    } else {
      return true;
    }
  })
  .withMessage("This email is taken!");
  req.check("password", "invalid Password").isLength({ min: 3 });
  
  let errors = req.validationErrors();
  //console.log(errors);
  if (errors) {
    res.send({ validation: errors, msg: false });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          console.log({ success: "validated successfully" });
          let instance = new User({
            name: newUser.name,
            userName: newUser.userName,
            email: newUser.email,
            password: hash,
          });
          instance
          .save()
          .then((result) => {
            console.log(result);
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
            res.send(err);
          });
        }
      });
    });
  }
});

//login user
app.post("/login", (req, res) => {
  let newUser = req.body;
  User.findOne({
    userName: newUser.username,
  })
  
  .then((result) => {
    bcrypt.compare(newUser.password, result.password, function (err, output) {
      if (err) {
        console.log(err);
      } else {
        req.session.user = result;
        res.json({
          userSession: req.session.user,
          logIn: output,
          user: result,
        });
      }
    });
  })
  .catch((err) => {
    res.send(err);
  });
});

//profile route GET to display the user data
app.get("/profile", (req, res, next) => {
  console.log("is it working?", req.session.user);
  let displayUser = req.body;
  console.log(displayUser);
  User.findOne({ email: req.session.user.email })
  .select("name userName email password")
  .then((result) => {
    res.send(result);
  })
  .catch((err) => res.send(err));
});

//profile update the user data
app.put("/update", (req, res, next) => {
  let updateUser = req.body;
  console.log(updateUser);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(updateUser.password, salt, function (err, hash) {
      if (err) {
        res.send(err);
      } else {
        User.updateOne(
          { email: updateUser.email },
          {
            name: updateUser.name,
            userName: updateUser.userName,
            email: updateUser.email,
            password: hash,
          }
          )
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            res.send(err);
          });
        }
      });
    });
  });
  
  //delete profile
  app.delete("/delete/:user_id", (req, res) => {
    let userId = req.params.user_id;
    User.findByIdAndDelete(userId)
    .then((response) => {
      req.session.destroy();
      res.send({ msg: "your profile was successfully deleted" });
    })
    .catch((err) => res.send(err));
  });
  
  app.delete("/logout", (req, res, next) => {
    req.session.destroy();
    sessionStorage.clear();
    res.sendStatus(204);
    User.findByIdAndUpdate(
      { email: newUser.email },
      {
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password,
      }
      )
      .then((result) => res.sed(result))
      .catch((err) => res.send(err));
    });
    
    connectDB();
    
    //added to deploy on heroku
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
    
        app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
    