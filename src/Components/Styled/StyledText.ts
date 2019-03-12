import styled from "styled-components";
import { IThemeProps } from 'src/Model/theme';

interface IOwnProps {
	fontSize: number;
}

type IProps = IThemeProps & IOwnProps;

export const StyledText = styled.div<IProps>`
	font-size: ${(props: IProps) => props.fontSize}rem;
`;
