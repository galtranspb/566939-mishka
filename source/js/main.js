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
    if (mapPopup.classList.contains("modal-map--show")) {
      mapPopup.classList.remove("modal-map--show");
    }
  }
});

var mapLink = document.querySelector(".contacts__link");
var mapPopup = document.querySelector(".modal-map");

mapLink.addEventListener("click", function (event) {
  event.preventDefault();
  mapPopup.classList.add("modal-map--show");
});

function initMap() {
  var element = document.querySelector(".modal-map__container");
  var options = {
    zoom: 17,
    center: {
      lat: 59.938934,
      lng: 30.322536
    }
  };

  var myMap = new google.maps.Map(element, options);

  var markers = [{
    coordinates: {
      lat: 59.938934,
      lng: 30.322536
    },
    image: "../img/icon-map-pin.svg",
    info: "<h3>г. Санкт-Петербург<br> ул. Большая Конюшенная,<br> д. 19/8, офис 101</h3>"
  }]

  for (var i = 0; i < markers.length; i++) {
    addMarker(markers[i]);
  }

  function addMarker(properties) {
    var marker = new google.maps.Marker({
      position: properties.coordinates,
      map: myMap
    });

    if (properties.image) {
      marker.setIcon(properties.image);
    }
    if (properties.info) {
      var InfoWindow = new google.maps.InfoWindow({
        content: properties.info
      });
      marker.addListener("click", function () {
        InfoWindow.open(myMap, marker);
      });
    }
  }
}
