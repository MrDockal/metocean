export const theme = {
	fontFamily: 'Roboto',
	backgroundColor: '#efeeed',
	containerWidth: '1200px',
	borderRadius: '12px',
	boxShadow: '6px 6px 36px -17px rgba(0,0,0,0.55)'
}

export type Theme = typeof theme;
export interface IThemeProps {
	theme: Theme;
}
