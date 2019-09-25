const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const express = require("express");
const request = require("request");

let mstr = "";
let words = [];
let word = false;
let turn = 1;

// TODO: Find better word list
request("https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa.txt", (err, res, body) => {
    words = body.split("\n").filter(word => word.length > 3);
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static("public"));

io.on("connection", function(socket) {
    id = Object.keys(io.sockets.clients().sockets).length;

    socket.emit("connection", mstr, word, id);

    socket.id = id;

    socket.on("typed", function(code, s_id) {
        if (turn != s_id) return;

        let char = String.fromCharCode(code);

        if (code === 8) {
            mstr = mstr.slice(0, -1);
        } else if (char.toUpperCase() != char.toLowerCase()) {
            mstr += char;
        }

        word = words.includes(mstr.toLowerCase())

        io.emit("new-string", mstr, word);
        
        turn = (turn % Object.keys(io.sockets.clients().sockets).length) + 1
  })
});

http.listen(3000, function() {
  console.log("serving on *:3000");
});
