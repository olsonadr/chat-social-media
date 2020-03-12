

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

// Set misc params
const publicDir = path.join(__dirname, '../public');
const port	    = process.env.PORT || 3000;
let chatRooms   = {};
const maxCons   = 5;

// Handlebars context for html rendering
var indexContext = {
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        headerDropdownModeCheck: function(mode, required) {
            return (required == 'any') || (mode == required);
        }
    },
    headerDropdownMenus: [
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
    headerDropdownMode: "logged-out",
    siteLogoSource:   "/BLK_BOARD_logo.jpg",
    siteTitle:        "",
    initData:         "",
    initMessage:      ""
};



// // // // // // // // // // // // // // //
// // //          DB MODELS         // // //
// // // // // // // // // // // // // // //

// Setup database usage
var db = require('../models/');

// User model for authentication
var User = db.User;



// // // // // // // // // // // // // // //
// // //    MIDDLEWARE AND UTILS    // // //
// // // // // // // // // // // // // // //

// Setup misc and Socket.io middleware
var middleware = require('../middleware/')(app, io, session, indexContext, db.User, chatRooms, maxCons);

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
require('../routes/')(app, sessionChecker, indexContext, db.User, chatRooms, maxCons);



// // // // // // // // // // // // // // //
// // //       START LISTENING      // // //
// // // // // // // // // // // // // // //

// Then listen on port
http.listen(port, '0.0.0.0', function() {
    console.log(` ~=> Server is a go!`);
});
