import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { SnackbarProvider } from 'notistack';
import { DialogProvider } from './components/dialog-provider';
import ContactList from './components/contact-list';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
				<SnackbarProvider maxSnack={3}>
					<DialogProvider>
						<ContactList/>
					</DialogProvider>
				</SnackbarProvider>
			</Box>
		</ThemeProvider>
	);
}

export default App;
