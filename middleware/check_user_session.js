module.exports = function(req, res, next) {

    if (req.session.user && req.cookies.user_sid) {
        // if the user is authorized for chat
        // console.log(`req.originalUrl = \'${req.originalUrl}\'`);
        // res.redirect(req.originalUrl);//'/chat');
        // res.redirect('/dash');
        next();

        // else redirect to dashboard
    } else {
        if (req.originalUrl == '/login') { next(); }
        else { res.redirect('/login'); }
        // next();
    }

};
