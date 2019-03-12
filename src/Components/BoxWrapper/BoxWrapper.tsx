import * as React from 'react';
import { IWeatherData } from 'src/Model/WeatherInterfaces/IWeatherData';
import { StyledBoxWrapper } from '../Styled/StyledBoxWrapper';
import { DayPreviewBox } from '../DayPreviewBox/DayPreviewBox';
import * as dateFns from 'date-fns';
import { calculateAverageRecords } from 'src/Model/Weather/calculateAverageRecords';
import { getNameDay } from 'src/Model/Date/getNameDay';

interface IProps {
	startDay: Date;
	predictions: number;
	weatherData: IWeatherData[];
	seeDetail(weatherData: IWeatherData[]): void;
}

interface IState {
	activeKey?: string; 
}

export class BoxWrapper extends React.PureComponent<IProps, IState> {

	public state: IState = {};

	public componentDidMount() {
		if (this.props.predictions < 0) {
			throw new Error('Future predictions cannot be negative number');
		}
	}

	public render() {
		const predictionsArray = Array.from(new Array(this.props.predictions));
		const startOfADay = dateFns.startOfDay(this.props.startDay);
		return (
			<StyledBoxWrapper>
				{
					predictionsArray.map((val: any, day: number) => {
						const previewBoxStartDate = dateFns.addHours(startOfADay, 24 * day);
						const previewBoxEndDate = dateFns.endOfDay(previewBoxStartDate);
						const averageRecords = calculateAverageRecords(previewBoxStartDate, previewBoxEndDate, this.props.weatherData);
						const dateName = ((n: number) => {
							switch (n) {
								case 0:
									return 'Today';
								case 1:
									return 'Tomorrow';
								default:
									return getNameDay(previewBoxStartDate);
							}
						})(day);
						return <DayPreviewBox
							key={previewBoxStartDate.toISOString()}
							active={previewBoxStartDate.toISOString() === this.state.activeKey}
							temperature={averageRecords.air_temperature_at_2m_above_ground_level}
							wave={averageRecords.sea_surface_wave_significant_height}
							windSpeed={averageRecords.wind_speed_at_10m_above_ground_level}
							dayName={dateName}
							onClick={() => this.activateDayPreviewBox(averageRecords.weatherData, previewBoxStartDate.toISOString())}
						/>;
					})
				}
			</StyledBoxWrapper>
		)
	}

	private activateDayPreviewBox = (weatherData: IWeatherData[], activeKey: string) => {
		this.setState({
			activeKey,
		});
		this.props.seeDetail(weatherData);
	}
}