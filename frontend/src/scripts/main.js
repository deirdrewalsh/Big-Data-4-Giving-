(function(){

  if (!document.cookie.match("visited=true")) {
    introJs().setOption('showBullets', false).start();
    document.cookie = "visited=true";
  }

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

  document.querySelector("#transportation").addEventListener("click", function () {
    var bounds = simpleMap.getBounds();
    var convertedCoordsNortheast = Terraformer.Tools.positionToMercator([bounds._northEast.lng, bounds._northEast.lat])
    var convertedCoordsSouthwest = Terraformer.Tools.positionToMercator([bounds._southWest.lng, bounds._southWest.lat])

    console.log(convertedCoordsNortheast, convertedCoordsSouthwest);

    var xmin = convertedCoordsSouthwest[0];
    var ymin = convertedCoordsSouthwest[1];
    var xmax = convertedCoordsNortheast[0];
    var ymax = convertedCoordsNortheast[1];

    var dataset = 'Low Poverty';

    function getColor(d) {
      return d > 99 ? '#800026' :
             d > 80  ? '#BD0026' :
             d > 65  ? '#E31A1C' :
             d > 50  ? '#FC4E2A' :
             d > 35   ? '#FD8D3C' :
             d > 25   ? '#FEB24C' :
             d > 13   ? '#FED976' :
                        '#FFEDA0';
    }

    var url = 'http://127.0.0.1:5000/query?xmin=' + xmin.toString() + '&xmax=' + xmax.toString() + '&ymin=' + ymin.toString() + '&ymax=' + ymax.toString() + '&dataset=' + dataset;
    $.getJSON(url, function(data) {
      console.log(data);
      if (!data.hasOwnProperty('features')) {
        return;
      }

      L.geoJson(data, {style: function(feature) {
        return {
          fillColor: getColor(feature.properties.POV_IDX),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        };
      }}).addTo(simpleMap);

      var legend = L.control({position: 'bottomright'});

      legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 13, 25, 35, 50, 65, 80, 99],
        labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
      };
      legend.addTo(simpleMap);
    });
  });
})();