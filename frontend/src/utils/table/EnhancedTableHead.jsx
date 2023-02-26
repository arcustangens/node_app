import React from 'react'
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'

const headCells = [
  {
<<<<<<< HEAD
    id: 'contractor',
    label: 'Klient',
=======
    id: 'contractorId',
    label: 'Contractor',
>>>>>>> 9571a29db83277a9c26b91cc47d432ccb8fca62d
  },
  {
    id: 'number',
    label: 'Numer',
  },
  {
    id: 'name',
    label: 'Nazwa',
  },
  {
    id: 'dimensionTypeId',
    label: 'Typ wymiaru',
  },
  {
    id: 'a',
    label: 'A',
  },
  {
    id: 'b',
    label: 'B',
  },
  {
    id: 'c',
    label: 'C',
  },
  {
    id: 'd',
    label: 'D',
  },
  {
    id: 'e',
    label: 'E',
  },
  {
    id: 'f',
    label: 'F',
  },
  {
    id: 'materialId',
    label: 'Materiał',
  },
  {
    id: 'comments',
    label: 'Uwagi',
  },
]

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(({ id, numberic, disablePadding, label }) => (
          <TableCell
            key={id}
            align={numberic ? 'right' : 'left'}
            padding={disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === id ? order : false}
          >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              onClick={createSortHandler(id)}
            >
              {label}
              {orderBy === id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
