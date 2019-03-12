import styled from "styled-components";
import { IThemeProps } from 'src/Model/theme';

export const StyledSection = styled.div`
	border-radius: ${(props: IThemeProps) => props.theme.borderRadius};
	padding: 20px;
	background: white;
	box-shadow: ${(props: IThemeProps) => props.theme.boxShadow};
`;
