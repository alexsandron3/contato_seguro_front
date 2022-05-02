import PropTypes from 'prop-types';
import MaterialTable from '@material-table/core';
import React, { Component } from 'react';
import localization from '../utils/materialTableLocalization';
import { Paper } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { columns, data, title, openForm, deleteRow } = this.props;
    return (
      <MaterialTable
        components={{
          Container: (props) => (
            <Paper {...props} elevation={0} style={{ padding: 10 }} />
          ),
        }}
        columns={columns}
        data={data}
        title={title}
        localization={localization}
        options={{
          addRowPosition: 'first',
          actionsColumnIndex: -1,
          filtering: true,
        }}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: 'Novo usuário',
            onClick: (props, rowData) => this.props.openForm(rowData),
          },
        ]}
      />
    );
  }
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
