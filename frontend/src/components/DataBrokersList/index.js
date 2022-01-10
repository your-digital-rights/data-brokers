import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { useRef } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import styles from "./styles";
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import IconButton from '@material-ui/core/IconButton';
import ReactCountryFlag from "react-country-flag";
import dynamic from 'next/dynamic'


const DataBrokersDB = ({ classes, dataBrokers }) => {
  const DataBrokerContext = React.createContext({
    selectedDataBroker: null,
  });

  const defaultColDef = {
    flex: 1,
    sortable: true,
    minWidth: 100,
    resizable: true,
  };
  const [selectedDataBroker, setSelectedDataBroker] = React.useState(null);
  const gridRef = useRef(null);

  const DomainCellRenderer = params => {
    const domain = params.value.charAt(0).toUpperCase() + params.value.slice(1);
    return "<img style='vertical-align: middle' width='20px' src='//logo.uplead.com/" + params.value + "'/><span style='padding-left: 10px' >" + domain + "</span>";
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
  
  const onExportButtonClick = e => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    var fileName = "data-brokers-" + today + ".csv";
    gridRef.current.api.exportDataAsCsv({fileName: fileName});
  }

  const onQuickFilterChanged = () => {
    gridRef.current.api.setQuickFilter(document.getElementById('quickFilter').value);
  };

  const onFirstDataRendered = (params) => {
    gridRef.current.api.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = gridRef.current.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      var column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth && i != allColumns.length - 1) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    gridRef.current.columnApi.setColumnsVisible(columnsToShow, true);
    gridRef.current.columnApi.setColumnsVisible(columnsToHide, false);
    gridRef.current.api.sizeColumnsToFit();
  };

  const Map = dynamic(
    () => import("../MainMap"), 
    { 
      ssr: false 
    } // This line is important. It's what prevents server-side render
  );
  
  return (
    <div className={classes.container}>
      <Paper className={classes.inner}>
        <Map dataBrokers={dataBrokers} selectedDataBroker={selectedDataBroker} />
        <div className={classes.database}>
          <Paper className={classes.searchRoot} id="grid-wrapper" elevation={1}>
            <SearchIcon />
            <InputBase id="quickFilter" className={classes.searchInput} placeholder="Search..." onInput={() => onQuickFilterChanged()} />
          </Paper>
          <div
            className="ag-theme-material"
            style={{  
              height: '500px',
              width: '100%',
            }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={dataBrokers}
              rowSelection="single"
              onRowClicked={(e) => setSelectedDataBroker(e.data)}
              defaultColDef={{
                flex: 1,
                sortable: true,
                resizable: true,
              }}
              frameworkComponents={{
                optOutCellRenderer: OptOutCellRenderer,
                countryCellRenderer: CountryCellRenderer,
              }}
              onFirstDataRendered={onFirstDataRendered}
              onGridSizeChanged={onGridSizeChanged}
              reactUi={true}
            >
              <AgGridColumn field="Domain" headerName="Domain" minWidth={150} cellRenderer={DomainCellRenderer}></AgGridColumn>
              <AgGridColumn field="Company Geo Country Code" headerName="Country" cellRenderer="countryCellRenderer" minWidth={95} maxWidth={110} ></AgGridColumn>
              <AgGridColumn field="Company Name" headerName="Name" minWidth={100} ></AgGridColumn>
              <AgGridColumn field="Company Category Industry" headerName="Industry" minWidth={150} ></AgGridColumn>
              <AgGridColumn field="Company Category Sub Industry" headerName="Sub Industry" minWidth={150} ></AgGridColumn>
              <AgGridColumn field="YDR URL" headerName="Opt-out" cellRenderer="optOutCellRenderer" minWidth={95} maxWidth={100} ></AgGridColumn>
            </AgGridReact>                     
          </div>
          <Button
            onClick={onExportButtonClick}
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.exportBtn}
            id="ExportBtn"
          >
            Download The List
          </Button>
        </div>                 
      </Paper>
      <div className={classes.licanse}>
          This work is licensed under a <a rel="license" target="_blank" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
        </div> 
    </div>
  );
}

export default withStyles(styles)(DataBrokersDB);