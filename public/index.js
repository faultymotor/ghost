document.addEventListener("DOMContentLoaded", function() {
    let socket = io();
    let appendable = document.getElementById("appendable");

    document.addEventListener("keydown", function(event) {
        socket.emit("typed", event.keyCode);
    })

    socket.on("update", function(str) {
        appendable.innerHTML = str;
        appendable.style.color = "#f4f1d6";
    })

    socket.on("word", function() {
        appendable.style.color = "green";
    })
});
