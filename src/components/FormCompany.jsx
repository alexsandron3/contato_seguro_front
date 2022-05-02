import { TextField, DialogContent, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FormCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillUnmount() {
    this.props.clearFormData();
  }
  render() {
    const {
      formValues: { nome = '', cnpj = '', endereco = '' },
    } = this.props;
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
            value={nome}
            onChange={this.props.handleChange}
            required
          />
          <TextField
            margin="dense"
            name="cnpj"
            label="Cnpj"
            fullWidth
            variant="standard"
            value={cnpj}
            onChange={this.props.handleChange}
            required
          />
          <TextField
            margin="dense"
            name="endereco"
            label="Endereço"
            fullWidth
            variant="standard"
            value={endereco}
            onChange={this.props.handleChange}
            required
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
