import { Chip, Grid } from '@mui/material';
import React, { Component } from 'react';
import Content from '../components/Content';
import FormDialog from '../components/FormDialog';
import Table from '../components/Table';
import api from '../services/api';
import { editUser, newUser } from '../services/user';
import validateUserData from '../utils/validateUserData';
import FormUser from '../components/FormUser';
import FormContext from '../context/FormProvider';

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
              label={empresa.nomeEmpresa}
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
      const {
        data: { dados },
      } = await api.get('/usuario/');

      // Verifico se o index do array encontrado é igual ao index atual
      const usersWithCompanies = dados.filter(
        (item, index, array) =>
          index === array.findIndex((t) => t.id === item.id),
      );
      const users = dados.reduce((acc, curr, index, array) => {
        const { id, email, telefone, dataNascimento, nome, cidadeNascimento } =
          curr;
        if (acc[id] !== undefined) {
          acc[id] = {
            usuario: {
              id,
              email,
              telefone,
              dataNascimento,
              nome,
              cidadeNascimento,
            },
            empresas: [
              ...acc[id].empresas,
              {
                nomeEmpresa: curr.nomeempresas,
                idEmpresa: curr.idEmpresa,
              },
            ],
          };
        } else {
          acc[id] = {
            usuario: {
              id,
              email,
              telefone,
              dataNascimento,
              nome,
              cidadeNascimento,
            },
            empresas: [
              {
                nomeEmpresa: curr.nomeempresas,
                idEmpresa: curr.idEmpresa,
              },
            ],
          };
        }
        return acc;
      }, {});
      let tableData = [];
      usersWithCompanies.forEach((item1) => {
        Object.values(users).forEach((item2) => {
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
          <Content title="Usuários">
            <Table
              columns={this.companyColumns}
              data={this.state.usuarios}
              title="Lista de usuarios"
              openForm={setDialogOpen}
              editRow={this.editRegistry}
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
      </Grid>
    );
  }
}

Users.contextType = FormContext;
