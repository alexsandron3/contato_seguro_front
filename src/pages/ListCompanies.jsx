import { Grid } from '@mui/material';
import React, { Component } from 'react';
import Content from '../components/Content';
import Table from '../components/Table';
import api from '../services/api';

export const companyColumns = [
  {
    title: 'id',
    field: 'id',
  },
  {
    title: 'Nome',
    field: 'nome',
  },
  {
    title: 'Cnpj',
    field: 'cnpj',
  },
  {
    title: 'Endereco',
    field: 'endereco',
  },
];

export default class ListCompanies extends Component {
  constructor(props) {
    super(props);
    this.listAllCompanies = this.listAllCompanies.bind(this);
    this.state = {
      empresas: [
        {
          id: 0,
          cnpj: 0,
          endereco: '',
          nome: '',
        },
      ],
    };
  }
  async listAllCompanies() {
    const {
      data: { dados },
    } = await api.get('/empresa/');
    this.setState({ empresas: dados });
  }
  componentDidMount() {
    this.listAllCompanies();
  }
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
          <Content title="Empresas">
            <Table
              columns={companyColumns}
              data={this.state.empresas}
              title="Lista de empresas"
            />
          </Content>
        </Grid>
      </Grid>
    );
  }
}
