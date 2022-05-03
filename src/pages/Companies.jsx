import { Grid } from '@mui/material';
import React, { Component } from 'react';
import Content from '../components/Content';
import Table from '../components/Table';
import api from '../services/api';
import validateCompanyData from '../utils/validateCompanyData';
import FormContext from '../context/FormProvider';
import FormDialog from '../components/FormDialog';
import FormCompany from '../components/FormCompany';
import { editCompany, newCompany, deleteCompany } from '../services/company';
import ConfirmationDialog from '../components/ConfirmationDialog';

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
  async deleteRegistry() {
    const { selectedValues, clearFormData, setState } = this.context;
    const isUserDeleted = await deleteCompany({
      id: selectedValues.id,
      showAlert: true,
    });
    if (isUserDeleted) {
      setState({
        openDeleteDialog: false,
      });
      await this.listAllCompanies();
      clearFormData();
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
      openDeleteDialog,
      setOpenConfirmationDialog,
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
              setOpenConfirmationDialog={setOpenConfirmationDialog}
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
        <ConfirmationDialog
          title="Você deseja deletar este registro?"
          text="Ao confirmar, esta operação não poderá ser desfeita"
          open={openDeleteDialog}
          setOpen={setOpenConfirmationDialog}
          action={this[action]}
        />
      </Grid>
    );
  }
}
Companies.contextType = FormContext;
