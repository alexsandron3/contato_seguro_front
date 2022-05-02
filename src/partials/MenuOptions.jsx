import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupIcon from '@mui/icons-material/Group';
import HomeOutlined from '@mui/icons-material/HomeOutlined';

export default class MenuOptions extends Component {
  render() {
    return (
      <>
        <Link to="/">
          <ListItem button>
            <ListItemIcon sx={{ p: 1, ml: 3 }}>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary={'Início'} />
          </ListItem>
        </Link>
        <Divider />

        <Link to="/empresas">
          <ListItem button>
            <ListItemIcon sx={{ p: 1, ml: 3 }}>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary="Empresas" sx={{ marginLeft: 1 }} />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/usuarios">
          <ListItem button>
            <ListItemIcon sx={{ p: 1, ml: 3 }}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItem>
        </Link>
      </>
    );
  }
}
