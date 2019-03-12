import * as React from 'react';
import { IWeatherData } from 'src/Model/WeatherInterfaces/IWeatherData';
import { loadWeatherData } from 'src/Model/loadWeatherData';
import { IRAWSeaWeatherData } from 'src/Model/WeatherInterfaces/ISeaWeatherData';
import { BoxWrapper } from 'src/Components/BoxWrapper/BoxWrapper';
import { TemperatureChart } from 'src/Components/TemperatureChart/TemperatureChart';
import { StyledDashboard } from 'src/Components/Styled/StyledDashboard';
import { DashboardTable, IData } from 'src/Components/DashboardTable/DashboardTable';

interface IProps {
	csvData: string;
	jsonData: IRAWSeaWeatherData;
}

interface IState {
	weatherData: IWeatherData[];
	detailedWeatherData: IWeatherData[];
	selectedDay: Date;
}

export class Dashboard extends React.PureComponent<IProps, IState> {

	public state: IState = {
		selectedDay: new Date('2018-11-08T00:00:00Z'),
		weatherData: [],
		detailedWeatherData: [],
	};

	public async componentDidMount() {
		const weatherData = await loadWeatherData(this.props.csvData, this.props.jsonData);
		this.setState({
			weatherData,
		});
	}

	public render() {
		return (
			<div>
				{
					this.state.weatherData.length > 0 ?
						this.renderDashboard(this.state.weatherData) :
						'loading'
				}
			</div>
		);
	}

	private renderDashboard(weatherData: IWeatherData[]) {

		const temperature: number[] = [];
		const windDirection: string[] = [];
		const windSpeed: string[] = [];
		const ripDirection: string[] = [];
		const ripSpeed: string[] = [];
		const waveHeight: string[] = [];
		const labels: string[] = [];

		this.state.detailedWeatherData.forEach((data: IWeatherData) => {
			temperature.push(data.air_temperature_at_2m_above_ground_level as number); // data will be skipped when 'null'
			windDirection.push(data.wind_from_direction_at_10m_above_ground_level ? data.wind_from_direction_at_10m_above_ground_level.toString() : '--');
			windSpeed.push(data.wind_speed_at_10m_above_ground_level ? data.wind_speed_at_10m_above_ground_level.toString() : '--');
			ripDirection.push(data.sea_surface_wave_from_direction_at_variance_spectral_density_maximum ? data.sea_surface_wave_from_direction_at_variance_spectral_density_maximum.toString() : '--');
			ripSpeed.push(data.surface_sea_water_speed ? data.surface_sea_water_speed.toString() : '--');
			waveHeight.push(`${data.sea_surface_wave_significant_height ? data.sea_surface_wave_significant_height : '--'}/${data.sea_surface_wave_maximum_height ? data.sea_surface_wave_maximum_height : '--'}`);
			labels.push(new Date(data.datetime).toLocaleDateString());
		});

		const atmospehereData: IData[] = [{
			rowName: 'Wind direction',
			columns: windDirection,
		}, {
			rowName: 'Wind speed',
			columns: windSpeed
		}];

		const seaData: IData[] = [{
			rowName: 'Rip speed',
			columns: ripSpeed
		}, {
			rowName: 'Rip direction',
			columns: ripDirection
		}, {
			rowName: 'Wave height',
			columns: waveHeight,
		}];

		return (
			<StyledDashboard>
				<div>
					Today: {this.state.selectedDay.toLocaleDateString()}
				</div>
				<BoxWrapper predictions={5} startDay={this.state.selectedDay} weatherData={weatherData} seeDetail={this.setDetailedWeatherData} />
				<DashboardTable headerIcon={'Wind'} data={atmospehereData}/>
				<DashboardTable headerIcon={'Sea'} data={seaData}/>
				<TemperatureChart data={temperature} labels={labels} />
			</StyledDashboard>
		)
	}

	private setDetailedWeatherData = (detailedWeatherData: IWeatherData[]) => {
		this.setState({
			detailedWeatherData,
		});
	}
}