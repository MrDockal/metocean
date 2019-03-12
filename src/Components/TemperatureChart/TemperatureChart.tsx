import * as React from 'react';
import * as Chart from 'chart.js';
import { StyledSection } from '../Styled/StyledSectionContainer';

interface IProps {
	data: number[];
	labels: string[];
}

interface IState {
	chart?: Chart;
}

export class TemperatureChart extends React.PureComponent<IProps, IState> {
	public state: IState = {};
	private canvasRef = React.createRef<HTMLCanvasElement>();

	public componentDidMount() {
		this.renderData();
	}

	public componentDidUpdate(prevProps: IProps) {
		if (prevProps !== this.props) {
			this.state.chart && this.state.chart.destroy();
			this.renderData();
		}
	}

	public render() {
		return (
			<StyledSection style={{ height: 300 }}>
				<canvas ref={this.canvasRef} />
			</StyledSection>
		)
	}

	private renderData() {
		if (!this.canvasRef.current) {
			throw new Error('Canvas is not defined');
		}
		const context2d = this.canvasRef.current.getContext('2d');
		if (!context2d) {
			throw new Error('Invalid canvas context');
		}
		Chart.defaults.global.defaultFontFamily = 'Roboto';
		Chart.defaults.global.defaultFontSize = 16;
		const chart = new Chart(
			context2d,
			{
				type: 'line',
				data: {
					datasets: [{
						data: this.props.data,
					}],
					labels: this.props.labels,
				},
				options: {
					maintainAspectRatio: false,
					legend: {
						display: false,
					},
					spanGaps: true,
					scales: {
						xAxes: [{
							gridLines: {
								offsetGridLines: true
							},
							ticks: {
								padding: 20,
							}
						}],
						yAxes: [{
							ticks: {
								padding: 40,
								maxTicksLimit: 5,
								callback: (value: number) => {
									return value.toFixed(1) + '°C';
								}
							},
						}]
					},
					layout: {
						padding: {
						}
					},
				},
			}
		);
		this.setState({
			chart,
		});
	}
}
