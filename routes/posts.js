import fs from "fs";

export default function (app, sessionChecker, context, User, Post) {
  // Parameter
  const postPreviewMax = 50;

  app.route("/posts").get(sessionChecker, function (req, res, next) {
    var user = null;

    // Get user logged in
    User.findOne({ where: { username: req.session.user.username } })
      .then(function (u) {
        user = u;
      })
      .then(function () {
        Post.findAll().then(function (posts) {
          // Set context for posts
          context.postData = [];

          posts.forEach(function (post) {
            // get postdata
            var postData = post.dataValues;

            // replace with preview of content
            postData.body = postData.body.substring(0, postPreviewMax) + "...";

            // get whether there is an image
            postData.imageIncluded = postData.image !== null;

            // creation date
            postData.createdAt = post.get("createdAt");

            // set whether user has upvoted the post
            postData.hasVotedOn = user.hasVotedOn(postData.id);

            // add postdata to rendering context
            if (
              !user.dataValues.parentMode ||
              !postData.tags.includes("nsfw")
            ) {
              context.postData.push(postData);
            }
          });

          context.siteTitle = "Posts";
          res.render("posts", context);
          context.initMessage = "";
          return;
        });
      });
  });

  app.route("/add-post").post(sessionChecker, function (req, res, next) {
    // tags
    var tags = [];
    if (req.body.nsfw) {
      tags.push("nsfw");
    }

    // add post to database
    Post.create({
      title: req.body.title,
      group: req.body.group,
      body: req.body.bodytext,
      image: req.body.url,
      score: 0,
      tags: tags,
      author: req.session.user ? req.session.user.username : "undefined",
    })
      .then((post) => {
        res.send({ redirect: "please refresh" });
        return;
      })
      .catch((error) => {
        console.log(error);
        context.initMessage = "Error creating new post!";
        res.send({ redirect: "please refresh" });
        return;
      });
  });
}
