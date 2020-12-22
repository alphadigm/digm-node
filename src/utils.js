import axios from 'axios';

export async function validateApiKey() {return 1;}
export async function validateCityId() {return 1;}
export async function validateUnits() {return 1;}

export async function queryCurrentWeather(cityId, units, apiKey) {
  const baseUri = 'http://api.openweathermap.org/data/2.5/weather';
  const url = getApiUrl(baseUri, cityId, units, apiKey);
  return await axios({
    method: 'get',
    url: url
  });
}

export async function queryWeatherForecast(cityId, units, apiKey) {
  const baseUri = 'http://api.openweathermap.org/data/2.5/forecast';
  const url = getApiUrl(baseUri, cityId, units, apiKey);
  return await axios({
    method: 'get',
    url: url
  });
}