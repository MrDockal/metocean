import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './Model/theme';
import { Forecast } from './Components/Forecast/Forecast';

class App extends React.Component {
	public render() {
		return (
			<ThemeProvider theme={theme}>
				<Forecast/>
			</ThemeProvider>
		);
	}
}

export default App;
