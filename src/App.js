import React, { Component } from 'react';
import './App.css';
import Routes from './routes/Routes';
import { ToastContainer } from 'react-toastify';

export default class App extends Component {
  render() {
    return (
      <>
        <Routes />
        <ToastContainer />
      </>
    );
  }
}
