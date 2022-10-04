import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("wss://LifeLabsProject-Real-time.skywarspro15.repl.co");

socket.on("connect", () => {
  socket.emit("ONLINEUSERS");
});

socket.on("USERCOUNT", (arg) => {
  document.getElementById("onlineUsers").innerHTML = arg;
});
