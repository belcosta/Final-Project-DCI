var router = require("express").Router();
const Resource = require("../Models/ResourceSchema");
const UserSchema = require("../Models/userModel");
const Comment = require("../Models/Comment");

//get all Resources
router.get("/", (req, res, next) => {
  Resource.find({ deleted: false })
    .populate("user")
    .populate({
      path: "comments",
      populate: { path: "user" },
      match: { deleted: false },
    })
    .then((resources) => res.json(resources))
    .catch((err) => res.send(err));
});

//delete all resources
router.delete("/", (req, res, next) => {
  Resource.deleteMany()
    .then((res) => res.json("all resources were deleted"))
    .catch((err) => res.send(err));
});

// add many resources
router.post("/addmany", (req, res, next) => {
  req.body.map((item) => {
    const {
      title,
      link,
      previewImage,
      date,
      user,
      category,
      rating,
      num_ratings,
      num_views,
      paid,
      format,
      description,
      edited,
      deleted,
      comments,
    } = item;

    let newResource = new Resource({
      title,
      link,
      previewImage,
      date,
      user,
      category,
      rating,
      num_ratings,
      num_views,
      paid,
      format,
      description,
      edited,
      deleted,
      comments,
    });
    newResource
      .save()
      .then((resourceAdded) => {
        UserSchema.findByIdAndUpdate(resourceAdded.user, {
          $push: { resources: resourceAdded._id },
        })
          .then((userUpdated) => {
            res.send(resourceAdded);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

//this MiddleWare is protecting all the routes down Below
/* router.use((req, res, next) => {
  if (req.session.user) {
    console.log(req.session.user)
    next();
  } else {
    console.log("error on middleware")
    res.sendStatus(401);
  }  
});  */

router.post("/rating", (req, res, next) => {
  const rate = req.body.rate;
  const resourceId = req.body.resourceId;
  const email = req.body.email;
  Resource.findById(resourceId).then((result) => {
    if (result.rankingUser.includes(email)) {
      //if user already gave a rating
      res.json({ average: result.rating, isUserRateAccepted: false });
    } else {
      //if user didn't give a rating
      const oldAverage = result.rating;
      const oldNumberRating = result.num_ratings;
      const newAverage = Math.round(
        (oldAverage * oldNumberRating + rate) / (oldNumberRating + 1)
      );
      result.rating = newAverage;
      result.num_ratings = oldNumberRating + 1;
      result.rankingUser = [...result.rankingUser, email];
      result.save().then(() => {
        res.json({
          average: newAverage,
          isUserRateAccepted: true,
        });
      });
    }
  });
});

//search for specific term in Resources
router.get("/search/:term", (req, res, next) => {
  const resources = Resource.find({ $text: { $search: req.params.term } })
    .then((resources) => res.json(resources))
    .catch((err) => res.send(err));
});

// add one resource
router.post("/add", (req, res, next) => {
  const {
    title,
    link,
    previewImage,
    date,
    user,
    category,
    rating,
    num_ratings,
    num_views,
    paid,
    format,
    description,
    edited,
    deleted,
    comments,
  } = req.body;

  let resource = new Resource({
    title,
    link,
    previewImage,
    date,
    user,
    category,
    rating,
    num_ratings,
    num_views,
    paid,
    format,
    description,
    edited,
    deleted,
    comments,
  });

  resource
    .save()
    .then((resourceAdded) => {
      UserSchema.findByIdAndUpdate(resourceAdded.user, {
        $push: { resources: resourceAdded._id },
      })
        .then((userUpdated) => {
          res.send(resourceAdded);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      res.send(err);
    });
});

// get one specific Resource
router.get("/:resource_id", (req, res, next) => {
  const resource = Resource.findById(req.params.resource_id)
    .populate("user", "name")
    .then((resource) => res.json(resource))
    .catch((err) => res.send(err));
});

// update one resource (and change "deleted" to "true")
router.put("/:resource_id", (req, res, next) => {
  console.log("inside put router");
  resourceUpdated = Resource.updateOne(
    { _id: req.params.resource_id },
    req.body
  )
    .then((resourceUpdated) => {
      res.send(resourceUpdated);
    })
    .catch((err) => {
      res.send(err);
    });
});

// delete one resource and its comments
router.delete("/:resource_id", (req, res, next) => {
  Resource.findById(req.params.resource_id)
  .then(response=>{
        response.comments.map(comID=>{
          Comment.findByIdAndRemove(comID)
        .then((response) => {
          console.log("comment deleted")
        })
        .catch((err) => res.send(err))
        })
        Resource.findByIdAndRemove(req.params.resource_id)
          .then((response) => {
            console.log("resource deleted")
          })
          .catch((err) => res.send(err)); 
    console.log("where are comments id?", response.comments);
  })
  .catch(err=>res.send(err))
});

module.exports = router;
