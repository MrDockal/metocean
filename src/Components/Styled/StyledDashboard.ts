import styled from "styled-components";
import { IThemeProps } from 'src/Model/theme';

export const StyledDashboard = styled.div`
	width: ${(props: IThemeProps) => props.theme.containerWidth};
	margin: auto;
`;
