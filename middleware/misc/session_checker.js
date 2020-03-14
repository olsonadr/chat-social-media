module.exports = function(indexContext, defaultAuthedDest, defaultNonAuthedDest) {

    return function(req, res, next) {

        // if user is logged in this session
        if (req.session.user && req.cookies.user_sid) {
            // Set logged-in status in index context
            indexContext.headerDropdownMode = "logged-in";

            // Catch unnecessary requests
            if (req.originalUrl == '/login' || req.originalUrl == '/signup') { res.redirect(defaultAuthedDest); }

            // Move on
            else { next(); }

        }

        // if user is not logged in this session
        else {
            // Set logged-in status in index context
            indexContext.headerDropdownMode = "logged-out";

            // Prevent unnecessary redirect loop
            if (req.originalUrl == '/login' || req.originalUrl == '/signup') { next(); }

            // If destination doesn't care about login
            else if (req.originalUrl == '/404') { next(); }

            // Redirect to login page
            else { res.redirect(defaultNonAuthedDest); }

        }

    };

};
