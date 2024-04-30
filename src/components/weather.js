import * as L from "npm:leaflet";
import * as Plot from "npm:@observablehq/plot";
import * as d3 from "d3";

export function simpleMap(div_name, forecastArea) {
  var divMap = L.DomUtil.get(div_name);
    if(divMap != null){
      divMap._leaflet_id = null;
    }
  const forecastMap = L.map(divMap);
  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
  }).addTo(forecastMap);
  forecastArea.addTo(forecastMap);
  forecastMap.fitBounds(forecastArea.getBounds());
  forecastMap.setZoom(9);

  return forecastMap
}

export function temperaturePlot(forecast, {width} = {}) {
  let forecastPeriods = forecast.properties.periods;
  var meanTemp = Math.round(d3.mean(forecastPeriods.map(a => a.temperature)));
  return Plot.plot({
    title: "Hourly temperature forecast",
    width,
    x: {type: "utc", ticks: "day", label: null},
    y: {grid: true, inset: 10, label: "Degrees (F)"},
    color: {
      type: "diverging",
      scheme: "burd", 
      legend: true, 
      pivot: meanTemp,
      symmetric: true
    },
    marks: [
      // Plot.ruleY(meanTemp),
      Plot.dot(
        forecastPeriods, {
          x: "startTime", 
          y: "temperature", 
          fill: "temperature"},
      Plot.crosshairX(forecastPeriods, {x: "startTime", y: "temperature"})),
  ]
  });
}