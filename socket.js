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

socket.on("ANNOUNCEMENT", (arg) => {
  createNotification("Announcement", arg, "images/logo.png");
});

function createNotification(title, body, icon) {
  (async () => {
    const showNotification = () => {
      const notification = new Notification(title, {
        body: body,
        icon: icon,
      });

      setTimeout(() => {
        notification.close();
      }, 10 * 1000);

      notification.addEventListener("click", () => {
        window.focus();
        document.getElementById("announcementContent").innerHTML = body;
        openModal("announcementModal");
      });
    };

    let granted = false;

    if (Notification.permission === "granted") {
      granted = true;
    } else if (Notification.permission !== "denied") {
      let permission = await Notification.requestPermission();
      granted = permission === "granted" ? true : false;
    }

    // show notification or error
    granted ? showNotification() : showError();
  })();
}
