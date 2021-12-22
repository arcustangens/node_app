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
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'kontrahent', headerName: 'Kontrahent', width: 120 },
  { field: 'numer', headerName: 'Numer seryjny', width: 50 },
  { field: 'typWymiaru', headerName: 'Rodzaj wymiarów', width: 50 },
  { field: 'x', headerName: 'x', width: 50 },
  { field: 'y', headerName: 'y', width: 50 },
  { field: 'z', headerName: 'z', width: 50 },
  { field: 'nazwa', headerName: 'Nazwa', width: 120 },
  { field: 'material', headerName: 'Materiał', width: 120 },
]

const rows = [
  {
    id: 1,
    kontrahent: 'KLINGSPOR',
    numer: 'KL001',
    typWymiaru: null,
    x: 120,
    y: 260,
    z: 15,
    nazwa: '5142121;514209',
    material: 'GD2 350 g/m2',
  },
  {
    id: 2,
    kontrahent: 'KLINGSPOR',
    numer: 'KL001',
    typWymiaru: null,
    x: 120,
    y: 260,
    z: 15,
    nazwa: '5142121;514209',
    material: 'GD2 350 g/m2',
  },
]

const RecordTable = () => {
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
      />
    </div>
  )
}

export default RecordTable
