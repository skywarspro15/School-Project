function openModal(id) {
  var modal = document.getElementById(id);
  var modalContent = modal.getElementsByClassName("modal-content");
  var closeButton = modal.getElementsByClassName("close");
  modal.classList.add("active");
  modal.style.animation = "fadeIn 500ms";
  document.body.style.overflow = "hidden";

  closeButton[0].addEventListener(
    "click",
    (e) => {
      modalContent[0].style.animation = "slideUp 500ms";
      modal.style.animation = "fadeOut 500ms";
      setTimeout(function () {
        modal.classList.remove("active");
        modal.style.animation = "none";
        modalContent[0].style.animation = "slideDown 500ms";
      }, 500);
      document.body.style.overflow = "scroll";
    },
    { once: true }
  );
}

function closeModal(id) {
  var modal = document.getElementById(id);
  var modalContent = modal.getElementsByClassName("modal-content");
  modalContent[0].style.animation = "slideUp 500ms";
  modal.style.animation = "fadeOut 500ms";
  setTimeout(function () {
    modal.classList.remove("active");
    modal.style.animation = "none";
    modalContent[0].style.animation = "slideDown 500ms";
  }, 500);
  document.body.style.overflow = "scroll";
}

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

function appearElement(id) {
  var element = document.getElementById(id);
  if (elementIsVisibleInViewport(element, true)) {
    element.classList.remove("hidden");
  }
}

function navItemShow(id) {
  var button = document.getElementById(id);
  var icon = button.getElementsByClassName("iconImg");
  button.href = "javascript: navItemHide('" + id + "');";
  icon[0].src = "icons/up-arrow.png";
  var elements = document.querySelectorAll(".responsive");
  for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].classList.remove("responsive");
    elements[i].classList.add("responsive-active");
  }
}

function navItemHide(id) {
  var button = document.getElementById(id);
  var icon = button.getElementsByClassName("iconImg");
  button.href = "javascript: navItemShow('" + id + "');";
  icon[0].src = "icons/down-arrow.png";
  var elements = document.querySelectorAll(".responsive-active");
  for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].classList.remove("responsive-active");
    elements[i].classList.add("responsive");
  }
}
