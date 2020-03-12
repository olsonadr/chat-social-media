module.exports = function(app, io, session, indexContext, User, chatRooms, maxCons) {
  
    // Returned object
    var result = {};

    // // // // // // // // // // // // // // //
    // // //     UTILITY FUNCTIONS      // // //
    // // // // // // // // // // // // // // //

    // Whether a connection should be accepted to a chat room
    const acceptChatConnection = require('./socket/accept_chat_connection');

    // Whether a connection should be accepted to a snake session
    const acceptSnakeConnection = require('./socket/accept_snake_connection');



    // // // // // // // // // // // // // // //
    // // //      MISC MIDDLEWARE       // // //
    // // // // // // // // // // // // // // //

    // Middleware to Check for User Session Cookie
    result.sessionChecker = require('./misc/session_checker.js')(indexContext);

    // Session + Socket.io Integration Middleware
    require('./misc/session_socket_integration.js')(app, io, session);

    // Clear Previously Saved Cookies Middleware
    require('./misc/clear_cookies.js')(app);



    // // // // // // // // // // // // // // //
    // // //    SOCKET.IO MIDDLEWARE    // // //
    // // // // // // // // // // // // // // //

    // Socket.io Middleware for '/chat' Socket
    require('./socket/chat_socket_handling.js')(io, acceptChatConnection, chatRooms, maxCons);

    // Socket.io Middleware for '/snake' Socket
    require('./socket/snake_socket_handling.js')(io, acceptSnakeConnection, User);

    // Return results
    return result;

};
