export const theme = {
	fontFamily: 'Roboto',
}

export type Theme = typeof theme;
export interface IThemeProps {
	theme: Theme;
}
