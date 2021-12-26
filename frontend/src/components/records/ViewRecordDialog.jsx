import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
} from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import RecordDetails from './RecordDetails'
import CreateRecordForm from './CreateRecordForm'

const ViewRecordDialog = forwardRef(
  ({ fetchRecords, contractors, dimensionTypes, materials }, ref) => {
    const [record, setRecord] = useState(null)
    const [editMode, setEditMode] = useState(false)

    useImperativeHandle(ref, () => ({
      handleOpen(row) {
        setRecord(row)
        setOpen(true)
      },
    }))

    const [open, setOpen] = useState(false)

    const handleClose = () => {
      setOpen(false)
      setRecord(null)
    }

    const handleOpenEdit = () => {
      setEditMode(true)
    }

    const handleCloseEdit = () => {
      setEditMode(false)
    }

    return (
      <div>
        <Dialog
          open={open}
          onClose={() => {
            handleClose()
            handleCloseEdit()
          }}
          maxWidth='xl'
        >
          {editMode ? (
            <>
              <DialogTitle>
                <Grid container alignItems='center'>
                  <Grid item>
                    <IconButton
                      color='primary'
                      aria-label='upload picture'
                      component='span'
                      onClick={handleCloseEdit}
                    >
                      <ArrowBack />
                    </IconButton>
                  </Grid>
                  <Grid item>Edytuj rekord</Grid>
                </Grid>
              </DialogTitle>
              <DialogContent sx={{ minWidth: 400, minHeight: 300 }}>
                <CreateRecordForm
                  fetchRecords={fetchRecords}
                  handleDialog={handleCloseEdit}
                  edit
                  record={record}
                  contractors={contractors}
                  dimensionTypes={dimensionTypes}
                  materials={materials}
                />
              </DialogContent>
            </>
          ) : (
            <RecordDetails
              record={record}
              handleOpenEdit={handleOpenEdit}
              handleClose={handleClose}
              fetchRecords={fetchRecords}
              contractors={contractors}
              dimensionTypes={dimensionTypes}
              materials={materials}
            />
          )}
          <DialogActions>
            <Button onClick={handleClose}>Wróć</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
)

export default ViewRecordDialog
