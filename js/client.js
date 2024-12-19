const socket = io("http://localhost:8000")
const form = document.getElementById("messageInput")
const messageInp = document.getElementById("mymessage")
const messageContainer = document.querySelector(".container");
var audio = new Audio('beep.mp3');

const append = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position != 'right') {
        audio.play();
    }
}
function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

const names = prompt("Enter your name to join.")
const messageElement = document.createElement("div");
messageElement.innerText = `Welcome to PingMe, ${names}`;
messageElement.classList.add("message");
messageElement.classList.add("center");
messageContainer.append(messageElement);

socket.emit('new-user-joined', names);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'center')

})
socket.on('left', data => {
    append(`${data}: Left The Chat!`, 'center')

})
form.addEventListener("submit", (e) => {
    e.preventDefault(); //Page reload nahi hoga.
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = ""; //form firse khali ho jaega.
    scrollToBottom();
    
})
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
    scrollToBottom();

})