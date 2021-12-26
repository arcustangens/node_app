import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import CreateKontrahentForm from './CreateKontrahentForm'

const CreateKontrahentDialog = ({ fetchKontrahenci }) => {
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
        Dodaj kontrahenta
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj kontrahenta</DialogTitle>
        <DialogContent>
          <CreateKontrahentForm
            handleDialog={handleClose}
            fetchKontrahenci={fetchKontrahenci}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Wróć</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateKontrahentDialog
