import { Chip, Grid } from '@mui/material';
import React, { Component } from 'react';
import Content from '../components/Content';
import FormDialog from '../components/FormDialog';
import Table from '../components/Table';
import api from '../services/api';
import { editUser, newUser } from '../services/user';
import validateUserData from '../utils/validateUserData';

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
    this.setDialogOpen = this.setDialogOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.newUser = this.newUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.clearFormData = this.clearFormData.bind(this);
    this.handleSelectedCompanies = this.handleSelectedCompanies.bind(this);
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
      selectedValues: {},
      openDialog: false,
      action: this.newUser,
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

  async newUser() {
    const { selectedValues } = this.state;
    const { validatedUserData, dataIsValid } = validateUserData(selectedValues);
    if (dataIsValid) {
      const isUserCreated = await newUser({
        user: validatedUserData,
        showAlert: true,
      });
      if (isUserCreated) {
        this.setState({
          ...this.state,
          openDialog: false,
        });
        this.listAllUsers();
        this.clearFormData();
      }
    }
  }

  async editUser() {
    const formData = { ...this.state.selectedValues };
    const { validatedUserData, dataIsValid } = validateUserData(formData);
    if (dataIsValid) {
      const isUserEdited = await editUser({
        user: validatedUserData,
        showAlert: true,
      });
      if (isUserEdited) {
        this.setState({
          ...this.state,
          openDialog: false,
        });

        this.listAllUsers();
        this.clearFormData();
      }
    }
  }
  handleChange(event) {
    const { target } = event;
    this.setState({
      ...this.state,
      selectedValues: {
        ...this.state.selectedValues,
        [target.name]: target.value,
      },
    });
  }
  clearFormData() {
    this.setState({
      ...this.state,
      selectedValues: {
        email: '',
        telefone: '',
        dataNascimento: '',
        nome: '',
        cidadeNascimento: '',
        empresas: [],
      },
    });
  }
  setDialogOpen(isActionToNewUser, rowData) {
    if (!isActionToNewUser) {
      this.setState({
        ...this.state,
        selectedValues: rowData,
        openDialog: !this.state.openDialog,
        action: this.editUser,
      });
    } else {
      this.setState({
        ...this.state,
        openDialog: !this.state.openDialog,
        action: this.newUser,
      });
    }
  }
  handleSelectedCompanies(companies) {
    const selectedCompanies = companies.filter((company) => company.isChecked);
    this.setState({
      ...this.state,
      selectedValues: {
        ...this.state.selectedValues,
        empresas: selectedCompanies,
      },
    });
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
          <Content title="usuarios">
            <Table
              columns={this.companyColumns}
              data={this.state.usuarios}
              title="Lista de usuarios"
              openForm={this.setDialogOpen}
              editRow={this.editUser}
              deleteRow={this.deleteUser}
            />
          </Content>
        </Grid>
        <FormDialog
          open={this.state.openDialog}
          setDialogOpen={this.setDialogOpen}
          formValues={this.state.selectedValues}
          handleChange={this.handleChange}
          action={this.state.action}
          clearFormData={this.clearFormData}
          handleSelectedCompanies={this.handleSelectedCompanies}
        />
      </Grid>
    );
  }
}
