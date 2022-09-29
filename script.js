document.onscroll = function () {
  appearCards("storyboard");
};
var count = 0;
var loadStatus = document.getElementById("loadStatus");
async function modifyLoaderRoller(max) {
  if (count >= max) return;
  var roller = document.getElementById("roller");
  var modified = document.createElement("div");

  roller.appendChild(modified);
  count = count + 1;
}

document.body.style.overflow = "hidden";
window.onbeforeunload = function () {
  removeUserCount();
  console.log("Quitting...");
};

setInterval(function () {
  modifyLoaderRoller(6);
}, 200);

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

async function addUserCount() {
  loadStatus.innerHTML = "Logging user count...";
  var result = await makeRequest(
    "GET",
    "https://lifelabsprojectanalytics.skywarspro15.repl.co/addUserCount.php"
  );
  setCookie("visited", "true");
  return result;
}

async function load() {
  if (getCookie("visited") != "true") {
    await addUserCount();
  }
  setTimeout(function () {
    document.body.style.overflow = "scroll";
    var loader = document.getElementById("loader");
    loader.classList.add("hidden");
    loader.style.zIndex = "-100";
  }, 2000);
}

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

function setCookie(cname, cvalue) {
  const today = new Date();
  const d = new Date();
  d.setTime(today.getTime() + 3600000 * 24 * 15);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=Lax";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

load();
