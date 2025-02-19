// // // // // // // // // // // // // // //
// // //        DEPENDENCIES        // // //
// // // // // // // // // // // // // // //

// External Requirements
import express, { static as expressStatic } from "express";
import hb from "express-handlebars";
import { join } from "path";
import bodyParserPkg from "body-parser";
const { urlencoded } = bodyParserPkg;
import session from "express-session";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketIO } from "socket.io";

// Create Express app
const app = express();

// Further Requirements
const server = http.createServer(app);
const io = new SocketIO(server);

// Babel Compatibility
import regeneratorRuntime from "regenerator-runtime";

// // // // // // // // // // // // // // //
// // //     PROGRAM PARAMETERS     // // //
// // // // // // // // // // // // // // //

// Express public directory for static delivery
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, "../public");

// Port on which to listen for connections
const port = process.env.PORT || 3000;

// Chatroom parameters
let chatRooms = {}; // Filled with instances of chatrooms
const maxCons = 5; // Max connections to a single chatroom

// Default destinations for authorized and non-authorized requests
const defaultAuthedDest = "/posts";
const defaultNonAuthedDest = "/login";

// Handlebars context for html rendering
const indexContext = {
  helpers: {
    // handlebars helper functions
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
    headerDropdownModeCheck: function (mode, required) {
      return required == "any" || mode == required;
    },
  },
  headerDropdownMenus: [
    // dropdown menus in the header element
    {
      id: "links-menu",
      iconSource: "/img/menu_icon.png",
      items: [
        { label: "Posts", href: "/posts", mode: "any" },
        { label: "Search", href: "/search", mode: "any" },
        { label: "Chat", href: "/chat", mode: "any" },
      ],
    },
    {
      id: "profile-menu",
      iconSource: "/img/user_icon_small.png",
      items: [
        { label: "Profile", href: "/profile", mode: "logged-in" },
        { label: "Logout", href: "/logout", mode: "logged-in" },
        { label: "Login", href: "/login", mode: "logged-out" },
        { label: "Signup", href: "/signup", mode: "logged-out" },
      ],
    },
  ],
  headerDropdownMode: "logged-out", // what set of options should be listed
  siteLogoSource: "/img/benny.png", // site logo image source
  siteTitle: "", // title on tab and on header
  initMessage: "", //message to show on page load
};

// // // // // // // // // // // // // // //
// // //          DB MODELS         // // //
// // // // // // // // // // // // // // //

// Setup database usage
import models from "../models/index.js";

// User model for authentication
const User = models.User;

// Post model for post listing
const Post = models.Post;

// // // // // // // // // // // // // // //
// // //    MIDDLEWARE AND UTILS    // // //
// // // // // // // // // // // // // // //

// Setup misc and Socket.io middleware
import middleware from "../middleware/index.js";
const middlewareRes = middleware(
  app,
  io,
  session,
  indexContext,
  models.User,
  chatRooms,
  maxCons,
  defaultAuthedDest,
  defaultNonAuthedDest
);

// User-session checker middleware
const sessionChecker = middlewareRes.sessionChecker;

// // // // // // // // // // // // // // //
// // //     SETUP EXPRESS APP      // // //
// // // // // // // // // // // // // // //

// Setup Express + Handlebars app engine
app.use(urlencoded({ extended: true }));
app.set("view engine", "handlebars");
app.engine("handlebars", hb.engine());
app.enable("trust proxy");
app.use(cookieParser());

// // // // // // // // // // // // // // //
// // //       EXPRESS ROUTES       // // //
// // // // // // // // // // // // // // //

// Static Public Directory Middleware
app.use(expressStatic(publicDir));

// All express route middleware
import routes from "../routes/index.js";
routes(
  app,
  sessionChecker,
  indexContext,
  models.User,
  models.Post,
  chatRooms,
  maxCons,
  defaultAuthedDest,
  defaultNonAuthedDest
);

// // // // // // // // // // // // // // //
// // //       START LISTENING      // // //
// // // // // // // // // // // // // // //

// Then listen on port
server.listen(port, "0.0.0.0", function () {
  console.log(` ~=> Server is a go!`);
});
