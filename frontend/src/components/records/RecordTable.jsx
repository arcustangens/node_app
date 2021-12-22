import React from 'react'
import { DataGrid } from '@mui/x-data-grid'

// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//       field: 'age',
//       headerName: 'Age',
//       type: 'number',
//       width: 90,
//     },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 160,
//       valueGetter: (params) =>
//         `${params.getValue(params.id, 'firstName') || ''} ${
//           params.getValue(params.id, 'lastName') || ''
//         }`,
//     },
//   ];

const columns = [
  { field: 'kontrahent', headerName: 'Kontrahent', width: 150 },
  { field: 'numer', headerName: 'Numer seryjny', width: 150 },
  { field: 'typ', headerName: 'Typ wymiarów', width: 170 },
  { field: 'a', headerName: 'A', sortable: false, width: 80 },
  { field: 'b', headerName: 'B', sortable: false, width: 80 },
  { field: 'c', headerName: 'C', sortable: false, width: 80 },
  { field: 'd', headerName: 'D', sortable: false, width: 80 },
  { field: 'e', headerName: 'E', sortable: false, width: 80 },
  { field: 'nazwa', headerName: 'Nazwa', width: 200 },
  { field: 'material', headerName: 'Materiał', width: 150 },
  { field: 'uwagi', headerName: 'Uwagi', width: 200 },
]

const RecordTable = ({ records }) => {
  console.log(records)
  if (!records) {
    return <span />
  }

  return (
    <DataGrid
      autoHeight
      autoPageSize
      density='compact'
      disableDensitySelector
      disableColumnSelector
      // disableColumnMenu
      // disableColumnFilter
      disableSelectionOnClick
      rows={records}
      columns={columns}
      pageSize={12}
      rowsPerPageOptions={[12]}
      onRowClick={({ row }) => {
        window.open(`localhost:3000/uploads/${row.plik}`, '_blank')
      }}
    />
  )
}

export default RecordTable
