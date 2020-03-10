module.exports = function(app, context, chatRooms, maxCons) {

    // random id generator
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    // Chat Route Middleware
    app.get('/chat', function(req, res) {
        if (req.session.user && req.cookies.user_sid) {

            // find available chat
            let mehChoice, goodChoice, roomID;
            for (const room in chatRooms) {
                if      (chatRooms[room]['status'] == 0) { mehChoice = room; }
                else if (chatRooms[room]['status'] == 1) { goodChoice = room; break; }
            }
            if (typeof(goodChoice) !== 'undefined')     { roomID = goodChoice; }
            else if (typeof(mehChoice) !== 'undefined') { roomID = mehChoice; }

            // generate new chat id if needed
            if (typeof(roomID) == 'undefined') {
                roomID = makeid(10);
            }

            // send to generated or found chat room
            context.siteTitle = "Group Chat";
            context.socketURL = roomID;
            res.render('chat', context);
            context.initMessage = "";
            return;

        }
        else {
            res.redirect('/login');
        }
    });


};
