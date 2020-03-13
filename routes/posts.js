module.exports = function(app, sessionChecker, context, User, post){

  var fs = require('fs');
  context.postData = require('../posts'); //json

  app.route('/posts')
      .get(sessionChecker, function (req, res, next) {
        context.siteTitle = "posts";
        res.render('postspage', context);
      })

  app.route('/add-post')
      .post(sessionChecker, function (req, res, next) {
        // add new post from request to context
        context.postData.push({
        	title: req.body.title,
          group: req.body.group,
        	bodytext: req.body.bodytext,
        	url: req.body.url,
          nsfw: req.body.nsfw,
        });

        // write to file of posts
        fs.writeFile(
        	__dirname+'/../posts.json',
        	JSON.stringify(context.postData, 2, 2),
        	function (err) {
        		if (!err) {
          		res.status(200).send();
        		} else {
          		res.status(500).send("Failed to write data on server side.");
        		}
        	}
        );
      });
}