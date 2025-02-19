import acceptChatConnection from "./socket/accept_chat_connection.js";
import acceptSnakeConnection from "./socket/accept_snake_connection.js";
import sessionChecker from "./misc/session_checker.js";
import sessionSocketIntegration from "./misc/session_socket_integration.js";
import clearCookies from "./misc/clear_cookies.js";
import chatSocketHandling from "./socket/chat_socket_handling.js";
import snakeSocketHandling from "./socket/snake_socket_handling.js";

export default function (
  app,
  io,
  session,
  indexContext,
  User,
  chatRooms,
  maxCons,
  defaultAuthedDest,
  defaultNonAuthedDest
) {
  // Returned object
  var result = {};

  // // // // // // // // // // // // // // //
  // // //      MISC MIDDLEWARE       // // //
  // // // // // // // // // // // // // // //

  // Middleware to Check for User Session Cookie
  result.sessionChecker = sessionChecker(
    indexContext,
    defaultAuthedDest,
    defaultNonAuthedDest
  );

  // Session + Socket.io Integration Middleware
  sessionSocketIntegration(app, io, session);

  // Clear Previously Saved Cookies Middleware
  clearCookies(app);

  // // // // // // // // // // // // // // //
  // // //    SOCKET.IO MIDDLEWARE    // // //
  // // // // // // // // // // // // // // //

  // Socket.io Middleware for '/chat' Socket
  chatSocketHandling(io, acceptChatConnection, chatRooms, maxCons);

  // Socket.io Middleware for '/snake' Socket
  snakeSocketHandling(io, acceptSnakeConnection, User);

  // Return results
  return result;
}
