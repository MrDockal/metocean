export interface IRawAtmosphereWeatherData {
	datetime: string;
	sea_surface_wave_significant_height: string;
	air_temperature_at_2m_above_ground_level: string;
	wind_from_direction_at_10m_above_ground_level: string;
	wind_speed_at_10m_above_ground_level: string;
}

export interface IAtmosphereWeatherData {
	datetime: string;
	sea_surface_wave_significant_height?: number;
	air_temperature_at_2m_above_ground_level?: number;
	wind_from_direction_at_10m_above_ground_level?: number;
	wind_speed_at_10m_above_ground_level?: number;
}