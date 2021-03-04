var router = require("express").Router();
const Resource = require("../Models/ResourceSchema");
const UserSchema = require("../Models/userModel");
const Comment = require("../Models/Comment");

/*  router.use("/", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});  */
router.post("/", (req, res, next) => {
  const {user, resource, text} = req.body;
  const newComment = new Comment({
    user,
    resource,
    text,
  });
  newComment
    .save()
    .then((comment) => {

      UserSchema.findByIdAndUpdate(comment.user, {$push:{comments: comment._id}})
          .then((userUpdated)=>{
            
              Resource.findByIdAndUpdate(comment.resource, {$push:{comments: comment._id}})
              .then((ResourceUpdated)=>{
                res.send(comment)
              })
              .catch(err=>console.log(err))

          })
          .catch(err=>console.log(err))
        })

    .catch((err) => {
      console.log(err);
      res.send(err);
    });
      })

      // update one resource 
router.put("/:comment_id", (req, res, next) => {
  resourceUpdated = Comment.updateOne(
    { _id: req.params.comment_id },
    req.body
  )
    .then((commentUpdated) => {
      res.send(commentUpdated);
    })
    .catch((err) => {
      res.send(err);
    });
});

 // delete one resource 
 router.delete("/:comment_id", (req, res, next) => {
  Comment.findByIdAndRemove(req.params.comment_id)
    .then((response) => {
      res.send("your comment was deleted");
    })
    .catch((err) => {
      res.send(err);
    });
});
 

module.exports = router;
