import PropTypes from 'prop-types';
import { Box, Paper, Typography } from '@mui/material';
import React, { Component } from 'react';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { title, children } = this.props;
    return (
      <Box p={3}>
        <Paper elevation={1} component="div" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h3">
            {title}
          </Typography>
          {children}
        </Paper>
      </Box>
    );
  }
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Content.defaultProps = {
  title: '',
};
