import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.scss'
import {getPointOfSaleErrors,putPointOfSaleErrors} from './service/pos'
import {
  ErrorAlertPopup,
  UiButton,
  ErrorMessage
} from './common/framework'
import moment from 'moment'
import {
  isRequiredCostStyle,
  zipValidate,
  enabledLogic,
  isRequiredUnitPrice,
  isRequiredItem,
  isRequiredDescription,
  isRequiredQty,
  upperCase,
  buttonHide
} from './validation/validate'
import NumericEditor from './validation/numericEditor.jsx';
let currentDate = moment().format('DD-MMM-YY H:mm:ss');
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: 'Invoice',
          field: 'DOCUMENT_NUMBER',
          width: 100,
          pinned: 'left',
        },
        {
          headerName: 'Seq',
          field: 'DOCUMENT_LINE_ITEM',
          width: 100,
          pinned: 'left',
        },
        {
          headerName: 'Customer',
          field: 'CUSTOMER_IDENTIFIER',
          width: 150,
          pinned: 'left',
        },
        {
          headerName: 'Name',
          field: 'CUSTOMER_NAME',
          type: 'numberColumn',
          width: 200,
          valueFormatter: upperCase
        },
        {
          headerName: 'NAICS',
          field: 'NAICS_CODE',
          width: 100,
          cellEditor: 'numericEditor',
        },
        
        {
          headerName: 'Sold-to Address',
          children: [
            { headerName: 'City', field: 'SOLD_TO_CITY',width: 100,  valueFormatter: upperCase },
            { headerName: 'State', field: 'SOLD_TO_STATE',width: 100,  valueFormatter: upperCase},
            { headerName: 'Zip', field: 'SOLD_TO_ZIP',width: 100, cellStyle:zipValidate,cellEditor: 'numericEditor', },
            { headerName: 'Country', field: 'SOLD_TO_COUNTRY',width: 120,  valueFormatter: upperCase }
          ]
        },
        {
          headerName: 'Ship-to Address',
          children: [
            { headerName: 'City', field: 'SHIP_TO_CITY',width: 100,  valueFormatter: upperCase },
            { headerName: 'State', field: 'SHIP_TO_STATE',width: 100,   valueFormatter: upperCase},
            { headerName: 'Zip', field: 'SHIP_TO_ZIP',width: 100,cellStyle:zipValidate,cellEditor: 'numericEditor', },
            { headerName: 'Country', field: 'SHIP_TO_COUNTRY',width: 120,  valueFormatter: upperCase }
        ]
        },
        {
          headerName: 'Mfg Item',
          field: 'DISTRIBUTOR_PART_NUMBER',
          width: 150,
          valueFormatter: upperCase
        },
        {
          headerName: 'Our Item',
          field: 'OUR_PART_NUMBER',
          width: 150,
          cellStyle:isRequiredItem,
          valueFormatter: upperCase
        },
        {
          headerName: 'Our Description',
          field: 'PRODUCT_DESCRIPTION',
          width: 150,
          cellStyle:isRequiredDescription
        },
        {
          headerName: 'Qty',
          field: 'QUANTITY',
          width: 80,
          cellStyle:isRequiredQty,
          cellEditor: 'numericEditor'
        },
        {
          headerName: 'Unit Cost',
          field: 'UNIT_COST',
          width: 120,
          cellStyle:isRequiredCostStyle,
          cellEditor: 'numericEditor'
        },
        {
          headerName: 'Curr',
          field: 'UNIT_COST_CURRENCY',
          width: 90,
          cellEditor: 'numericEditor'
        },
        {
          headerName: 'Unit Price',
          field: 'UNIT_PRICE',
          width: 150,
          cellStyle:isRequiredUnitPrice,
          cellEditor: 'numericEditor'
        },
        {
          headerName: 'Curr',
          field: 'UNIT_PRICE_CURRENCY',
          width: 90,
          cellEditor: 'numericEditor'
        },
        {
          headerName: null,
          sortable: false,
          filter: false,
          width: 100,
          pinned: 'right',
          type: ['dateColumn', 'nonEditableColumn'],
          cellRendererFramework: row => (
            <UiButton bg="transparent" color="#08f" onClickHandler={()=>this.viewError(row)}>View error</UiButton>
          ),  
        },
        {
          headerName: null,
          sortable: false,
          filter: false,
          width: 120,
          pinned: 'right',
          type: ['dateColumn', 'nonEditableColumn'],
          cellRendererFramework: row => {
            let data = row.data
            let enabled = enabledLogic(data)
            console.log('enabled',enabled)
            return(
              <UiButton bg="#248027" color="#ffffff" onClickHandler={() => this.sendCorrection(row)}>Send correction</UiButton>
            )
          },
        },
        {
          headerName: null,
          sortable: false,
          filter: false,
          width: 120,
          pinned: 'right',
          type: ['dateColumn', 'nonEditableColumn'],
          cellRendererFramework: row => {
            let hideButtonStatus = row.data.STATUS === "D"
            return (
              <UiButton bg='#a9a9a9' hide={hideButtonStatus}  color="#000000" onClickHandler={()=> this.disregardError(row)}>
                Disregard error
              </UiButton>
            )
          },
        },
      ],
      error:{},
      rowClassRules: {
        'data-correct': function (params) {
          var greenStatus = params.data.STATUS !== null && params.data.STATUS === "C";
          return greenStatus
        },
        'data-skip': function (params) {
          var grayStatus = params.data.STATUS !== null && params.data.STATUS === "D";
          return grayStatus
        },
      },
      frameworkComponents: {
        numericEditor: NumericEditor,
      },
      defaultColDef: {
        width: 150,
        sortable: true,
        editable:true,
        filter: true, 
        resizable: true,
      },
      defaultColGroupDef: { marryChildren: true },
      columnTypes: {
        numberColumn: {
          width: 130,
          filter: 'agNumberColumnFilter',
        },
        medalColumn: {
          width: 100,
          columnGroupShow: 'open',
          filter: false,
        },
        nonEditableColumn: { editable: false },
        dateColumn: {
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator: function (filterLocalDateAtMidnight, cellValue) {
              var dateParts = cellValue.split('/');
              var day = Number(dateParts[0]);
              var month = Number(dateParts[1]) - 1;
              var year = Number(dateParts[2]);
              var cellDate = new Date(year, month, day);
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              } else if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              } else {
                return 0;
              }
            },
          },
        },
      },
      rowData: null,
    };
  }
  sendCorrection = (params) => {
    let data = params.data
    let enabled = enabledLogic(data)
    if(enabled){
      let apiKey =  window.location.href.split('=')[1] ? window.location.href.split('=')[1] : 0
      let validate = params.data
      validate['STATUS'] = "C"
      validate['CORRECTED_BY_USER_KEY'] = parseInt(apiKey)
      validate['DATE_CORRECTION_SENT'] = currentDate
      putPointOfSaleErrors(params.data.RECORD_NUMBER, validate).then(res => {
       window.location.reload();
      }).catch(error => {
        let errorMessage = error.response.data
        ErrorMessage(errorMessage.errorLocation,errorMessage.errorMsg, errorMessage.sourceName)
      })
    }else{
      let errorData = params.data
      let errorDate = errorData.ERROR_DATE ? errorData.ERROR_DATE : currentDate
      let errHeader = "Error Date"
      let errFooter = "Error Message(s)"
      let closeName = "Close error message"
      let errMessge = "Please enter required fields "
      ErrorAlertPopup(errHeader,errFooter,errorDate,errMessge,errorData.ERROR_DATE,closeName)
    }
    
  };
  disregardError = (params) => {
    let apiKey =  window.location.href.split('=')[1] ? window.location.href.split('=')[1] : 0
    const updateData = (data) => {
      this.setState({ rowData: data });
    };
    let validate = params.data.STATUS
    let sendData = {
      STATUS: "D",
      DATE_DISREGARDED:currentDate,
      CORRECTED_BY_USER_KEY: parseInt(apiKey)
    }
    putPointOfSaleErrors(params.data.RECORD_NUMBER, sendData).then(res => {
      window.location.reload();
    }).catch(error => {
      let errorMessage = error.response.data
      ErrorMessage(errorMessage.errorLocation,errorMessage.errorMsg, errorMessage.sourceName)
    })
    
  }
  viewError = (params) => {
    let errorData = params.data
    let errHeader = "Error Date"
    let errFooter = "Error Message(s)"
    let closeName = "Close error message"
    console.log(errorData)
    ErrorAlertPopup(errHeader,errFooter,errorData.ERROR_DATE,errorData.ERROR_MESSAGE,errorData.ERROR_DATE,closeName)
  }
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };
    getPointOfSaleErrors().then(res => {
      updateData(res);
    }).catch(errorMessage => {
      console.log('===========>',errorMessage)
    })
  };
  onCellValueChanged = (event) => {
    console.log('data after changes is: ', event.data);
  };
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="logo-title">
            <h4>Bosch POS Corrections</h4>
        </div>
        <div style={{ height: '100%', boxSizing: 'border-box' }}>
          <div
            id="myGrid"
            style={{
              height: '600px',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              defaultColGroupDef={this.state.defaultColGroupDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.rowData}
              singleClickEdit={true}
              rowClassRules={this.state.rowClassRules}
              onGridReady={this.onGridReady}
              onCellValueChanged={this.onCellValueChanged.bind(this)}
              frameworkComponents={this.state.frameworkComponents}
              overlayNoRowsTemplate={"There is no pending labor ready to post at this time."}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App