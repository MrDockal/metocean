import * as React from 'react';

interface IProps {
	unit: 'C' | 'K';
	children: string | number;
}

export const Temp = (props: IProps) => {
	const temp = Math.round(parseInt(props.children as string, 10));
	return (
		<span>{temp}&deg;{props.unit}</span>
	);
}
