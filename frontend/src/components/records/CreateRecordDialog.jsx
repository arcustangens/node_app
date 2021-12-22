import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  const [kontrahenci, setKontrahenci] = useState([])
  const [materialy, setMaterialy] = useState([])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fetchKontrahenci = async () => {
    const { data } = await axios.get('/kontrahenci')
    setKontrahenci(data)
  }

  const fetchMaterialy = async () => {
    const { data } = await axios.get('/materialy')
    setMaterialy(data)
  }

  useEffect(() => {
    fetchKontrahenci()
    fetchMaterialy()
  }, [])

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Dodaj rekord
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj rekord</DialogTitle>
        <DialogContent>
          <CreateRecordForm
            handleDialog={handleClose}
            kontrahenci={kontrahenci}
            materialy={materialy}
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
