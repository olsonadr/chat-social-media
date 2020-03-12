module.exports = function(req, res, next) {

    if (req.session.user && req.cookies.user_sid) {

        // if the user is logged in already this session
        if (req.originalUrl == '/login' || req.originalUrl == '/signup') { res.redirect('/index'); }
        else { next(); }

    } else {

        if (req.originalUrl == '/login' || req.originalUrl == '/signup') { next(); }
        else { res.redirect('/login'); }
        // next();
    }

};
