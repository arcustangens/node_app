import { Container, Grid } from '@mui/material'
import RecordTable from './components/records/RecordTable'
import CreateRecordDialog from './components/records/CreateRecordDialog'
import CreateKontrahentDialog from './components/kontrahenci/CreateKontrahentDialog'
import CreateMaterialDialog from './components/materialy/CreateMaterialDialog'
import CreateTypWymiaruDialog from './components/wymiary/CreateTypWymiaruDialog'

function App() {
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
            <CreateRecordDialog />
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
