import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import styles from "./styles";
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import IconButton from '@material-ui/core/IconButton';
import ReactCountryFlag from "react-country-flag";

const DomainCellRenderer = params => {
  const domain = params.value.charAt(0).toUpperCase() + params.value.slice(1);
  return "<img style='vertical-align: middle' width='20px' src='https://api.faviconkit.com/" + params.value + "/20'/><span style='padding-left: 10px' >" + domain + "</span>";
};

const CountryCellRenderer = params => {
  if (params.value) {
    return <ReactCountryFlag countryCode={params.value}/>;
  } else {
    return '';
  }
};

const OptOutCellRenderer = params => {
  if (params.value) {
    return (
      <IconButton color='black' target='_blank' href={params.value}>
        <CancelScheduleSendIcon/>
      </IconButton>
    );
  } else {
    return null;
  }
};

class DataBrokersDB extends React.Component {
  constructor(props){
    super(props);

    this.state =  {
      defaultColDef: {
        flex: 1,
        sortable: true,
        minWidth: 100,
        resizable: true,
      },
    }
  }
  

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node).join(', ')
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
  }
  
  onExportButtonClick = e => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    var fileName = "data-brokers-" + today + ".csv";
    this.gridApi.exportDataAsCsv({fileName: fileName});
  }

  onQuickFilterChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById('quickFilter').value);
  };

  onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  onGridSizeChanged = (params) => {
    var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      var column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth && i != allColumns.length - 1) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  };

  render() {
    const { classes } = this.props;
    const { dataBrokers } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.inner}>
          <Paper className={classes.searchRoot} id="grid-wrapper" elevation={1}>
            <SearchIcon />
            <InputBase id="quickFilter" className={classes.searchInput} placeholder="Search..." onInput={() => this.onQuickFilterChanged()} />
          </Paper>
            <div
              className="ag-theme-material"
              style={{  
                height: '500px',
                width: '100%',
              }}
            >
              <AgGridReact
                onGridReady={ params => this.gridApi = params.api }
                rowData={dataBrokers}
                rowSelection="single"
                defaultColDef={{
                  flex: 1,
                  sortable: true,
                  resizable: true,
                }}
                onGridReady={this.onGridReady}
                frameworkComponents={{
                  optOutCellRenderer: OptOutCellRenderer,
                  countryCellRenderer: CountryCellRenderer,
                }}
                onFirstDataRendered={this.onFirstDataRendered}
                onGridSizeChanged={this.onGridSizeChanged}
              >
                <AgGridColumn field="Domain" headerName="Domain" minWidth={150} cellRenderer={DomainCellRenderer}></AgGridColumn>
                <AgGridColumn field="Company Geo Country Code" headerName="Country" cellRenderer="countryCellRenderer" minWidth={95} maxWidth={110} ></AgGridColumn>
                <AgGridColumn field="Company Name" headerName="Name" minWidth={100} ></AgGridColumn>
                <AgGridColumn field="Company Category Industry Group" headerName="Industry Group" minWidth={150} ></AgGridColumn>
                <AgGridColumn field="Company Category Industry" headerName="Industry" minWidth={150} ></AgGridColumn>
                <AgGridColumn field="YDR URL" headerName="Opt-out" cellRenderer="optOutCellRenderer" minWidth={95} maxWidth={100} ></AgGridColumn>
              </AgGridReact>                     
          </div>
          <Button
            onClick={this.onExportButtonClick}
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.exportBtn}
            id="ExportBtn"
          >
            Download The List
          </Button>                 
        </Paper>
        <div className={classes.licanse}>
            This work is licensed under a <a rel="license" target="_blank" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
          </div> 
      </div>
    );
  }
};

export default withStyles(styles)(DataBrokersDB);