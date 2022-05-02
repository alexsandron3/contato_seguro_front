import { TextField, DialogContent, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FormUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { formValues } = this.props;

    return (
      <>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            label="Nome"
            fullWidth
            variant="standard"
            value={formValues.nome}
            onChange={this.props.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={formValues.email}
            onChange={this.props.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="telefone"
            label="Telefone"
            fullWidth
            variant="standard"
            value={formValues.telefone}
            onChange={this.props.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="dataNascimento"
            type="date"
            fullWidth
            variant="standard"
            value={formValues.dataNascimento}
            onChange={this.props.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="cidadeNascimento"
            label="Cidade de nascimento"
            fullWidth
            variant="standard"
            value={formValues.cidadeNascimento}
            onChange={this.props.handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={this.props.action}>Enviar</Button>
          <Button onClick={this.props.setDialogOpen}>Cancelar</Button>
        </DialogActions>
      </>
    );
  }
}
