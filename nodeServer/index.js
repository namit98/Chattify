const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
    socket.on("user-joined", (name) => {
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    });
    socket.on("send", (message) => {
        socket.broadcast.emit("receive", {
            message: message,
            name: users[socket.id],
        });
    });
    socket.on('disconnect', maessage=> {
        socket.broadcast.emit("leave", {name: `${users[socket.id]}`});
        delete users[socket.id];
    })

});