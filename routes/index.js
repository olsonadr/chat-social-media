import signup from "./signup.js";
import login from "./login.js";
import chat from "./chat.js";
import search from "./search.js";
import posts from "./posts.js";
import profile from "./profile.js";
import logout from "./logout.js";
import notFound from "./404.js";

export default function (
  app,
  sessionChecker,
  indexContext,
  User,
  Post,
  chatRooms,
  maxCons,
  defaultAuthedDest,
  defaultNonAuthedDest
) {
  // // // // // // // // // // // // // // //
  // // //       EXPRESS ROUTES       // // //
  // // // // // // // // // // // // // // //

  // Index Route
  app.get("/", sessionChecker, function (req, res) {
    // Redirect to dashboard page (after sessionChecker)
    res.redirect(defaultAuthedDest);
  });

  // Signup Route Middleware
  signup(app, sessionChecker, indexContext, User);

  // Login Route Middleware
  login(app, sessionChecker, indexContext, User);

  // Chat Route Middleware
  chat(app, sessionChecker, indexContext, chatRooms, maxCons);

  // Search Route Middleware
  search(app, sessionChecker, indexContext);

  // Post Listing and Adding Middleware
  posts(app, sessionChecker, indexContext, User, Post);

  // Profile Page Middleware
  profile(app, sessionChecker, indexContext, User);

  // Logout Route Middleware
  logout(app);

  // 404 Route Middleware (MUST COME LAST)
  notFound(app, sessionChecker, indexContext);
}
