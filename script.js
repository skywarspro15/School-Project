document.onscroll = function () {
  appearCards("storyboard");
};
var count = 0;
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

setTimeout(function () {
  document.body.style.overflow = "scroll";
  var loader = document.getElementById("loader");
  loader.classList.add("hidden");
  loader.style.zIndex = "-100";
}, 2000);
