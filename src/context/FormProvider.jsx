import React, { Component, createContext } from 'react';

const FormContext = createContext();

export class FormProvider extends Component {
  constructor(props) {
    super(props);
    this.setDialogOpen = this.setDialogOpen.bind(this);
    this.setOpenConfirmationDialog = this.setOpenConfirmationDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearFormData = this.clearFormData.bind(this);
    this.handleSelectedCompanies = this.handleSelectedCompanies.bind(this);
    this.setFormState = this.setFormState.bind(this);
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
      empresas: [
        {
          id: 0,
          nome: '',
          cnpj: '',
          endereco: '',
        },
      ],
      selectedValues: {},
      openDialog: false,
      openDeleteDialog: false,
      action: 'newRegistry',
    };
  }
  setDialogOpen(action, rowData) {
    if (action === 'newRegistry') {
      this.setState({
        ...this.state,
        selectedValues: rowData,
        openDialog: !this.state.openDialog,
        action,
      });
    } else {
      this.setState({
        ...this.state,
        openDialog: !this.state.openDialog,
        action,
      });
    }
  }
  setOpenConfirmationDialog(selectedValues) {
    this.setState({
      ...this.state,
      openDeleteDialog: !this.state.openDeleteDialog,
      action: 'deleteRegistry',
      selectedValues,
    });
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
    console.log('clearFormData');
    this.setState({
      ...this.state,
      selectedValues: {},
    });
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
  setFormState(newState) {
    this.setState({ ...this.state, ...newState });
  }
  render() {
    return (
      <FormContext.Provider
        value={{
          ...this.state,
          setDialogOpen: this.setDialogOpen,
          handleChange: this.handleChange,
          clearFormData: this.clearFormData,
          handleSelectedCompanies: this.handleSelectedCompanies,
          setState: this.setFormState,
          setOpenConfirmationDialog: this.setOpenConfirmationDialog,
        }}
      >
        {this.props.children}
      </FormContext.Provider>
    );
  }
}

export default FormContext;
