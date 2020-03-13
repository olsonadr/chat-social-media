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
        console.log(req.body);
        console.log(context.postData);
        context.postData.push({
        	title: req.body.title,
        	bodytext: req.body.bodytext,
        	url: req.body.url,
        });
        // console.log(context.postData);
        fs.writeFile(
        	'../posts.json',
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
