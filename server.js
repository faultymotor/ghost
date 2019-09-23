const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const express = require("express");
const request = require("request");

let mstr = "";

let words = [];

// TODO: Find better word list
request("https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa.txt", (err, res, body) => {
    words = body.split("\n").filter(word => word.length > 3);
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static("public"));

io.on("connection", function(socket){
  socket.on("typed", function(code) {
      let char = String.fromCharCode(code);
      if (code === 8) {
          mstr = mstr.slice(0, -1);
          io.emit("update", mstr);
      } else
      if (char.toUpperCase() != char.toLowerCase()) {
          mstr += char;
          io.emit("update", mstr);
      }

      if (words.includes(mstr.toLowerCase())) {
          io.emit("word")
      }
  })
});

http.listen(3000, function(){
  console.log("serving on *:3000");
});
