import * as L from "npm:leaflet";

export function simpleMap(div_name, feature) {
  var container = L.DomUtil.get(div_name);
    if(container != null){
      container._leaflet_id = null;
    }
  const map = L.map(div_name);
  var Stadia_StamenTerrain = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
  });
  Stadia_StamenTerrain.addTo(map);
  feature.addTo(map);
  map.fitBounds(feature.getBounds());
  map.setZoom(9);
  map.invalidateSize();

  return map;
}
