import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import CreateTypWymiaruForm from './CreateTypWymiaruForm'

const CreateTypWymiaruDialog = () => {
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
        Dodaj typ wymiaru
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj typ wymiaru</DialogTitle>
        <DialogContent>
          <CreateTypWymiaruForm handleDialog={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Wróć</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateTypWymiaruDialog
