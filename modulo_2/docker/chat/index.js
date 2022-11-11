const express = require("express");

const APP = express();

const HTTP = require('http').Server(APP);
const io = require('socket.io')(HTTP);

const PORT = process.env.PORT || 8080;

console.log(PORT);
APP.get('/chat', (req, res) => {
    res.render("index.ejs")
})

io.sockets.on("connection", (socket) => {
    console.log('hola');
    /** Socket listening for the variable username */
    socket.on('username', (username) => {
        console.log(username);
        socket.username = username;
        io.emit("is_online", `<i> ${socket.username} se ha unido al chat.</i>`)
    })

    socket.on("disconnect", (username)=>{
        socket.username = username;
        io.emit("is_online", `<i> ${socket.username} se ha desconectado del chat.</i>`)
    })

    socket.on("chat_message", (message) => {
        io.emit("is_online", `<strong> ${socket.username}.</strong> ${message}`)
    })

})

const server = HTTP.listen (PORT, () => {
    console.log(`Escuchando por el puerto ${server.address().port}`);
})