import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from '@mui/material'
import RecordTable from './components/records/RecordTable'
import CreateRecordDialog from './components/records/CreateRecordDialog'
import CreateKontrahentDialog from './components/kontrahenci/CreateKontrahentDialog'
import CreateMaterialDialog from './components/materialy/CreateMaterialDialog'
import CreateTypWymiaruDialog from './components/wymiary/CreateTypWymiaruDialog'
import { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { useAxiosGet } from './utils/useFetch'

const App = () => {
  const [kontrahenci, kontrahenciLoading, kontrahenciError, fetchKontrahenci] =
    useAxiosGet('/kontrahenci')
  const [typyWymiaru, typyWymiaruLoading, typyWymiaruError, fetchTypyWymiaru] =
    useAxiosGet('/typ_wymiaru')
  const [materialy, materialyLoading, materialyError, fetchMaterialy] =
    useAxiosGet('/materialy')
  const [records, recordsLoading, recordsError, fetchRecords] =
    useAxiosGet('/records')
  const [filteredRecords, setFilteredRecords] = useState(records)
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    if (records?.length) {
      setFilteredRecords([
        ...records.filter(({ nazwa }) =>
          nazwa.toLowerCase().includes(searchFilter.toString().toLowerCase())
        ),
      ])
    }
  }, [records, searchFilter])

  const isDataLoading =
    kontrahenciLoading ||
    typyWymiaruLoading ||
    materialyLoading ||
    recordsLoading

  if (isDataLoading) {
    return (
      <CircularProgress
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
      />
    )
  }

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
            <CreateRecordDialog
              fetchRecords={fetchRecords}
              kontrahenci={kontrahenci}
              typyWymiaru={typyWymiaru}
              materialy={materialy}
            />
          </Grid>
          <Grid item>
            <CreateKontrahentDialog fetchKontrahenci={fetchKontrahenci} />
          </Grid>
          <Grid item>
            <CreateTypWymiaruDialog fetchTypyWymiaru={fetchTypyWymiaru} />
          </Grid>
          <Grid item>
            <CreateMaterialDialog fetchMaterialy={fetchMaterialy} />
          </Grid>
        </Grid>
        {[kontrahenciError, typyWymiaruError, materialyError, recordsError].map(
          (e, i) =>
            e ? (
              <Grid item key={i}>
                <Alert severity='error'>{e}</Alert>
              </Grid>
            ) : null
        )}
        <Grid item>
          <DebounceInput
            element={TextField}
            id='record-filter'
            label='Szukaj'
            value={searchFilter}
            onChange={({ target: { value } }) => setSearchFilter(value)}
            debounceTimeout={400}
          />
        </Grid>
        <Grid item>
          <RecordTable
            records={filteredRecords}
            fetchRecords={fetchRecords}
            kontrahenci={kontrahenci}
            typyWymiaru={typyWymiaru}
            materialy={materialy}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
