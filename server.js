var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var express = require('express');

let mstr = "";

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
      if (char.toUpperCase() != char.toLowerCase()){
          mstr += char;
          io.emit("update", mstr);
      }
  })
});

http.listen(3000, function(){
  console.log("listening on *:3000");
});
