import * as React from 'react';
import { StyledTable } from '../Styled/StyledTable';

export interface IData {
	rowName: string;
	columns: (string | number | undefined | React.ReactChild)[];
}

interface IProps {
	headerIcon: any;
	data: IData[];
}

export class DashboardTable extends React.PureComponent<IProps> {

	public render() {
		return (
			<StyledTable>
				<tbody>
					{
						this.props.data.map((data: IData) => (
							<tr key={data.rowName}>
								<th>{data.rowName}</th>
								{data.columns.map((column: string, index: number) => <td key={index} className={typeof column === 'object' ? 'bigger' : ''}>{column}</td>)}
							</tr>
						))
					}
				</tbody>
			</StyledTable>
		);
	}
}
