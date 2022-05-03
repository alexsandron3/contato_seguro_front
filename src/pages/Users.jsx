import { Chip, Grid } from '@mui/material';
import React, { Component } from 'react';
import Content from '../components/Content';
import FormDialog from '../components/FormDialog';
import Table from '../components/Table';
import api from '../services/api';
import { editUser, newUser, deleteUser } from '../services/user';
import validateUserData from '../utils/validateUserData';
import FormUser from '../components/FormUser';
import FormContext from '../context/FormProvider';
import ConfirmationDialog from '../components/ConfirmationDialog';

export default class Users extends Component {
  companyColumns = [
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
      title: 'Email',
      field: 'email',
    },
    {
      title: 'telefone',
      field: 'telefone',
    },
    {
      title: 'Nascimento',
      field: 'dataNascimento',
    },
    {
      title: 'Cidade',
      field: 'cidadeNascimento',
    },
    {
      title: 'Empresas',
      field: 'empresas',
      render: ({ empresas }) => {
        return empresas.map((empresa, index) => (
          <div key={index}>
            <Chip
              label={empresa.nomeempresas}
              variant="outlined"
              color="primary"
            />
          </div>
        ));
      },
    },
  ];
  constructor(props) {
    super(props);
    this.listAllUsers = this.listAllUsers.bind(this);
    this.newRegistry = this.newRegistry.bind(this);
    this.editRegistry = this.editRegistry.bind(this);
    this.deleteRegistry = this.deleteRegistry.bind(this);
    this.state = {
      usuarios: [
        {
          id: 0,
          email: '',
          telefone: '',
          dataNascimento: '',
          cidadeNascimento: '',
          empresas: [],
        },
      ],
    };
  }
  componentDidMount() {
    this.listAllUsers();
  }
  async listAllUsers() {
    try {
      const { data } = await api.get('/usuario/');
      const { dados, adicionais } = data;

      const usersWithCompanies = dados.reduce((acc, curr, index) => {
        const { id, email, telefone, dataNascimento, nome, cidadeNascimento } =
          curr;
        if (acc[id] === undefined) {
          acc[id] = {
            usuario: {
              id,
              email,
              telefone,
              dataNascimento,
              nome,
              cidadeNascimento,
            },
            empresas: adicionais.filter(
              (adicional) => adicional.id === curr.id,
            ),
          };
        }
        return acc;
      }, {});
      let tableData = [];
      dados.forEach((item1) => {
        Object.values(usersWithCompanies).forEach((item2) => {
          const { empresas } = item2;
          const {
            id,
            email,
            telefone,
            dataNascimento,
            nome,
            cidadeNascimento,
          } = item1;
          if (item1.id === item2.usuario.id) {
            tableData.push({
              id,
              email,
              telefone,
              dataNascimento,
              nome,
              cidadeNascimento,
              empresas,
            });
          }
        });
      });
      this.setState({ usuarios: tableData });
    } catch (error) {
      console.log(error);
    }
  }

  async newRegistry() {
    const { clearFormData, setState, selectedValues } = this.context;
    const { validatedUserData, dataIsValid } = validateUserData(selectedValues);
    if (dataIsValid) {
      const isUserCreated = await newUser({
        user: validatedUserData,
        showAlert: true,
      });
      if (isUserCreated) {
        setState({
          openDialog: false,
        });
        await this.listAllUsers();
        clearFormData();
      }
    }
  }

  async editRegistry() {
    const { selectedValues, clearFormData, setState } = this.context;
    const formData = { ...selectedValues };
    const { validatedUserData, dataIsValid } = validateUserData(formData);
    if (dataIsValid) {
      const isUserEdited = await editUser({
        user: validatedUserData,
        showAlert: true,
      });
      if (isUserEdited) {
        setState({
          openDialog: false,
        });
        await this.listAllUsers();
        clearFormData();
      }
    }
  }

  async deleteRegistry() {
    const { selectedValues, clearFormData, setState } = this.context;
    const isUserDeleted = await deleteUser({
      id: selectedValues.id,
      showAlert: true,
    });
    if (isUserDeleted) {
      setState({
        openDeleteDialog: false,
      });
      await this.listAllUsers();
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
          <Content title="Usuários">
            <Table
              columns={this.companyColumns}
              data={this.state.usuarios}
              title="Lista de usuarios"
              openForm={setDialogOpen}
              editRow={this.editRegistry}
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
          Form={FormUser}
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

Users.contextType = FormContext;
