import * as Plot from "npm:@observablehq/plot";
import * as d3 from "d3";

export function temperaturePlot(data, {width} = {}) {
  let dateTimePeriod = data.properties.periods;
  var meanTemp = Math.round(d3.mean(dateTimePeriod.map(a => a.temperature)));
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
      Plot.ruleY(meanTemp),
      Plot.dot(dateTimePeriod, {x: "startTime", y: "temperature", fill: "temperature"})
    ]
  });
}