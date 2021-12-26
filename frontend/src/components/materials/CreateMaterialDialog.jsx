import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import CreateMaterialForm from './CreateMaterialForm'

const CreateMaterialDialog = ({ fetchMaterials }) => {
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
        Dodaj materiał
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj materiał</DialogTitle>
        <DialogContent>
          <CreateMaterialForm
            handleDialog={handleClose}
            fetchMaterials={fetchMaterials}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Wróć</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateMaterialDialog
