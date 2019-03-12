import { IWeatherData } from '../WeatherInterfaces/IWeatherData';
import * as dateFns from 'date-fns';
import { IAverageData } from '../WeatherInterfaces/IAverageData';

export const calculateAverageRecords = (sinceDate: Date, toDate: Date, weatherData: IWeatherData[]): IAverageData => {
	const filteredWeatherData = weatherData.filter((val: IWeatherData) => dateFns.isWithinRange(val.datetime, sinceDate, toDate));

	let airTemperatureSum = 0;
	let airTemperatureLength = 0;

	let waveSum = 0;
	let waveLength = 0;

	let speedSum = 0;
	let speedLenght = 0;

	filteredWeatherData.forEach((data: IWeatherData) => {
		if (data.air_temperature_at_2m_above_ground_level) {
			airTemperatureSum += data.air_temperature_at_2m_above_ground_level;
			airTemperatureLength ++;
		}
		if (data.sea_surface_wave_significant_height) {
			waveSum += data.sea_surface_wave_significant_height;
			waveLength ++;
		}
		if (data.wind_speed_at_10m_above_ground_level) {
			speedSum += data.wind_speed_at_10m_above_ground_level;
			speedLenght ++;
			
		}
	});

	return {
		sinceDate,
		toDate,
		air_temperature_at_2m_above_ground_level: Math.round(airTemperatureSum / airTemperatureLength),
		sea_surface_wave_significant_height: Math.round(waveSum / waveLength),
		wind_speed_at_10m_above_ground_level: Math.round(speedSum / speedLenght),
		weatherData: filteredWeatherData,
	};
}