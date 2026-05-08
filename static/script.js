let msg = document.getElementById("inpMsg")
let btn = document.getElementById("btnSend")
let msgArea = document.getElementById("msgArea")
let ul = document.getElementById("ul")
function check() {
    if (msg.value.trim() === '') {
        btn.disabled = true
    }
    else {
        btn.disabled = false

    }
}

const socket = io();
function send() {
    let text = msg.value;
    socket.emit("myMsg", text)

    msg.value = ''
    check()
}
msg.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        send()
    }
})
btn.addEventListener("click", send())


socket.on("msg", function (data) {
    ul.innerHTML += `<li><strong>${data.username}</strong> ${data.text}</li>`
    msgArea.scrollTo({
        top: msgArea.scrollHeight,
        behavior: "smooth"

    })
})