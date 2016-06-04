(function(){
  // Create map
  var simpleMap =
    L.map('map-austin', {
      center: [30.25, -97.75],
      zoom: 13
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      opacity: 1,
      detectRetina: true
    }).addTo(simpleMap);

})();
