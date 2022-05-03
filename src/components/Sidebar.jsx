import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuOptions from '../partials/MenuOptions';

export default class Sidebar extends Component {
  render() {
    const { open, toggleDrawer } = this.props;
    return (
      <div>
        <>
          <Drawer open={open} onClose={() => toggleDrawer(false)}>
            <Box
              sx={{
                width: 200,
              }}
              role="presentation"
              onClick={() => toggleDrawer(false)}
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
