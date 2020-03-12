module.exports = function(io, acceptSnakeConnection, User) {

    let id;

    // Socket.io Middleware for '/chat' Socket
    io.of('/snake')
      .on('connection', function(socket) {

        // Check if connection is unwanted (including username is set)
        if (!acceptSnakeConnection(socket)) {
            console.log(`Closing snake connection to socket ${socket.id}`);
            socket.disconnect(true);
            return;
        }

        var username = socket.request.session.user.username;

        socket.on('score_save', function(score) {
            // save the highscore if new
            console.log(`received score = ${score}`);
            User.findOne({ where: { username: username } })
                .then((user) => {
                    if(user) {
                        if (user.newScore(score) == 1) {
                            socket.emit('new_high_score');
                        }
                    }
                });
        });

    });

}
