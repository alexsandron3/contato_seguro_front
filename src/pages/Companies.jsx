import { Grid } from '@mui/material';
import React, { Component } from 'react';
import Content from '../components/Content';
import Table from '../components/Table';
import api from '../services/api';
import sendAlert from '../utils/sendAlert';
import validateCompanyData from '../utils/validateCompanyData';
import FormContext from '../context/FormProvider';
import FormDialog from '../components/FormDialog';
import FormCompany from '../components/FormCompany';
import { editCompany, newCompany } from '../services/company';

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
    this.newRegistry = this.newRegistry.bind(this);
    this.editRegistry = this.editRegistry.bind(this);
    this.deleteRegistry = this.deleteRegistry.bind(this);
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
      this.setState({ empresas: dados }, () => {
        console.log(this.state.empresas);
      });
    } catch (error) {
      console.log(error);
    }
  }
  async newRegistry() {
    const { clearFormData, setState, selectedValues } = this.context;
    const isDataValid = validateCompanyData(selectedValues);
    if (isDataValid) {
      const isCompanyCreated = await newCompany({
        company: selectedValues,
        showAlert: true,
      });
      if (isCompanyCreated) {
        setState({
          openDialog: false,
        });
        await this.listAllCompanies();
        clearFormData();
      }
    }
  }
  async editRegistry() {
    const { clearFormData, setState, selectedValues } = this.context;
    const isDataValid = validateCompanyData(selectedValues);
    if (isDataValid) {
      const isCompanyCreated = await editCompany({
        company: selectedValues,
        showAlert: true,
      });
      if (isCompanyCreated) {
        setState({
          openDialog: false,
        });
        await this.listAllCompanies();
        clearFormData();
      }
    }
  }
  async deleteRegistry(deletedRow, resolve, reject) {
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
    const {
      openDialog,
      setDialogOpen,
      handleChange,
      clearFormData,
      handleSelectedCompanies,
      selectedValues,
      action,
    } = this.context;
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
              openForm={setDialogOpen}
            />
          </Content>
        </Grid>
        <FormDialog
          open={openDialog}
          setDialogOpen={setDialogOpen}
          formValues={selectedValues}
          handleChange={handleChange}
          action={this[action]}
          clearFormData={clearFormData}
          handleSelectedCompanies={handleSelectedCompanies}
          Form={FormCompany}
        />
      </Grid>
    );
  }
}
Companies.contextType = FormContext;
