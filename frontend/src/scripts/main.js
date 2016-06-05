(function(){
  var datasets = ['Low Poverty', 'School Proficiency'];

  if (!document.cookie.match("visited=true")) {
    introJs().setOption('showBullets', false).start();
    document.cookie = "visited=true";
  }

  // Create map

  var simpleMap =
    L.map('map-austin', {
      center: [30.2665301, -97.7407723],
      zoom: 14
    });

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    opacity: 1,
    detectRetina: true
  }).addTo(simpleMap);

  function loadDataset(dataset) {
    var bounds = simpleMap.getBounds();
    var convertedCoordsNortheast = Terraformer.Tools.positionToMercator([bounds._northEast.lng, bounds._northEast.lat]);
    var convertedCoordsSouthwest = Terraformer.Tools.positionToMercator([bounds._southWest.lng, bounds._southWest.lat]);

    console.log(convertedCoordsNortheast, convertedCoordsSouthwest);

    var xmin = convertedCoordsSouthwest[0];
    var ymin = convertedCoordsSouthwest[1];
    var xmax = convertedCoordsNortheast[0];
    var ymax = convertedCoordsNortheast[1];

    function getColor(d) {
      return d > 99 ? '#FFEDA0' :
        d > 80 ? '#FED976' :
        d > 65 ? '#FEB24C' :
        d > 50 ? '#FD8D3C' :
        d > 35 ? '#FC4E2A' :
        d > 25 ? '#E31A1C' :
        d > 13 ? '#BD0026' :
        '#800026';
    }

    var url = 'http://127.0.0.1:5000/query?xmin=' + xmin.toString() + '&xmax=' + xmax.toString() + '&ymin=' + ymin.toString() + '&ymax=' + ymax.toString() + '&dataset=' + dataset;
    if (typeof geojson == 'defined') {
      simpleMap.removeLayer(geojson);
      simpleMap.removeLayer(legend);
      console.log(typeof geojson);
    }
    $.getJSON(url, function(data) {
      console.log(data);
      if (!data.hasOwnProperty('features')) {
        return;
      }

      function highlightFeature(feature) {
        var layer = feature.target;

        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      }

      function zoomToFeature(e) {
        simpleMap.fitBounds(e.target.getBounds());
      }

      function resetHighlight(feature) {
        geojson.resetStyle(feature.target);
      }

      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
      }

      var geojson = L.geoJson(data, {onEachFeature: onEachFeature, style: function(feature) {
        var key = (dataset == 'Low Poverty') ? 'POV_IDX' : 'SCHL_IDX';
        return {
          fillColor: getColor(feature.properties[key]),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        };
      }});

      geojson.addTo(simpleMap);

      var legend = L.control({position: 'bottomright'});
      legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [99, 80, 65, 50, 35, 25, 13, 0];
        var labels = ['Least Need', '', '', '', '', '', '', 'Greatest Need'];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            labels[i] + '<br>'
        };

        return div;
      };
      legend.addTo(simpleMap);
    });

  }

  document.querySelector("#poverty").addEventListener("click", loadDataset.bind(this, 'Low Poverty'));
  document.querySelector("#education").addEventListener("click", loadDataset.bind(this, 'School Proficiency'));
})();
