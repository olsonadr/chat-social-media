module.exports = function(app, sessionChecker, context) {

    // 404 Route Middleware
    app.get('*', sessionChecker, function(req, res, next) {
        context.siteTitle = "Page Not Found";
        return res.render('404', context);
    });

};
