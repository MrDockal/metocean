import * as React from 'react';
import { StyledBox } from '../Styled/StyledBox';
import { StyledText } from '../Styled/StyledText';
import { getNameDay } from 'src/Model/Date/getNameDay';
import { Temp } from '../Temp/Temp';

interface IProps {
	day: Date;
	temperature: number;
	windSpeed: number;
	wave: number;
	onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

export class DayPreviewBox extends React.PureComponent<IProps> {
	public render() {
		return (
			<StyledBox onClick={this.props.onClick}>
				<StyledText fontSize={2}>{getNameDay(this.props.day)}</StyledText>
				<StyledText fontSize={1}>
					<Temp unit={'C'}>
						{this.props.temperature}
					</Temp>
				</StyledText>
				<StyledText fontSize={1}>{this.props.windSpeed}</StyledText>
				<StyledText fontSize={1}>{this.props.wave}</StyledText>
			</StyledBox>
		);
	}
}
