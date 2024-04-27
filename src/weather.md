---
theme: dashboard
toc: false
---

# Weather report

```js
import * as L from "npm:leaflet";
import {temperaturePlot} from "./components/weather.js"
import {simpleMap} from "./components/map.js"
```

```js
const forecast = FileAttachment("./data/forecast.json").json();
```

```js
const div = display(document.createElement("div"));
div.style = "height: 400px;";
const forecastMap = simpleMap(div);
const forecastArea = L.geoJSON([forecast.geometry]).addTo(forecastMap);
forecastMap.fitBounds(forecastArea.getBounds());
```

<div class="grid grid-cols-1">
  <div class="card">${resize((width) => temperaturePlot(forecast, {width}))}</div>
</div>

## Debug

```js echo
display(forecast);
```
