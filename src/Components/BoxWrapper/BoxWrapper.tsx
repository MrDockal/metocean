import * as React from 'react';
import { IWeatherData } from 'src/Model/WeatherInterfaces/IWeatherData';
import { StyledBoxWrapper } from '../Styled/StyledBoxWrapper';
import { DayPreviewBox } from '../DayPreviewBox/DayPreviewBox';
import * as dateFns from 'date-fns';
import { calculateAverageRecords } from 'src/Model/Weather/calculateAverageRecords';

interface IProps {
	startDay: Date;
	predictions: number;
	weatherData: IWeatherData[];
	seeDetail(weatherData: IWeatherData[]): void;
}

export class BoxWrapper extends React.PureComponent<IProps> {

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
						console.log(previewBoxStartDate, previewBoxEndDate);
						const averageRecords = calculateAverageRecords(previewBoxStartDate, previewBoxEndDate, this.props.weatherData);
						return <DayPreviewBox
							key={previewBoxStartDate.toISOString()}
							temperature={averageRecords.air_temperature_at_2m_above_ground_level}
							wave={averageRecords.sea_surface_wave_significant_height}
							windSpeed={averageRecords.wind_speed_at_10m_above_ground_level}
							day={previewBoxStartDate}
							onClick={() => this.props.seeDetail(averageRecords.weatherData)}
						/>;
					})
				}
			</StyledBoxWrapper>
		)
	}
}