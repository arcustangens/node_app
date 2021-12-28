import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import CreateContractorForm from './CreateContractorForm'
import { useEditModeContext } from '../../EditModeContext'

const CreateContractorDialog = ({ fetchContractors }) => {
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
        Dodaj kontraktora
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj kontraktora</DialogTitle>
        <DialogContent>
          <CreateContractorForm
            handleDialog={handleClose}
            fetchContractors={fetchContractors}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Wróć</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateContractorDialog
