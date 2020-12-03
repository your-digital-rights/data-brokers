import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { container } from "../../styles/layout";
import pageWithIntl from "../PageWithIntl";
import withRoot from "../../withRoot";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { AgGridReact } from 'ag-grid-react';
import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import styles from "./styles";
import fetchData from "../../utils/sheets";

const LOGO_SIZE = "24";

const getLogo = (url) => {
  return "https://api.faviconkit.com/" + url + LOGO_SIZE;
}

class DomainCellRenderer extends React.Component {

    // did you know that React passes props to your component constructor??
    constructor(props) {
        super(props);
    
        this.state = {
          value: props.value,
        };        
    }

    render() {
      return <span><img src={`https://api.faviconkit.com/${this.state.value}/16`}/> {this.state.value}</span>
  }
};

class DataBrokersDB extends React.Component {

  constructor(props){
    super(props);

    this.state =  {
      columnDefs: [
        { 
          field: 'domain', 
          headerName: 'Domain',   
        },
        { 
          field: 'name', 
          headerName: 'Name', 
        },                  
        { 
          field: 'email', 
          headerName: 'Email', 
        },        
        { 
          field: 'categories', 
          headerName: 'Categories', 
        },
      ],
      defaultColDef: {
        flex: 1,
        sortable: true,
        minWidth: 100,
        resizable: true,
      },
    }
  }
  
  async componentDidMount() {
    const dataBrokers = await fetchData();
    this.setState({ dataBrokers });    
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
    this.gridApi.exportDataAsCsv();
  }

  onQuickFilterChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById('quickFilter').value);
  };

  render() {
    const { classes } = this.props;
    const { dataBrokers } = this.props;

    return (
      <div className={classes.container}>
        <Paper className={classes.inner}>
          <Paper className={classes.searchRoot} elevation={1}>
            <SearchIcon />
            <InputBase id="quickFilter" className={classes.searchInput} placeholder="Search..." onInput={() => this.onQuickFilterChanged()} />
          </Paper>
            <div
              className="ag-theme-material"
              style={{
                height: '500px',
              }}
            >
              <AgGridReact
                onGridReady={ params => this.gridApi = params.api }
                columnDefs={this.state.columnDefs}
                rowData={dataBrokers}
                rowSelection="multiple"
                defaultColDef={this.state.defaultColDef}
                onGridReady={this.onGridReady}
              >
              </AgGridReact>            
          </div>        
          <Button
            onClick={this.onExportButtonClick}
            variant="raised"
            color="secondary"
            type="submit"
            className={classes.exportBtn}
            id="ExportBtn"
          >
            Download The List
          </Button>          
        </Paper>
      </div>
    );
  }
};

export default withRoot(pageWithIntl(withStyles(styles)(DataBrokersDB)));
