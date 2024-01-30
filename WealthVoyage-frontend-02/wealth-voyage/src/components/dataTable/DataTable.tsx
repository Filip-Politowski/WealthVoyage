import React from 'react'
import "./dataTable.scss"
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";

const DataTable = () => {

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "loanName",
    headerName: "Loan name",
    width: 150,
    editable: true,
  },
  {
    field: "numberOfInstallments",
    headerName: "Number of installments",
    type: "number",
    align: "center",
    width: 160,
    editable: true,
  },
  {
    field: "installmentAmount",
    headerName: "Installment amount [zł]",
    type: "number",
    align: "center",
    width: 160,
    editable: true,
  },
  {
    field: "endDateOfInstallment",
    headerName: "End date",
    sortable: true,
    width: 150,
  },
];

const rows = [
  { id: 1, loanName: "Computer", numberOfInstallments: 30, installmentAmount: 9000,endDateOfInstallment:"2024-01-01"},
  { id: 2, loanName: "Phone", numberOfInstallments: 20, installmentAmount: 3000,endDateOfInstallment:"2024-01-01" },
  { id: 3, loanName: "Keyboard", numberOfInstallments: 3, installmentAmount: 500 ,endDateOfInstallment:"2024-01-01"},
  { id: 4, loanName: "Mouse", numberOfInstallments: 2, installmentAmount: 500,endDateOfInstallment:"2024-01-01" },
  { id: 5, loanName: "Speakers", numberOfInstallments: 5, installmentAmount: 1500,endDateOfInstallment:"2024-01-01" },
  { id: 6, loanName: "Display", numberOfInstallments: 15, installmentAmount: 3000 ,endDateOfInstallment:"2024-01-01"},
  { id: 7, loanName: "Pad", numberOfInstallments: 1, installmentAmount: 200,endDateOfInstallment:"2024-01-01" },
  { id: 8, loanName: "Microphone", numberOfInstallments: 3, installmentAmount: 500,endDateOfInstallment:"2024-01-01" },
  { id: 9, loanName: "Bum arm", numberOfInstallments: 4, installmentAmount: 900,endDateOfInstallment:"2024-01-01" },
];


  return (
    <div className="dataTable">
      <DataGrid
      className='dataGrid'
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        slots={{toolbar:GridToolbar}}
        slotProps={{
            toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
            }}
        }
        pageSizeOptions={[8]}
        checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        
        
        
      />
    </div>
  );
}


export default DataTable
