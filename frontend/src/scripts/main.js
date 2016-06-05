(function(){
  if (!document.cookie.match("visited=true")) {
    introJs().setOption('showBullets', false).start();
    // document.cookie = "visited=true";
  }

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

function test () {

}

var test = () => {

};
