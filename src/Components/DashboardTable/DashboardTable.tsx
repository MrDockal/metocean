import * as React from 'react';

export interface IData {
	rowName: string;
	columns: (string | number | undefined)[];
}

interface IProps {
	headerIcon: any;
	data: IData[];
}

export class DashboardTable extends React.PureComponent<IProps> {

	public render() {
		return (
			<table style={{ textAlign: 'left', width: '100%', tableLayout: 'fixed' }}>
				{
					this.props.data.map((data: IData) => (
						<tr key={data.rowName}>
							<th>{data.rowName}</th>
							{data.columns.map((column: string, index: number) => <td key={index}>{column}</td>)}
						</tr>
					))
				}
			</table>
		);
	}
}
