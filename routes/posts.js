module.exports = function(app, sessionChecker, context, User, Post){

  // Dependencies
  var fs = require('fs');

  // Parameter
  const postPreviewMax = 50;

  // context.postData = require('../posts'); //json

  app.route('/posts')
      .get(sessionChecker, function (req, res, next) {
        var user = null;

        // Get user logged in
        User.findOne({ where: { username: req.session.user.username}}).then(function(u) {
            user = u;
        }).then(function() {

            Post.findAll().then(function(posts) {
                // Set context for posts
                context.postData = [];

                posts.forEach(function(post) {
                    // get postdata
                    var postData = post.dataValues;

                    // replace with preview of content
                    postData.body = postData.body.substring(0, postPreviewMax) + '...';

                    // get whether there is an image
                    postData.imageIncluded = (postData.image !== null);

                    // creation date
                    postData.createdAt = post.get('createdAt');

                    // set whether user has upvoted the post
                    postData.hasVotedOn = user.hasVotedOn(postData.id);

                    // add postdata to rendering context
                    if (!user.dataValues.parentMode || !postData.tags.includes('nsfw')) {
                      context.postData.push(postData);
                    }
                });

                // console.log(context.postData);

                context.siteTitle = "Posts";
                res.render('posts', context);
                context.initMessage = "";
                return;

                // });

            });

        });


      });

  app.route('/add-post')
      .post(sessionChecker, function (req, res, next) {
        // add new post from request to context
        // context.postData.push({
        // 	title: req.body.title,
        //   group: req.body.group,
        // 	bodytext: req.body.bodytext,
        // 	url: req.body.url,
        //   nsfw: req.body.nsfw,
        // });

        // write to file of posts
        // fs.writeFile(
        // 	__dirname+'/../posts.json',
        // 	JSON.stringify(context.postData, 2, 2),
        // 	function (err) {
        // 		if (!err) {
        //   		res.status(200).send();
        // 		} else {
        //   		res.status(500).send("Failed to write data on server side.");
        // 		}
        // 	}
        // );

        // tags
        var tags = [];
        if (req.body.nsfw) { tags.push('nsfw'); }

        // add post to database
        Post.create({
            title: req.body.title,
            group: req.body.group,
          	body: req.body.bodytext,
          	image: req.body.url,
            score: 0,
            tags: tags,
            author: (req.session.user) ? (req.session.user.username) : ('undefined')
        })
        .then(post => {
            res.send({redirect: 'please refresh'});
            return;
        })
        .catch(error => {
            console.log(error);
            context.initMessage = 'Error creating new post!';
            res.send({redirect: 'please refresh'});
            return;
        });

      });
}
