import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// Connect to Real-time servers
const socket = io("wss://LifeLabsProject-Real-time.skywarspro15.repl.co");
var lastCount = 0;

socket.on("connect", () => {
  socket.emit("ONLINEUSERS");
});

socket.on("USERCOUNT", (arg) => {
  var count = parseInt(arg);
  if (count > lastCount) {
    document.getElementById("onlineUsers").style.animation =
      "countingUp 0.5s ease";
    setTimeout(function () {
      document.getElementById("onlineUsers").innerHTML = arg;
    }, 200);
    setTimeout(function () {
      document.getElementById("onlineUsers").style.animation = "none";
    }, 500);
  } else if (count < lastCount) {
    document.getElementById("onlineUsers").style.animation =
      "countingDown 0.5s ease";
    setTimeout(function () {
      document.getElementById("onlineUsers").innerHTML = arg;
    }, 200);
    setTimeout(function () {
      document.getElementById("onlineUsers").style.animation = "none";
    }, 500);
  }
  lastCount = count;
});
