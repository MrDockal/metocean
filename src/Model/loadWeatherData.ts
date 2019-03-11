import * as csvToJson from 'csvtojson';
import { IRAWSeaWeatherData, ISeaWeatherData } from './WeatherInterfaces/ISeaWeatherData';
import { IAtmosphereWeatherData, IRawAtmosphereWeatherData } from './WeatherInterfaces/IAtmosphereWeatherData';
import axios from 'axios';
import * as _ from 'lodash';

const normalizeSeaData = (seaData: IRAWSeaWeatherData): ISeaWeatherData[] => {
	return Object.keys(seaData).map((datetime: string): ISeaWeatherData => ({
		datetime,
		...seaData[datetime],
	}));
}

const mergeDataByDatetime = (data: (IAtmosphereWeatherData | ISeaWeatherData)[]) => {
	const merged = _.chain(data).groupBy('datetime').mapValues((v: (IAtmosphereWeatherData | ISeaWeatherData)[]) => {
		return (v.length === 2) ? {...v[0], ...v[1]} : {...v[0]};
	}).value();
	return Object.values(merged);
}

const normalizeAtmosphereData = (atmosphereData: IRawAtmosphereWeatherData[]) => {
	return atmosphereData.map((data: IRawAtmosphereWeatherData): IAtmosphereWeatherData => ({
		...data,
		air_temperature_at_2m_above_ground_level: data.air_temperature_at_2m_above_ground_level === 'null' ? undefined : parseInt(data.air_temperature_at_2m_above_ground_level, 10),
		sea_surface_wave_significant_height: data.sea_surface_wave_significant_height === 'null' ? undefined : parseInt(data.sea_surface_wave_significant_height, 10),
		wind_from_direction_at_10m_above_ground_level: data.sea_surface_wave_significant_height === 'null' ? undefined : parseInt(data.wind_from_direction_at_10m_above_ground_level, 10),
		wind_speed_at_10m_above_ground_level: data.wind_speed_at_10m_above_ground_level === 'null' ? undefined : parseInt(data.wind_speed_at_10m_above_ground_level, 10),
	}));
}

const loadAtmosphereData = async (dataCsvPath: string) => {
	const atmosphereData = await axios.get(dataCsvPath);
	return normalizeAtmosphereData(await csvToJson().fromString(atmosphereData.data) as IRawAtmosphereWeatherData[]);
}

export const loadWeatherData = async (dataCsvPath: string, rawSeaData: IRAWSeaWeatherData) => {
	const atmosphereData = await loadAtmosphereData(dataCsvPath);
	const seaData = normalizeSeaData(rawSeaData);
	return mergeDataByDatetime([...atmosphereData, ...seaData]);
}
