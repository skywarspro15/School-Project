// Force window scroll to top
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.onscroll = function () {
  appearCards("storyboard");
};

// Remove JavaScript error notice and replace with loading screen
var count = 0;
var loadStatus = document.getElementById("loadStatus");
var roller = document.getElementById("roller");
var errorIcon = roller.getElementsByClassName("error");
errorIcon[0].remove();

async function modifyLoaderRoller(max) {
  if (count >= max) return;
  var roller = document.getElementById("roller");
  var modified = document.createElement("div");

  roller.appendChild(modified);
  count = count + 1;
}

document.body.style.overflow = "hidden";

setInterval(function () {
  modifyLoaderRoller(6);
}, 200);

// Send a request to increment user count (For analytics purposes)
async function addUserCount() {
  loadStatus.innerHTML = "Logging user count...";
  var result = await makeRequest(
    "GET",
    "https://lifelabsprojectanalytics.skywarspro15.repl.co/addUserCount.php"
  );
  setCookie("visited", "true");
  return result;
}

// Load site
async function load() {
  if (getCookie("visited") != "true") {
    await addUserCount();
    setTimeout(function () {
      openModal("welcomeModal");
    }, 2100);
  }
  loadStatus.innerHTML = "Getting in...";
  setTimeout(function () {
    document.body.style.overflow = "scroll";
    var loader = document.getElementById("loader");
    loader.classList.add("hidden");
    loader.style.zIndex = "-100";
  }, 2000);
}

// XHR functionality
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

// Cookie data
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
