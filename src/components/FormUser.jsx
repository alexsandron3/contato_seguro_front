import { TextField, DialogContent, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CompaniesCheckbox from './CompaniesCheckbox';

export default class FormUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillUnmount() {
    this.props.clearFormData();
  }
  render() {
    const {
      formValues: {
        nome = '',
        email = '',
        telefone = '',
        dataNascimento = '',
        cidadeNascimento = '',
        empresas = [],
      },
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
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={this.props.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="telefone"
            label="Telefone"
            fullWidth
            variant="standard"
            value={telefone}
            onChange={this.props.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="dataNascimento"
            type="date"
            fullWidth
            variant="standard"
            value={dataNascimento}
            onChange={this.props.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="cidadeNascimento"
            label="Cidade de nascimento"
            fullWidth
            variant="standard"
            value={cidadeNascimento}
            onChange={this.props.handleChange}
          />
          <CompaniesCheckbox
            selectedCompanies={empresas}
            handleSelectedCompanies={this.props.handleSelectedCompanies}
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
