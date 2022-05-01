import React, { Component } from 'react';
import './App.css';
import Routes from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from './theme/theme';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Routes />
        <ToastContainer />
      </ThemeProvider>
    );
  }
}
