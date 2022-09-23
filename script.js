const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

function cardAppears() {
  var cards = document.getElementById("storyboard");
  if (elementIsVisibleInViewport(cards, true)) {
    cards.classList.remove("hidden");
  }
}

document.onscroll = function () {
  cardAppears();
};
