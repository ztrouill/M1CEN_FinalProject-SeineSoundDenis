import mapboxgl from "mapbox-gl";
import "./index.scss"
import { rotateCamera } from './extrudeBuilding.js'
import { createMap } from './components/map/MyMap.js'

createMap();

//mapboxgl.accessToken = accesssToken;
//let map = createMap();// new mapboxgl.Map(options);

//console.log(map)

// map.on("load", function() { // Au zoom relancer la fonction 
               
// //    rotateCamera(map,0);
//     console.log("hohe")
//     createMarkers(map);
//      var labelLayerId;
//      var layers = map.getStyle().layers;
//      console.log("layers length = " + layers.length)
//      for (var i = 0; i < layers.length; i++) {

//          if (layers[i].name === 'ssd-buildings-0majj9') {
//          labelLayerId = layers[i].id;
//          console.log("hello")
//          break;
//          }
//      }

//      map.addLayer(
//          {
//          'id': '3d-buildings',
//          'source': 'composite',
//          'source-layer': 'building',
//          'filter': ['==', 'extrude', 'true'],
//          'type': 'fill-extrusion',
//          'minzoom': 15,
//          'paint': {
//          'fill-extrusion-color': '#30333c',
         
//          // use an 'interpolate' expression to add a smooth transition effect to the
//          // buildings as the user zooms in
//          'fill-extrusion-height': [
//          'interpolate',
//          ['linear'],
//          ['zoom'],
//          15,
//          0,
//          15.05,
//          ['get', 'height']
//          ],
//          'fill-extrusion-base': [
//          'interpolate',
//          ['linear'],
//          ['zoom'],
//          15,
//          0,
//          15.05,
//          ['get', 'min_height']
//          ],
//          'fill-extrusion-opacity': 1
//          }
//          },
//          labelLayerId
//          );
//  });

//  map.on("click", function(e) {
//      console.log("=" + e.lngLat);

//  });