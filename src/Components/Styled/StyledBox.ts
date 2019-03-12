import styled from "styled-components";
import { IThemeProps } from 'src/Model/theme';

export const StyledBox = styled.div`
	display: flex;
	width: 12rem;
	height: 15rem;
	margin: 0 10px;
	flex-direction: column;
	justify-content: space-around;
	border-radius: ${(props: IThemeProps) => props.theme.borderRadius};
	box-shadow: 6px 6px 36px -4px rgba(0,0,0,0.55);
	background-color: white;
	text-align: center;

	&.active {
		box-shadow: ${(props: IThemeProps) => props.theme.boxShadow};
	}
`;
