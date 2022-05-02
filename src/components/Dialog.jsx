import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormUser from './FormUser';
export default class FormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.setDialogOpen}
          formValues={this.props.formValues}
        >
          <DialogTitle>Inserir</DialogTitle>
          <FormUser
            formValues={this.props.formValues}
            newUser={this.props.newUser}
            handleChange={this.props.handleChange}
          />
        </Dialog>
      </div>
    );
  }
}
