(function(){
  // Request Austin's lat and long
  var sdk = new CitySDK(); //Create the CitySDK Instance
      census = sdk.modules.census; //Create an instance of the module

  census.enable("a51fa375e418f5da0f090186e7dc0bf849941772"); //Enable the module with the api key

  var request = {
    "level": "city",
    "state": "TX",
    "city": "Austin"
  };

  census.APIRequest(request, function (city) {
    console.log(city);
    // Create map
    var simpleMap =
      L.map('map-austin', {
        center: [city.lat, city.lng],
        zoom: 13
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        opacity: 1,
        detectRetina: true
      }).addTo(simpleMap);

    var circle = L.circle([city.lat, city.lng], 500, {
      fillOpacity: 0.5
    }).addTo(simpleMap);

    document.querySelector("#transportation").addEventListener("click", function () {
      console.log(circle);
    });

  });

})();
