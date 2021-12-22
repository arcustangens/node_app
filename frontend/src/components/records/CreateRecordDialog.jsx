import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
} from '@mui/material'
import CreateRecordForm from './CreateRecordForm'

const CreateRecordDialog = ({ appendRecord }) => {
  const [open, setOpen] = useState(false)
  const [kontrahenci, setKontrahenci] = useState([])
  const [kontrahenciLoading, setKontrahenciLoading] = useState(false)
  const [typyWymiaru, setTypyWymiaru] = useState([])
  const [typyWymiaruLoading, setTypyWymiaruLoading] = useState(false)
  const [materialy, setMaterialy] = useState([])
  const [materialyLoading, setMaterialyLoading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fetchKontrahenci = async () => {
    setKontrahenciLoading(true)
    const { data } = await axios.get('/kontrahenci')
    setKontrahenci(data)
    setKontrahenciLoading(false)
  }

  const fetchTypyWymiaru = async () => {
    setTypyWymiaruLoading(true)
    const { data } = await axios.get('/typ_wymiaru')
    setTypyWymiaru(data)
    setTypyWymiaruLoading(false)
  }

  const fetchMaterialy = async () => {
    setMaterialyLoading(true)
    const { data } = await axios.get('/materialy')
    setMaterialy(data)
    setMaterialyLoading(false)
  }

  const isDataLoading = () => {
    return kontrahenciLoading || typyWymiaruLoading || materialyLoading
  }

  useEffect(() => {
    if (open) {
      fetchKontrahenci()
      fetchTypyWymiaru()
      fetchMaterialy()
    }
  }, [open])

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Dodaj rekord
      </Button>
      {isDataLoading() ? (
        <CircularProgress
          sx={{ position: 'absolute', left: '50%', top: '50%' }}
        />
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Dodaj rekord</DialogTitle>
          <DialogContent>
            <CreateRecordForm
              handleDialog={handleClose}
              kontrahenci={kontrahenci}
              typyWymiaru={typyWymiaru}
              materialy={materialy}
              appendRecord={appendRecord}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Wróć</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default CreateRecordDialog
