import PropTypes from 'prop-types';
import MaterialTable from '@material-table/core';
import React, { Component } from 'react';
import localization from '../utils/materialTableLocalization';
export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { columns, data, title, setTableData } = this.props;

    return (
      <MaterialTable
        columns={columns}
        data={data}
        title={title}
        localization={localization}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setTableData(newRow, resolve, reject);
            }),
        }}
        options={{
          addRowPosition: 'first',
          actionsColumnIndex: -1,
        }}
      />
    );
  }
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
