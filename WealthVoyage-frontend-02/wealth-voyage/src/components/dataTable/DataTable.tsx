import React from "react";
import "./dataTable.scss";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { purple, green, pink, blueGrey, blue } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";



type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};



const DataTable = (props: Props) => {
  const handleDelete = (id: number) => {
    console.log(id + "has been deleted");
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  // Define your dark mode theme
const theme = createTheme({
  palette: {
    mode: "dark",
  
  },
});

  return (
    <div className="dataTable">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataGrid
          className="dataGrid"
          rows={props.rows}
          columns={[...props.columns, actionColumn]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[8]}
          checkboxSelection
          disableRowSelectionOnClick
          disableDensitySelector
        />
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
