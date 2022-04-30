import { Grid } from '@mui/material';
import React, { Component } from 'react';
import Content from '../components/Content';

export default class Home extends Component {
  render() {
    return (
      <Grid
        container
        spacing={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Grid item xs={8}>
          <Content title="Contato seguro">
            <h1>Home</h1>
          </Content>
        </Grid>
      </Grid>
    );
  }
}
