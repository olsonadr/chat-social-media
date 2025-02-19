// Whether a connection should be accepted to a chat room
export default function (socket) {
  // User not logged in
  if (typeof socket.request?.session?.user == "undefined") {
    return false;
  }

  // Else (all good)
  return true;
}
