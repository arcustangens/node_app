import React, { useContext, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import CreateRecordForm from './CreateRecordForm'
import { useEditModeContext } from '../../EditModeContext'

const CreateRecordDialog = ({
  fetchRecords,
  contractors,
  dimensionTypes,
  materials,
}) => {
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
        Dodaj rekord
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth='xl'>
        <DialogTitle>Dodaj rekord</DialogTitle>
        <DialogContent sx={{ minWidth: 400, minHeight: 300 }}>
          <CreateRecordForm
            handleDialog={handleClose}
            fetchRecords={fetchRecords}
            contractors={contractors}
            dimensionTypes={dimensionTypes}
            materials={materials}
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
