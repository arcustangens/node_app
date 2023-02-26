import React, { useEffect, useRef, useState } from 'react'
import ViewRecordDialog from './ViewRecordDialog'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Popover,
  Alert,
} from '@mui/material'
import EnhancedTableToolbar from '../../utils/table/EnhancedTableToolbar'
import EnhancedTableHead from '../../utils/table/EnhancedTableHead'
import { usePrevious } from '../../utils/usePrevious'
import _ from 'lodash'

const RecordTable = ({
  records,
  fetchRecords,
  contractors,
  dimensionTypes,
  materials,
  filters,
}) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [anchorEl, setAnchorEl] = useState(null)
  const [hoveredRow, setHoveredRow] = useState(null)
  const previousFilters = usePrevious(filters)

  const extractValue = (objectValue, orderKey) => {
    switch (orderKey) {
      case 'contractorId':
        return contractors.find(({ value }) => value === objectValue).label
      case 'dimensionTypeId':
        return dimensionTypes.find(({ value }) => value === objectValue).label
      case 'materialId':
        return materials.find(({ value }) => value === objectValue).label
      default:
        return objectValue
    }
  }

  const descendingComparator = (a, b, orderBy) => {
    const aKey = extractValue(a[orderBy], orderBy)
    const bKey = extractValue(b[orderBy], orderBy)

    return String(aKey).localeCompare(String(bKey))
  }

  const getComparator = (order, orderBy) =>
    order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)

  const viewRecordDialogRef = useRef(null)

  const handlePopoverOpen = ({ currentTarget }) => {
    setAnchorEl(currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const rows = records?.length > 0 ? records : []

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = ({ target: { value } }) => {
    setRowsPerPage(parseInt(value, 10))
    setPage(0)
  }

  useEffect(() => {
    if (!_.isEqual(filters, previousFilters)) setPage(0)
  }, [filters, previousFilters])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  if (!records) {
    return <Alert severity='info'>Brak rekordów w bazie danych!</Alert>
  }

  return (
    <>
      <ViewRecordDialog
        ref={viewRecordDialogRef}
        fetchRecords={fetchRecords}
        contractors={contractors}
        dimensionTypes={dimensionTypes}
        materials={materials}
      />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
              size='small'
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        onMouseEnter={(e) => {
                          setHoveredRow(row)
                          handlePopoverOpen(e)
                        }}
                        onMouseLeave={(e) => {
                          handlePopoverClose(e)
                          setHoveredRow(null)
                        }}
                        onClick={() => {
                          viewRecordDialogRef.current.handleOpen(row)
                        }}
                      >
                        <TableCell align='left'>
                          {
                            contractors.find(
                              ({ value }) => value === row.contractorId
                            )?.label
                          }
                        </TableCell>
                        <TableCell align='left'>{row.number}</TableCell>
                        <TableCell align='left'>{row.name}</TableCell>
                        <TableCell align='left'>
                          {
                            dimensionTypes.find(
                              ({ value }) => value === row.dimensionTypeId
                            )?.label
                          }
                        </TableCell>
                        <TableCell align='left'>{row.a}</TableCell>
                        <TableCell align='left'>{row.b}</TableCell>
                        <TableCell align='left'>{row.c}</TableCell>
                        <TableCell align='left'>{row.d}</TableCell>
                        <TableCell align='left'>{row.e}</TableCell>
                        <TableCell align='left'>{row.f}</TableCell>
                        <TableCell align='left'>
                          {
                            materials.find(
                              ({ value }) => value === row.materialId
                            )?.label
                          }
                        </TableCell>
                        <TableCell align='left'>{row.comments}</TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Popover
        id='mouse-over-popover'
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {hoveredRow && hoveredRow?.thumbnailFile ? (
          <img
            alt='thumbnail'
            src={`http://192.168.1.66:3000/uploads/${hoveredRow.thumbnailFile}`}
            style={{ width: 400, height: 'auto', padding: 10 }}
          />
        ) : (
          <span />
        )}
      </Popover>
    </>
  )
}

export default RecordTable
