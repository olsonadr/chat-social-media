export default function (app, sessionChecker, context, chatRooms, maxCons) {
  // random id generator
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  // check for id already in list of rooms
  function idAlreadyUsed(chatRooms, id) {
    for (const room in chatRooms) {
      if (room == id) {
        return true;
      }
    }

    return false;
  }

  // Chat Route Middleware
  app.get("/chat", sessionChecker, function (req, res) {
    // find available chat
    let mehChoice, goodChoice, roomID;
    for (const room in chatRooms) {
      if (chatRooms[room]["status"] == 0) {
        mehChoice = room;
      } else if (chatRooms[room]["status"] == 1) {
        goodChoice = room;
        break;
      }
    }
    if (typeof goodChoice !== "undefined") {
      roomID = goodChoice;
    } else if (typeof mehChoice !== "undefined") {
      roomID = mehChoice;
    }

    // generate new chat id if needed
    if (typeof roomID == "undefined") {
      do {
        roomID = makeid(10);
      } while (idAlreadyUsed(chatRooms, roomID));
    }

    // send to generated or found chat room
    context.siteTitle = "Group Chat";
    context.socketURL = roomID;
    res.render("chat", context);
    context.initMessage = "";
    return;
  });
}
