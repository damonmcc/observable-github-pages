---
theme: dashboard
toc: false
---

# Weather report

```js
import * as L from "npm:leaflet";
import {simpleMap, temperaturePlot} from "./components/weather.js"
import {getWeather, defaultCoordinates} from "./components/getWeather.js"
```

The [National Weather Service (NWS)](https://www.weather.gov/documentation/services-web-api) provides an excellent and free API for local weather data within the United States. We’ll use the `/points/{latitude},{longitude}` endpoint to get metadata for the closest NWS grid point to the given location and the hourly forecast.

```js
const location = view(Locator(defaultCoordinates));
```

```js
function Locator(initialValue) {
  const form = html`<form style="font: 12px var(--sans-serif); display: flex; height: 33px; align-items: center;">
  <button name=b type=button style="margin-right: 0.5em;">Locate me</button>
  <output name=o></output>
</form>`;
  form.b.onclick = async event => {
    form.value = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords: {longitude, latitude}}) => {
          form.o.value = "Located!";
          resolve([longitude.toFixed(2), latitude.toFixed(2)]);
        },
        (error) => {
          form.o.value = "Error!";
          reject(error);
        }
      );
      form.o.value = "Locating ...";
    });
    form.dispatchEvent(new CustomEvent("input", {bubbles: true}));
  };
  form.value = initialValue;
  return form;
}
```

```js
const [longitude, latitude] = location;
```

```js
const inputLongitude = Inputs.range([-125, -67], {step: 0.01, value: longitude, placeholder: "-180 to 180"});
const inputLongitudeValue = Generators.input(inputLongitude);
const longitudeFinal = (inputLongitudeValue || longitude)
const inputLatitude = Inputs.range([25, 50], {step: 0.01, value: latitude, placeholder: "-180 to 180"});
const inputLatitudeValue = Generators.input(inputLatitude);
const latitudeFinal = (inputLatitudeValue || latitude)
```

```js
let forecast = getWeather(longitudeFinal, latitudeFinal);
```

```js
let forecastArea = await L.geoJSON([forecast.geometry]);
```

<div class="grid grid-cols-2">
  <div class="card">
    <p>Longitude ${inputLongitude}</p>
    <p>Latitude ${inputLatitude}</p>
  </div>
  <div class="card">
    <p>NEW CARD</p>
  </div>
</div>

<div class="card" id="cardForecastMap" style="height: 200px;">${resize((width) => simpleMap("cardForecastMap", forecastArea, {width}))}</div>

<div class="grid grid-cols-1">
  <div class="card">${resize((width) => temperaturePlot(forecast, {width}))}</div>
</div>

## Debug

```js echo
display(forecast);
```

```js echo
display(Inputs.table(forecast.properties.periods))
```

```js echo
forecast.properties.periods.map(a => a.temperature)
```

```js echo
Math.round(d3.mean(forecast.properties.periods.map(a => a.temperature)))
```
