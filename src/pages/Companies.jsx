import { Grid } from '@mui/material';
import React, { Component } from 'react';
import Content from '../components/Content';
import Table from '../components/Table';
import api from '../services/api';
import sendAlert from '../utils/sendAlert';
import validateCompanyData from '../utils/validateCompanyData';

export const companyColumns = [
  {
    title: 'id',
    field: 'id',
    hidden: true,
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

export default class Companies extends Component {
  constructor(props) {
    super(props);
    this.listAllCompanies = this.listAllCompanies.bind(this);
    this.newCompany = this.newCompany.bind(this);
    this.editCompany = this.editCompany.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);
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
  componentDidMount() {
    this.listAllCompanies();
  }
  async listAllCompanies() {
    try {
      const {
        data: { dados },
      } = await api.get('/empresa/');
      this.setState({ empresas: dados });
    } catch (error) {
      console.log(error);
    }
  }
  async newCompany(newRow, resolve, reject) {
    const isNewRowValid = validateCompanyData(newRow);
    if (isNewRowValid) {
      try {
        const {
          data: { mensagem, dados },
        } = await api.post('/empresa/', {
          ...newRow,
        });
        this.setState({ empresas: [...this.state.empresas, dados] }, () => {
          sendAlert(1, mensagem);
          resolve();
        });
      } catch (error) {
        sendAlert(0, error.response.data.mensagem);
        resolve();
      }
    }
  }
  async editCompany(newRow, resolve, reject) {
    const isNewRowValid = validateCompanyData(newRow);
    if (isNewRowValid) {
      try {
        const {
          data: { mensagem },
        } = await api.put(`/empresa/id.php/${newRow.id}`, {
          ...newRow,
        });
        sendAlert(1, mensagem);
        resolve();
      } catch (error) {
        sendAlert(0, error.response.data.mensagem);
        resolve();
      }
    }
  }
  async deleteCompany(deletedRow, resolve, reject) {
    try {
      const {
        data: { mensagem },
      } = await api.delete(`/empresa/id.php/${deletedRow.id}`);
      this.setState({
        empresas: this.state.empresas.filter(
          (empresa) => empresa.id !== deletedRow.id,
        ),
      });
      sendAlert(1, mensagem);
      resolve();
    } catch (error) {
      sendAlert(0, error.response.data.mensagem);
      resolve();
    }
  }
  render() {
    return (
      <Grid
        container
        spacing={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid item xs={8}>
          <Content title="Empresas">
            <Table
              columns={companyColumns}
              data={this.state.empresas}
              title="Lista de empresas"
              addRow={this.newCompany}
              editRow={this.editCompany}
              deleteRow={this.deleteCompany}
            />
          </Content>
        </Grid>
      </Grid>
    );
  }
}
