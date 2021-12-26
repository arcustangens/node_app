import React, { useRef, useState } from 'react'
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
} from '@mui/material'
import EnhancedTableToolbar from '../../utils/table/EnhancedTableToolbar'
import EnhancedTableHead from '../../utils/table/EnhancedTableHead'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
const RecordTable = ({
  records,
  fetchRecords,
  kontrahenci,
  typyWymiaru,
  materialy,
}) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('nazwa')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [anchorEl, setAnchorEl] = useState(null)
  const [hoveredRow, setHoveredRow] = useState(null)

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  if (!records) {
    return <span />
  }

  return (
    <>
      <ViewRecordDialog
        ref={viewRecordDialogRef}
        fetchRecords={fetchRecords}
        kontrahenci={kontrahenci}
        typyWymiaru={typyWymiaru}
        materialy={materialy}
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
                        <TableCell align='left'>{row.nazwa}</TableCell>
                        <TableCell align='left'>{row.kontrahent}</TableCell>
                        <TableCell align='left'>{row.numer}</TableCell>
                        <TableCell align='left'>{row.typ}</TableCell>
                        <TableCell align='left'>{row.a}</TableCell>
                        <TableCell align='left'>{row.b}</TableCell>
                        <TableCell align='left'>{row.c}</TableCell>
                        <TableCell align='left'>{row.d}</TableCell>
                        <TableCell align='left'>{row.e}</TableCell>
                        <TableCell align='left'>{row.f}</TableCell>
                        <TableCell align='left'>{row.material}</TableCell>
                        <TableCell align='left'>{row.uwagi}</TableCell>
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
        {hoveredRow && hoveredRow?.plik_thumbnail ? (
          <img
            alt='thumbnail'
            src={`http://localhost:3000/uploads/${hoveredRow.plik_thumbnail}`}
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
