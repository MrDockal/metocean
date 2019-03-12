import { IWeatherData } from './IWeatherData';

export interface IAverageData {
	sinceDate: Date;
	toDate: Date;
	sea_surface_wave_significant_height: number;
	air_temperature_at_2m_above_ground_level: number;
	wind_speed_at_10m_above_ground_level: number;
	weatherData: IWeatherData[];
}