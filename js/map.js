// Map Object creation
var MapObject = {

  mapID: null,
  lat: null,
  lng: null,
  zoom: null,

  url: 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=38f98f9003c51e1e2ea3626d3678fc0069a05382',

    // Construct set up with customizable variables
    construct: function(mapID, lat, lng, zoom)  {

      MapObject.mapID = mapID;
      MapObject.lat = lat;
      MapObject.lng = lng;
      MapObject.zoom = zoom;

      MapObject.initMap();
    },

    // " Google Maps " Map set up
    initMap: function() {
      var myLatlng = {lat: MapObject.lat, lng: MapObject.lng};

      MapObject.mapID = new google.maps.Map(MapObject.mapID, {
        zoom: MapObject.zoom,
        center: myLatlng
      });

      MapObject.getMarkers(MapObject.url, MapObject.callbackGetMarkers);
   
    },

    // Generic Ajax Call
    getMarkers: function(url, callback) {

      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.addEventListener('load', function() {

        // Errors management 
        if (req.status >= 200 && req.status < 400) {
          callback(req.responseText);
        } else {
          console.error(req.status + " " + req.status + " " + url);
        }
      });

      req.addEventListener('error', function() {
        console.error("Erreur réseau avec l'URL" + url);
      });

      req.send(null);

    },

    // Markers creation function
    callbackGetMarkers: function (reponse) {

      // Markers array creation
      var markers = [];  

      elements = JSON.parse(reponse); 

      var stations = elements;

      // Json Data recovery
      stations.forEach(function(station) {   

      	// Station object instance creation 
        var stationVelib = new Station.construct(
          station.position,
          station.name,
          station.address,
          station.status,
          station.available_bike_stands,
          station.available_bikes
        );  

        // Marker creation
        var marker = new google.maps.Marker (
          {                        
            position: new google.maps.LatLng(stationVelib.coords.lat, stationVelib.coords.lng),
            map: MapObject.mapID  
          }
        );    

        // Click event add & html changes 
        marker.addListener('click', function() { 

          $('#formButton').css("display", "block");
          var infoStation = document.getElementById('infoStation');

          // Creation of 'p' for form stations informations
          var nameStation = document.createElement('p');
          nameStation.setAttribute('id', 'nameStation');
          var addressStation = document.createElement('p');
          addressStation.setAttribute('id', 'addressStation');
          var statusStation = document.createElement('p');
          var availableStands = document.createElement('p');
          var availableBikes = document.createElement('p');

          // Creation of each ' p ' content
          nameStation.textContent = " Nom de la station : " + stationVelib.name;
          addressStation.textContent = " Adresse de la station : " + stationVelib.address;
          statusStation.textContent = " Statut de la station : " + Station.translate(stationVelib.status);
          availableStands.textContent = " Nombre de places disponibles : " + stationVelib.availableStands;
          availableBikes.textContent = " Nombre de vélos disponibles : " + stationVelib.availableBikes;

          infoStation.innerHTML = "";

          // 'p' following added 
          infoStation.appendChild(nameStation);
          infoStation.appendChild(addressStation);
          infoStation.appendChild(statusStation);
          infoStation.appendChild(availableStands);
          infoStation.appendChild(availableBikes);

          if (stationVelib.availableBikes === 0) {
            alert('Aucun vélo disponible');
            $('#formButton').hide();
          } else if (stationVelib.stationStatus === 'CLOSED') {
            alert('Cette station est fermée actuellement');
            $('#formButton').hide();
          } 
          
         });

         // Filling of markercluster array
         markers.push(marker);

       })

      // Marker Cluster set up       
      var markerCluster = new MarkerClusterer(MapObject.mapID, markers,
        {imagePath: 'js/markerclusterer/m'});

    }

  };

// Initialization 
MapObject.construct (

  document.getElementById('map'),
  45.750000,
  4.850000,
  15

);
