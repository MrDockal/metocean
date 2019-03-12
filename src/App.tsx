import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './Model/theme';
import { Dashboard } from './Containers/Dashboard/Dasboard';
import { createGlobalStyle } from 'styled-components'

const csvData = require('./assets/data.csv');
const jsonData = require('./assets/data.json');


const GlobalStyle = createGlobalStyle<{fontFamily: string, backgroundColor: string}>`
  html, body {
	font-family: ${(props: {fontFamily: string}) => props.fontFamily};
	background-color: ${(props: {backgroundColor: string}) => props.backgroundColor};
  }
`

class App extends React.Component {
	public render() {
		return (
			<ThemeProvider theme={theme}>
				<React.Fragment>
					<GlobalStyle fontFamily={theme.fontFamily} backgroundColor={theme.backgroundColor}/>
					<Dashboard csvData={csvData} jsonData={jsonData}/>
				</React.Fragment>
			</ThemeProvider>
		);
	}
}

export default App;
