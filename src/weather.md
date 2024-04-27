---
theme: dashboard
toc: false
---

# Weather report

```js
import * as L from "npm:leaflet";
import {temperaturePlot} from "./components/weather.js"
```

```js
const forecast = FileAttachment("./data/forecast.json").json();
```

```js
const div = display(document.createElement("div"));
div.style = "height: 400px;";

const map = L.map(div);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
  .addTo(map);

const forecastArea = L.geoJSON([forecast.geometry]).addTo(map);
map.fitBounds(forecastArea.getBounds());
```

<div class="grid grid-cols-1">
  <div class="card">${resize((width) => temperaturePlot(forecast, {width}))}</div>
</div>

## Debug

```js
display(forecast);
```
