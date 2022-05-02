import React, { Component } from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Companies from '../pages/Companies';
import Users from '../pages/Users';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        {/*  */}
        {/*  */}
        <Route path="/" element={<Home />} />
        <Route path="/empresas" element={<Companies />} />
        <Route path="/usuarios" element={<Users />} />
      </Router>
    );
  }
}
