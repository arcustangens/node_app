import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import CreateTypWymiaruForm from './CreateDimensionTypeForm'
import { useEditModeContext } from '../../EditModeContext'

const CreateTypWymiaruDialog = ({ fetchDimensionTypes }) => {
  const [open, setOpen] = useState(false)
  const { edit } = useEditModeContext()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen} disabled={!edit}>
        Dodaj typ wymiaru
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj typ wymiaru</DialogTitle>
        <DialogContent>
          <CreateTypWymiaruForm
            handleDialog={handleClose}
            fetchDimensionTypes={fetchDimensionTypes}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Wróć</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateTypWymiaruDialog
