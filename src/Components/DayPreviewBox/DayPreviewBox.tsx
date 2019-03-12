import * as React from 'react';
import { StyledBox } from '../Styled/StyledBox';
import { StyledText } from '../Styled/StyledText';
import { Temp } from '../Temp/Temp';
import { StyledFles } from '../Styled/StyledFlex';

interface IProps {
	dayName: string;
	temperature: number;
	windSpeed: number;
	wave: number;
	active: boolean;
	onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

export class DayPreviewBox extends React.PureComponent<IProps> {
	public render() {
		return (
			<StyledBox onClick={this.props.onClick} className={this.props.active ? 'active' : ''}>
				<StyledText fontSize={2}>{this.props.dayName}</StyledText>
				<StyledText fontSize={2.2}>
					<Temp unit={'C'}>
						{this.props.temperature}
					</Temp>
				</StyledText>
				<StyledFles>
					<StyledText fontSize={1}>Wind: {this.props.windSpeed}</StyledText>
					<StyledText fontSize={1}>Waves: {this.props.wave}</StyledText>
				</StyledFles>
			</StyledBox>
		);
	}
}
