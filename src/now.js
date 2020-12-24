// NPM libraries
const Conf = require('conf');
const Table = require('cli-table3');
const axios = require('axios');
const date = require('date-and-time');
// Project classes
const configKey = require('./configr');
// import { configKey } from './configr';
import {
  validateApiKey,
  validateCityId,
  validateUnits,
  queryCurrentWeather
} from './utils';

export async function now(args) {
  const pattern = date.compile('ddd, MMM DD YYYY HH:mm:ss');
  console.log(date.format(new Date(), pattern));   
  return;

  const config = new Conf().get(configKey);
  const apiKey =
    args.apiKey ||
    args.apikey ||
    args['api-key'] ||
    args.key ||
    args.k ||
    config.apiKey;
  if (!validateApiKey(apiKey)) {
    return;
  }
  const cityId =
    args.city ||
    args.cityId ||
    args.cityID ||
    args['city-id'] ||
    args.c ||
    config.cityId;
  if (!validateCityId(cityId)) {
    return;
  }
  const units = args.units || args.unit || args.u || config.units;
  if (!validateUnits(units)) {
    return;
  }

  const { data } = await queryCurrentWeather(cityId, units, apiKey);

  const table = new Table({
    head: ['City', 'DateTime', 'Weather', 'Temp'],
    colWidths: [15, 23, 18, 7],
    wordWrap: true
  });
  table.push([
    data.name,
    new Date(data.dt * 1000).toLocaleString(),
    data.weather[0].description,
    data.main.temp
  ]);
  console.log(table.toString());
}

export async function current() {
  return;

  // API specific settings https://openweathermap.org/current
  const API_URL       = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY       = '';
  const LOCATION_CODE = '';
  const FULL_API_URL  = `${API_URL}?id=${LOCATION_CODE}&appid=${API_KEY}`;

  axios
  .get(FULL_API_URL)
  .then(response => {
    // Assign vars to response data
    const temperatureK = response.data.main.temp;
    const humidity     = response.data.main.humidity;
    const windSpeedK   = response.data.wind.speed;
    const windDeg      = response.data.wind.deg;
    const cityName     = response.data.name;
    const countryName  = response.data.sys.country;

    // Handle Temperature conversions from Kelvins
    const temperatureF = (temperatureK * 9) / 5 - 459.67;
    const temperatureC = temperatureK - 273.15;

    // Handle wind Speed and Direction conversions from m/s
    const windSpeedMPH = windSpeedK * 2.2369363;
    const windSpeedKPH = windSpeedK * 3.6;
    const windSpeedKNS = windSpeedK * 1.9438445;
    const windDirection = degreesToCardinalDirection(windDeg);

    function degreesToCardinalDirection(d) {
      // keep within the range: 0 <= d < 360
      d = d % 360;

      if (11.25 <= d && d < 33.75) {
        return "NNE";
      } else if (33.75 <= d && d < 56.25) {
        return "NE";
      } else if (56.25 <= d && d < 78.75) {
        return "ENE";
      } else if (78.75 <= d && d < 101.25) {
        return "E";
      } else if (101.25 <= d && d < 123.75) {
        return "ESE";
      } else if (123.75 <= d && d < 146.25) {
        return "SE";
      } else if (146.25 <= d && d < 168.75) {
        return "SSE";
      } else if (168.75 <= d && d < 191.25) {
        return "S";
      } else if (191.25 <= d && d < 213.75) {
        return "SSW";
      } else if (213.75 <= d && d < 236.25) {
        return "SW";
      } else if (236.25 <= d && d < 258.75) {
        return "WSW";
      } else if (258.75 <= d && d < 281.25) {
        return "W";
      } else if (281.25 <= d && d < 303.75) {
        return "WNW";
      } else if (303.75 <= d && d < 326.25) {
        return "NW";
      } else if (326.25 <= d && d < 348.75) {
        return "NNW";
      } else {
        return "N";
      }
    }

    // Construct the human readable response
    const weatherDisplay = `Right now, in \
        ${cityName}, ${countryName} the current temperature is \
        ${temperatureF.toFixed(1)}ºF \
        (${temperatureC.toFixed(1)}ºC), with ${humidity}% humidity, \
        wind ${windSpeedMPH.toFixed(1)}mph (${windSpeedKPH.toFixed(1)}kph / \
        ${windSpeedKNS.toFixed(1)}kn) from the ${windDirection}. \
        Conditions: ${response.data.weather[0].description} `.replace(/\s+/g, " ");

    console.log(weatherDisplay);
  })
  .catch(error => console.log("Error", error));
}