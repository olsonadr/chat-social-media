

// // // // // // // // // // // // // // //
// // //        DEPENDENCIES        // // //
// // // // // // // // // // // // // // //

// External Requirements
var express      = require('express');
var hb           = require('express-handlebars');
var path         = require('path');
var bodyParser   = require('body-parser');
var fs           = require('fs');
var pIP          = require('public-ip');
var session      = require('express-session');
var cookieParser = require('cookie-parser');

// Create Express app
var app	         = express();

// Futher Requirements
var http         = require('http').Server(app);
var io           = require('socket.io')(http);

// Babel Compatibility
var regeneratorRuntime = require('regenerator-runtime');



// // // // // // // // // // // // // // //
// // //     PROGRAM PARAMETERS     // // //
// // // // // // // // // // // // // // //

// Express public directory for static delivery
const publicDir = path.join(__dirname, '../public');

// Port on which to listen for connections
const port = process.env.PORT || 3000;

// Chatroom parameters
let chatRooms = {}; // Filled with instances of chatrooms
const maxCons = 5;  // Max connections to a single chatroom

// Default destinations for authorized and non-authorzed requests
const defaultAuthedDest     = "/posts";
const defaultNonAuthedDest  = "/login";

// Handlebars context for html rendering
var indexContext = {
    helpers: { // handlebars helper functions
        section: function(name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        headerDropdownModeCheck: function(mode, required) {
            return (required == 'any') || (mode == required);
        }
    },
    headerDropdownMenus: [ // dropdown menus in the header element
        {
            id: "links-menu",
            iconSource: "/img/menu_icon.png",
            items: [ {label: "Posts",   href: "/posts",   mode: "any"},
                     {label: "Search",  href: "/search",  mode: "any"},
                     {label: "Chat",    href: "/chat",    mode: "any"} ]
        },
        {
            id: "profile-menu",
            iconSource: "/img/user_icon_small.png",
            items: [ {label: "Profile", href: "/profile", mode: "logged-in"},
                     {label: "Logout",  href: "/logout",  mode: "logged-in"},
                     {label: "Login",   href: "/login",   mode: "logged-out"},
                     {label: "Signup",  href: "/signup",  mode: "logged-out"} ]
        }
    ],
    headerDropdownMode: "logged-out", // what set of options should be listed
    siteLogoSource:   "/img/benny.png", // site logo image source
    siteTitle:        "", // title on tab and on header
    initMessage:      "" //message to show on page load
};



// // // // // // // // // // // // // // //
// // //          DB MODELS         // // //
// // // // // // // // // // // // // // //

// Setup database usage
var db = require('../models/');

// User model for authentication
var User = db.User;

// Post model for post listing
var Post = db.Post;



// // // // // // // // // // // // // // //
// // //    MIDDLEWARE AND UTILS    // // //
// // // // // // // // // // // // // // //

// Setup misc and Socket.io middleware
var middleware = require('../middleware/')(app, io, session, indexContext, db.User, chatRooms, maxCons, defaultAuthedDest, defaultNonAuthedDest);

// User-session checker middleware
var sessionChecker = middleware.sessionChecker;



// // // // // // // // // // // // // // //
// // //     SETUP EXPRESS APP      // // //
// // // // // // // // // // // // // // //

// Setup Express + Handlebars app engine
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'handlebars');
app.engine('handlebars', hb());
app.enable('trust proxy');
app.use(cookieParser());



// // // // // // // // // // // // // // //
// // //       EXPRESS ROUTES       // // //
// // // // // // // // // // // // // // //

// Static Public Directory Middleware
app.use(express.static(publicDir));

// All express route middleware
require('../routes/')(app, sessionChecker, indexContext, db.User, db.Post, chatRooms, maxCons, defaultAuthedDest, defaultNonAuthedDest);



// // // // // // // // // // // // // // //
// // //       START LISTENING      // // //
// // // // // // // // // // // // // // //

// Then listen on port
http.listen(port, '0.0.0.0', function() {
    console.log(` ~=> Server is a go!`);
});
