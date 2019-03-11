import { IAtmosphereWeatherData } from './IAtmosphereWeatherData';
import { ISeaWeatherData } from './ISeaWeatherData';

export type IWeatherData = IAtmosphereWeatherData & ISeaWeatherData;
