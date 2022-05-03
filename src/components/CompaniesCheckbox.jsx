import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import React, { Component } from 'react';
import { listAllCompanies } from '../services/company';
import removeDuplicatedValues from '../utils/removeDuplicatedValues';

export default class CompaniesCheckbox extends Component {
  constructor(props) {
    super(props);
    this.getCompanies = this.getCompanies.bind(this);

    this.state = {
      companies: [{}],
    };
  }
  componentDidMount() {
    this.getCompanies();
  }

  async getCompanies() {
    const companies = await listAllCompanies({ showAlert: false });
    const { selectedCompanies } = this.props;
    const checkedCompanies = removeDuplicatedValues(companies).map(
      (company) => {
        const isChecked = selectedCompanies.find(
          (selected) => company.id === selected.idEmpresa,
        );
        return {
          ...company,
          isChecked: isChecked ? true : false,
        };
      },
    );
    this.setState({
      companies: checkedCompanies,
    });
  }
  handleChange(index) {
    const copiedArray = [...this.state.companies];
    copiedArray[index] = {
      ...copiedArray[index],
      isChecked: !copiedArray[index].isChecked,
    };
    this.setState({ companies: copiedArray }, () => {
      this.props.handleSelectedCompanies(this.state.companies);
    });
  }
  render() {
    const { companies } = this.state;
    return (
      <FormControl
        sx={{ m: 3 }}
        component="fieldset"
        variant="standard"
        required
      >
        <FormLabel component="legend">Empresas</FormLabel>
        <FormGroup row>
          {companies.map((company, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={company.isChecked || false}
                    onChange={() => this.handleChange(index)}
                    name={company.nome}
                  />
                }
                label={company.nome}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    );
  }
}
