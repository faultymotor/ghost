document.addEventListener("DOMContentLoaded", function() {
    let socket = io();
    let appendable = document.getElementById("appendable");

    document.addEventListener("keydown", function(event) {
        socket.emit("typed", event.keyCode);
    })

    socket.on("new-string", function(str, word) {
        appendable.innerHTML = str;
        appendable.style.color = word ? "#32CD32" : "#f4f1d6";
    })
});
