import React, { Component } from 'react';
import './App.css';
import Routes from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from './theme/theme';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.state = {
      open: false,
    };
  }

  toggleDrawer(open) {
    this.setState({ open });
  }
  render() {
    const { open } = this.state;
    return (
      <ThemeProvider theme={defaultTheme}>
        <Topbar open={open} toggleDrawer={this.toggleDrawer} />
        <Sidebar open={open} toggleDrawer={this.toggleDrawer} />
        <CssBaseline />
        <Routes />
        <ToastContainer />
      </ThemeProvider>
    );
  }
}
