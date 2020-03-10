module.exports = function(io, acceptChatConnection, chatRooms, maxCons) {

    let id;

    // Socket.io Middleware for '/chat' Socket
    io.of('/chat')
      .on('connection', function(socket) {

        // Check if connection is unwanted (including username is set)
        if (!acceptChatConnection(socket)) {
            console.log(`Closing connection to socket ${socket.id}`);
            socket.disconnect(true);
            return;
        }
        else {
            // add socket to room
            id = socket.handshake.query['id'];
            socket.join('chat' + id);

            if (typeof(chatRooms[id]) == 'undefined') {
                // status: 0 => empty, 1 => partially full, 2 => full
                chatRooms[id] = { numCons: 0, status: 0 };
            }

            chatRooms[id]['numCons'] += 1;
            if (chatRooms[id]['numCons'] >= maxCons) { chatRooms[id]['status'] = 2; }
            else { chatRooms[id]['status'] = 1; }
        }

        var username = socket.request.session.user.username;

        socket.on('chat_join', function() {
            io.of('/chat').to('chat'+socket.handshake.query['id']).emit('is_online', '🔵 <i>' + username + ' joined the chat.</i>');
        });

        socket.on('disconnect', function() {
            // chat alert
            io.of('/chat').to('chat'+socket.handshake.query['id']).emit('is_online', '🔴 <i>' + username + ' left the chat.</i>');

            // remove socket from room
            id = socket.handshake.query['id'];

            // status: 0 => empty, 1 => partially full, 2 => full
            if (typeof(chatRooms[id]) !== 'undefined') {
                chatRooms[id]['numCons']--;
                if (chatRooms[id]['numCons'] <= 0) { delete(chatRooms[id]); }
                else { chatRooms[id]['status'] = 1; }
            }

        });

        socket.on('chat_message', function(message) {
            io.of('/chat').to('chat'+socket.handshake.query['id']).emit('chat_message', '<strong>' + username + '</strong>: ' + message);
            if (typeof(chatRooms) !== 'undefined') {
                // status: 0 => empty, 1 => partially full, 2 => full
                console.log(chatRooms);
            }
        });

    });

}
