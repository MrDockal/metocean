import * as React from 'react';
import * as Chart from 'chart.js';

interface IProps {
	data: number[];
	labels: string[];
}

export class TemperatureChart extends React.PureComponent<IProps> {
	private canvasRef = React.createRef<HTMLCanvasElement>();

	public componentDidMount() {
		this.renderData();
	}

	public componentDidUpdate() {
		this.renderData();
	}

	public render() {
		return (
			<div style={{ height: 300 }}>
				<canvas ref={this.canvasRef} />
			</div>
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
		new Chart(
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
	}
}
