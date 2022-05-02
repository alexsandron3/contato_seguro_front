import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
export default class FormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { Form } = this.props;
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.setDialogOpen}>
          <DialogTitle>Inserir</DialogTitle>
          <Form
            formValues={this.props.formValues || []}
            handleChange={this.props.handleChange}
            action={this.props.action}
            clearFormData={this.props.clearFormData}
            handleSelectedCompanies={this.props.handleSelectedCompanies}
          />
        </Dialog>
      </div>
    );
  }
}
