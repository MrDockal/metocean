import * as React from 'react';
import { IWeatherData } from 'src/Model/WeatherInterfaces/IWeatherData';
import { loadWeatherData } from 'src/Model/loadWeatherData';
import { IRAWSeaWeatherData } from 'src/Model/WeatherInterfaces/ISeaWeatherData';
import { BoxWrapper } from 'src/Components/BoxWrapper/BoxWrapper';
import { TemperatureChart } from 'src/Components/TemperatureChart/TemperatureChart';
import { StyledDashboard } from 'src/Components/Styled/StyledDashboard';
import { DashboardTable, IData } from 'src/Components/DashboardTable/DashboardTable';
import { StyledSection } from 'src/Components/Styled/StyledSection';
import { StyledSeparator } from 'src/Components/Styled/StyledSeparator';
import { formatHoursMinutes } from 'src/Model/Date/formatHoursMinutes';

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
		const windDirection: (string | React.ReactChild)[] = [];
		const windSpeed: (string | React.ReactChild)[] = [];
		const ripDirection: (string | React.ReactChild)[] = [];
		const ripSpeed: (string | React.ReactChild)[] = [];
		const waveHeight: (string | React.ReactChild)[] = [];
		const labels: string[] = [];

		this.state.detailedWeatherData.forEach((data: IWeatherData) => {
			temperature.push(data.air_temperature_at_2m_above_ground_level ? Math.round(data.air_temperature_at_2m_above_ground_level) : null as any); // data will be skipped when 'null'
			windDirection.push(data.wind_from_direction_at_10m_above_ground_level ?
				<i className={`wi wi-wind towards-${Math.round(data.wind_from_direction_at_10m_above_ground_level).toString()}-deg`}/> :
				'--'
			);
			windSpeed.push(data.wind_speed_at_10m_above_ground_level ? Math.round(data.wind_speed_at_10m_above_ground_level).toString() : '--');
			ripDirection.push(data.sea_surface_wave_from_direction_at_variance_spectral_density_maximum ?
				<i className={`wi wi-wind towards-${Math.round(data.sea_surface_wave_from_direction_at_variance_spectral_density_maximum).toString()}-deg`}/> :
				'--'
			);
			ripSpeed.push(data.surface_sea_water_speed ? data.surface_sea_water_speed : '--');
			waveHeight.push(`${data.sea_surface_wave_significant_height ? Math.round(data.sea_surface_wave_significant_height) : '--'}/${data.sea_surface_wave_maximum_height ? Math.round(data.sea_surface_wave_maximum_height) : '--'}`);
			labels.push(formatHoursMinutes(data.datetime));
		});

		const atmospehereData: IData[] = [{
			rowName: 'Time',
			columns: labels,
		}, {
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
			rowName: 'Wave height, avg/max',
			columns: waveHeight,
		}];

		return (
			<StyledDashboard>
				<StyledSection>
					Today: {this.state.selectedDay.toLocaleDateString()}
				</StyledSection>
				<StyledSection>
					<BoxWrapper predictions={5} startDay={this.state.selectedDay} weatherData={weatherData} seeDetail={this.setDetailedWeatherData} />
				</StyledSection>
				{
					this.state.detailedWeatherData.length > 0 &&
					<div>
						<DashboardTable headerIcon={'Wind'} data={atmospehereData} />
						<StyledSeparator />
						<DashboardTable headerIcon={'Sea'} data={seaData} />
						<StyledSeparator />
						<TemperatureChart data={temperature} labels={labels} />
					</div>
				}
			</StyledDashboard>
		)
	}

	private setDetailedWeatherData = (detailedWeatherData: IWeatherData[]) => {
		this.setState({
			detailedWeatherData,
		});
	}
}