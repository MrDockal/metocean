import styled from "styled-components";
import { IThemeProps } from 'src/Model/theme';

export const StyledTable = styled.table`
	text-align: left;
	width: 100%;
	table-layout: fixed;
	border-collapse: collapse;
	border-radius: ${(props: IThemeProps) => props.theme.borderRadius};
	box-shadow: ${(props: IThemeProps) => props.theme.boxShadow};

	td, th {
		padding: 15px 10px;
		&.bigger {
			padding: 0 10px;
			font-size: 25px;
		}
	}

	th {
		width: 200px;
	}

	tr {
		&:first-child {
			td, th {
				&:first-child {
					border-top-left-radius: ${(props: IThemeProps) => props.theme.borderRadius};
				}
				&:last-child {
					border-top-right-radius: ${(props: IThemeProps) => props.theme.borderRadius};
				}
			}
		}
		&:last-child {
			td, th {
				&:first-child {
					border-bottom-left-radius: ${(props: IThemeProps) => props.theme.borderRadius};
				}
				&:last-child {
					border-bottom-right-radius: ${(props: IThemeProps) => props.theme.borderRadius};
				}
			}
		}
	}

	tr:nth-child(even) {
		background: #f9f9f9;
	}

	tr:nth-child(odd) {
		background: #ffffff;
	}
`;