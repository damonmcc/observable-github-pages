import * as L from "npm:leaflet";

export function simpleMap(div) {
  const map = L.map(div);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  })
    .addTo(map);

  return map;
}
