import React from 'react'
import "./dataTable.scss"
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";

type Props ={
  columns:GridColDef[];
  rows:object[];
}

const DataTable = (props: Props) => {

  return (
    <div className="dataTable">
      <DataGrid
      className='dataGrid'
        rows={props.rows}
        columns={props.columns}
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
