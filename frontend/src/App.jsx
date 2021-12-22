import { Container, Grid } from '@mui/material'
import RecordTable from './components/records/RecordTable'
import CreateRecordDialog from './components/records/CreateRecordDialog'
import CreateKontrahentDialog from './components/kontrahenci/CreateKontrahentDialog'
import CreateMaterialDialog from './components/materialy/CreateMaterialDialog'
import CreateTypWymiaruDialog from './components/wymiary/CreateTypWymiaruDialog'
import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [records, setRecords] = useState()

  const fetchRecords = async () => {
    const { data } = await axios.get('/records')
    return data
  }

  const appendRecord = (newRecord) => {
    setRecords([...records, newRecord])
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  return (
    <Container
      maxWidth='xl'
      sx={{
        padding: 2,
      }}
    >
      <Grid container spacing={2} direction='column'>
        <Grid item container direction='row' spacing={3}>
          <Grid item>
            <CreateRecordDialog appendRecord={appendRecord} />
          </Grid>
          <Grid item>
            <CreateKontrahentDialog />
          </Grid>
          <Grid item>
            <CreateMaterialDialog />
          </Grid>
          <Grid item>
            <CreateTypWymiaruDialog />
          </Grid>
        </Grid>
        <Grid item>
          <RecordTable />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
