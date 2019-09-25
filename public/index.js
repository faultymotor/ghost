document.addEventListener("DOMContentLoaded", function() {
    let socket = io();
    let appendable = document.getElementById("appendable");

    let id = 0;

    document.addEventListener("keydown", function(event) {
        socket.emit("typed", event.keyCode, id);
    })

    socket.on("connection", function(str, word, m_id) {
        id = m_id;
        update(str, word);
    })

    socket.on("new-string", function(str, word) {
        update(str, word);
    })

    const update = function(str, word) {
        appendable.innerHTML = str;
        appendable.style.color = word ? "#32CD32" : "#f4f1d6";
    }
});
