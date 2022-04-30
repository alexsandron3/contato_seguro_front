import React, { Component } from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import Home from '../pages/Home';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        {/*  */}
        {/*  */}
        <Route path="/" element={<Home />} />
      </Router>
    );
  }
}
