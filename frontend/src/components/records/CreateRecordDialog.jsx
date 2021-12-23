import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import CreateRecordForm from './CreateRecordForm'

const CreateRecordDialog = ({ appendRecord }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Dodaj rekord
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth='xl'>
        <DialogTitle>Dodaj rekord</DialogTitle>
        <DialogContent sx={{ minWidth: 400, minHeight: 300 }}>
          <CreateRecordForm
            handleDialog={handleClose}
            appendRecord={appendRecord}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Wróć</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateRecordDialog
