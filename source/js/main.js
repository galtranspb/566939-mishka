var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

var modalButton = document.querySelector(".button--js");
var modalPopup = document.querySelector(".modal");

modalButton.addEventListener("click", function (event) {
  event.preventDefault();
  modalPopup.classList.add("modal--show");

});

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    event.preventDefault();
    if (modalPopup.classList.contains("modal--show")) {
      modalPopup.classList.remove("modal--show");
    }
  }
});
