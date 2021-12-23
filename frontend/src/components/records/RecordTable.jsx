import React, { useRef } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import ViewRecordDialog from './ViewRecordDialog'

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
  { field: 'a', headerName: 'A', width: 80 },
  { field: 'b', headerName: 'B', width: 80 },
  { field: 'c', headerName: 'C', width: 80 },
  { field: 'd', headerName: 'D', width: 80 },
  { field: 'e', headerName: 'E', width: 80 },
  { field: 'nazwa', headerName: 'Nazwa', width: 200 },
  { field: 'material', headerName: 'Materiał', width: 150 },
  { field: 'uwagi', headerName: 'Uwagi', width: 200 },
]

const RecordTable = ({ records, updateRecord, removeRecord }) => {
  const viewRecordDialogRef = useRef(null)

  if (!records) {
    return <span />
  }

  return (
    <>
      <ViewRecordDialog
        ref={viewRecordDialogRef}
        updateRecord={updateRecord}
        removeRecord={removeRecord}
      />
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
          viewRecordDialogRef.current.handleOpen(row)
        }}
      />
    </>
  )
}

export default RecordTable
