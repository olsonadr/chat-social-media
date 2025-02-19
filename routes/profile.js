export default function (app, sessionChecker, context, User) {
  app
    .route("/profile")
    .get(sessionChecker, function (req, res, next) {
      context.siteTitle = "Profile";
      context.username = req.session.user.username;
      res.render("profile", context);
      context.initMessage = "";
      return;
    })
    .post(sessionChecker, function (req, res) {
      var parent_pass = req.body.password;
      var new_mode = req.body.nsfw_allow;
      User.findOne({ where: { username: req.session.user.username } }).then(
        function (user) {
          if (user) {
            if (user.getDataValue("parentMode") == true) {
              // turn off
              user.disableParMode(parent_pass);
            } else {
              // turn on
              user.enableParMode(parent_pass);
            }
          }
        }
      );
    });
}
