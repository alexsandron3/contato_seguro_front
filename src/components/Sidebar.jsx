import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuOptions from '../partials/MenuOptions';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);

    this.state = {
      open: true,
    };
  }

  toggleDrawer(event) {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <>
          <Drawer open={this.state.open} onClose={this.toggleDrawer}>
            <Box
              sx={{
                width: 200,
              }}
              role="presentation"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
            >
              <List sx={{ marginTop: 2 }}>
                <MenuOptions />
              </List>
            </Box>
            <Divider />
          </Drawer>
        </>
      </div>
    );
  }
}
