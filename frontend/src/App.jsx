import { Container, TextField, Grid } from '@mui/material'
import RecordTable from './RecordTable'
import CreateRecordDialog from './CreateRecordDialog'

function App() {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField id='time' type='text' />
        </Grid>
        <Grid item xs={6}>
          <CreateRecordDialog />
        </Grid>
      </Grid>

      <RecordTable />
    </Container>
  )
}

export default App
