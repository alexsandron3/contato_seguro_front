import React, { Component } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default class ConfirmationDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { title, text, open = false, setOpen, action } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={setOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={action}>Confirmar</Button>
            <Button onClick={setOpen} autoFocus>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
