export interface IRAWSeaWeatherData {
	[datetime: string]: {
		sea_surface_wave_from_direction_at_variance_spectral_density_maximum?: number;
		surface_sea_water_speed?: number;
		sea_surface_wave_maximum_height?: number;
	}
}

export interface ISeaWeatherData {
	datetime: string;
	sea_surface_wave_from_direction_at_variance_spectral_density_maximum?: number;
	surface_sea_water_speed?: number;
	sea_surface_wave_maximum_height?: number;
}
