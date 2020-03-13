module.exports = function(app, sessionChecker, context, User, post){

  var postData = require('../posts') //json
  var fs = require ('fs');

  app.route('/posts')
      .get(sessionChecker, function (req, res, next) {
        context.siteTitle = "posts";
        context.postData = postData;
        console.log(postData);
        res.status(200).render('postspage', context);
      })

  app.route('/add-post')
      .post(sessionChecker, function (req, res, next) {
        console.log(req.body);
        console.log(postData);
        postData.push({
        	title: req.body.title,
          group: req.body.group,
        	bodytext: req.body.bodytext,
        	url: req.body.url,
          nsfw: req.body.nsfw,
        });
        console.log(postData);
        fs.writeFile(
        	'../posts.json',
        	JSON.stringify(postData, 2, 2),
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
