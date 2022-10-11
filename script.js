//Scrolling animation
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
var isEnabled = false;
errorIcon[0].remove();

async function modifyLoaderRoller(max) {
  if (count >= max) return;
  var roller = document.getElementById("roller");
  var modified = document.createElement("div");

  roller.appendChild(modified);
  count = count + 1;
  modifyLoaderRoller(max);
}

modifyLoaderRoller(6);

document.body.style.overflow = "hidden";

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

// Get user count
async function getUserCount() {
  loadStatus.innerHTML = "Getting user count...";
  var result = await makeRequest(
    "GET",
    "https://lifelabsprojectanalytics.skywarspro15.repl.co/getUserCount.php"
  );
  var totalCount = document.getElementById("totalUsers");
  totalCount.style.animation = "countingUp 0.5s ease";
  setTimeout(function () {
    totalCount.innerHTML = result + " total users";
  }, 200);
  setTimeout(function () {
    totalCount.style.animation = "";
  }, 500);
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
  await getUserCount();
  loadStatus.innerHTML = "Getting in...";
  document.body.style.overflow = "scroll";
  var loader = document.getElementById("loader");
  loader.classList.add("hidden");
  loader.style.zIndex = "-100";
  enableTooltips();
}

// Hide the loading indicator when there's connectivity issues
function hideLoader() {
  loadStatus.innerHTML = "Getting in...";
  document.body.style.overflow = "scroll";
  var loader = document.getElementById("loader");
  loader.classList.add("hidden");
  loader.style.zIndex = "-100";
  enableTooltips();
}

//Load external HTML
async function loadPage(page) {
  loadStatus.innerHTML = "Loading...";
  var loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  loader.style.zIndex = "1000";
  var modalDiv = document.createElement("div");
  var modalContent = document.createElement("div");
  var closeIcon = document.createElement("span");
  var html = await makeRequest("GET", full + "/" + page);
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
  loadStatus.innerHTML = "Getting in...";
  var loader = document.getElementById("loader");
  loader.classList.add("hidden");
  loader.style.zIndex = "-100";
  document.body.style.overflow = "hidden";
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

// Countdown timer
var countDownDate = new Date("October 14, 2022 12:00:00").getTime();

var now = new Date().getTime();

var distance = countDownDate - now;

var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementById("releasingIN").innerHTML =
  "Something new is releasing in " +
  days +
  "d " +
  hours +
  "h " +
  minutes +
  "m " +
  seconds +
  "s...";

if (distance < 0) {
  clearInterval(x);
  document.getElementById("releasingIN").innerHTML = "Released";
}

var x = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("releasingIN").innerHTML =
    "Something new is releasing in " +
    days +
    "d " +
    hours +
    "h " +
    minutes +
    "m " +
    seconds +
    "s...";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("releasingIN").innerHTML = "Released";
  }
}, 1000);

// Custom cursor
const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
    y = e.clientY - trailer.offsetHeight / 2;

  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 2 : 1})`,
  };

  trailer.animate(keyframes, {
    duration: 800,
    fill: "forwards",
  });
};

function enableTooltips() {
  if (window.innerWidth < 600) {
    isEnabled = false;
  } else {
    isEnabled = true;
  }
  window.onmousemove = (e) => {
    if (isEnabled == true) {
      const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;

      const text = document.getElementById("trailer-text");

      animateTrailer(e, interacting);

      trailer.dataset.type = interacting ? interactable.dataset.type : "";

      if (interacting) {
        trailer.style.opacity = "1";
        trailer.style.borderRadius = "5px";
        trailer.style.width = "auto";
        trailer.style.padding = "5px";
        trailer.style.marginLeft = "10%";
        text.style.fontSize = "5%";
        text.innerText = interactable.dataset.type;
      } else {
        trailer.style.transition = "all 800ms";
        trailer.style.opacity = "0";
        trailer.style.borderRadius = "10px";
        trailer.style.padding = "2px";
        trailer.style.width = "none";
        trailer.style.marginLeft = "0";
        text.style.fontSize = "5%";
        text.innerText = "";
        setTimeout(function () {
          trailer.style.transition = "none";
        }, 800);
      }
    }
  };

  window.onresize = () => {
    if (window.innerWidth < 600) {
      isEnabled = false;
    } else {
      isEnabled = true;
    }
  };
}

load();
