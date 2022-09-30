// Force window scroll to top
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.onscroll = function () {
  appearElement("storyboard");
  appearElement("menu-list");
};

// Remove JavaScript error notice and replace with loading screen
var count = 0;
var loadStatus = document.getElementById("loadStatus");
var roller = document.getElementById("roller");
var errorIcon = roller.getElementsByClassName("error");
var full = location.protocol + "//" + location.host;
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

// Submit feedback
async function submitFeedback() {
  var feedbackInput = document.getElementById("feedbackText");
  var submitFeedback = document.getElementById("feedbackSubmit");

  submitFeedback.innerHTML = "Submitting...";
  await makeRequest(
    "GET",
    "https://LifeLabsProjectAnalytics.skywarspro15.repl.co/addFeedback.php?content=" +
      feedbackInput.value
  );
  closeModal("feedback.html");
  setTimeout(function () {
    document.getElementById("feedback.html").remove();
  }, 500);
  loadPage("feedbackSuccess.html");
}

// Send a request to increment user count (For analytics purposes)
async function addUserCount() {
  loadStatus.innerHTML = "Incrementing user count...";
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
    }, 100);
  }
  loadStatus.innerHTML = "Getting in...";
  document.body.style.overflow = "scroll";
  var loader = document.getElementById("loader");
  loader.classList.add("hidden");
  loader.style.zIndex = "-100";
}

//Load external HTML
async function loadPage(page) {
  var modalDiv = document.createElement("div");
  var modalContent = document.createElement("div");
  var closeIcon = document.createElement("span");
  var html = await makeRequest("GET", full + "/" + page);
  document.body.style.overflow = "hidden";
  modalDiv.id = page;
  modalDiv.className = "modal active";
  modalContent.className = "modal-content";
  closeIcon.className = "close";
  closeIcon.innerHTML = "&times;";
  closeIcon.style.margin = "10px";
  closeIcon.addEventListener("click", function () {
    closeModal(modalDiv.id);
    setTimeout(function () {
      modalDiv.remove();
    }, 500);
  });

  modalContent.appendChild(closeIcon);
  modalContent.insertAdjacentHTML("beforeend", html);
  modalDiv.appendChild(modalContent);
  document.body.appendChild(modalDiv);
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
