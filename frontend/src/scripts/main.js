var L = require("leaflet");

(function(){
  var simpleMap =
    L.map('map-austin', {
      center: [30.299886, -97.737296],
      zoom: 10
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      opacity: 1,
      detectRetina: true
    }).addTo(simpleMap);
})();
