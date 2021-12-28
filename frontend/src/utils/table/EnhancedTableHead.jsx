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
    id: 'nazwa',
    label: 'Nazwa',
  },
  {
    id: 'contractor',
    label: 'Contractor',
  },
  {
    id: 'number',
    label: 'Number',
  },
  {
    id: 'typ',
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
    id: 'material',
    label: 'Materiał',
  },
  {
    id: 'uwagi',
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
