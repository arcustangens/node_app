import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from '@mui/material'
import RecordTable from './components/records/RecordTable'
import CreateRecordDialog from './components/records/CreateRecordDialog'
import CreateContractorDialog from './components/contractors/CreateContractorDialog'
import CreateMaterialDialog from './components/materials/CreateMaterialDialog'
import CreateDimensionTypeDialog from './components/dimensionTypes/CreateDimensionTypeDialog'
import { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { useAxiosGet } from './utils/useFetch'
import NumberRangeFilter from './components/utils/NumberRangeFilter'

const App = () => {
  const [contractors, contractorsLoading, contractorsError, fetchContractors] =
    useAxiosGet('/contractors')
  const [
    dimensionTypes,
    dimensionTypesLoading,
    dimensionTypesError,
    fetchDimensionTypes,
  ] = useAxiosGet('/dimensionTypes')
  const [materials, materialsLoading, materialsError, fetchMaterials] =
    useAxiosGet('/materials')
  const [records, recordsLoading, recordsError, fetchRecords] =
    useAxiosGet('/records')
  const [filteredRecords, setFilteredRecords] = useState(records)

  //Filters
  const [searchFilter, setSearchFilter] = useState('')

  const [minAFilter, setMinAFilter] = useState('')
  const [maxAFilter, setMaxAFilter] = useState('')

  const [minBFilter, setMinBFilter] = useState('')
  const [maxBFilter, setMaxBFilter] = useState('')

  const [minCFilter, setMinCFilter] = useState('')
  const [maxCFilter, setMaxCFilter] = useState('')

  const [minDFilter, setMinDFilter] = useState('')
  const [maxDFilter, setMaxDFilter] = useState('')

  const [minEFilter, setMinEFilter] = useState('')
  const [maxEFilter, setMaxEFilter] = useState('')

  const [minFFilter, setMinFFilter] = useState('')
  const [maxFFilter, setMaxFFilter] = useState('')

  useEffect(() => {
    if (records?.length) {
      const filterRegex = new RegExp(
        `.*${String(searchFilter).toLowerCase()}.*`
      )

      setFilteredRecords([
        ...records
          .filter(
            ({ contractorId, number, dimensionTypeId, name, materialId }) =>
              filterRegex.test(
                contractors
                  .find(({ value }) => value === contractorId)
                  ?.label.toLowerCase()
              ) ||
              filterRegex.test(number.toLowerCase()) ||
              filterRegex.test(
                dimensionTypes
                  .find(({ value }) => value === dimensionTypeId)
                  ?.label.toLowerCase()
              ) ||
              filterRegex.test(name.toLowerCase()) ||
              filterRegex.test(
                materials
                  .find(({ value }) => value === materialId)
                  ?.label.toLowerCase()
              )
          )
          .filter(
            ({ a, b, c, d, e, f }) =>
              a >= (+minAFilter || Math.max()) &&
              a <= (+maxAFilter || Math.min()) &&
              b >= (+minBFilter || Math.max()) &&
              b <= (+maxBFilter || Math.min()) &&
              c >= (+minCFilter || Math.max()) &&
              c <= (+maxCFilter || Math.min()) &&
              d >= (+minDFilter || Math.max()) &&
              d <= (+maxDFilter || Math.min()) &&
              e >= (+minEFilter || Math.max()) &&
              e <= (+maxEFilter || Math.min()) &&
              f >= (+minFFilter || Math.max()) &&
              f <= (+maxFFilter || Math.min())
          ),
      ])
    }
  }, [
    records,
    searchFilter,
    contractors,
    dimensionTypes,
    materials,
    minAFilter,
    maxAFilter,
    minBFilter,
    maxBFilter,
    minCFilter,
    maxCFilter,
    minDFilter,
    maxDFilter,
    minEFilter,
    maxEFilter,
    minFFilter,
    maxFFilter,
  ])

  const isDataLoading =
    contractorsLoading ||
    dimensionTypesLoading ||
    materialsLoading ||
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
              contractors={contractors}
              dimensionTypes={dimensionTypes}
              materials={materials}
            />
          </Grid>
          <Grid item>
            <CreateContractorDialog fetchContractors={fetchContractors} />
          </Grid>
          <Grid item>
            <CreateDimensionTypeDialog
              fetchDimensionTypes={fetchDimensionTypes}
            />
          </Grid>
          <Grid item>
            <CreateMaterialDialog fetchMaterials={fetchMaterials} />
          </Grid>
        </Grid>
        {[
          contractorsError,
          dimensionTypesError,
          materialsError,
          recordsError,
        ].map((e, i) =>
          e ? (
            <Grid item key={i}>
              <Alert severity='error'>{e}</Alert>
            </Grid>
          ) : null
        )}
        <Grid item container direction='row' spacing={3}>
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
            <NumberRangeFilter
              minValue={minAFilter}
              setMinValue={setMinAFilter}
              maxValue={maxAFilter}
              setMaxValue={setMaxAFilter}
              label='A'
            />
          </Grid>
          <Grid item>
            <NumberRangeFilter
              minValue={minBFilter}
              setMinValue={setMinBFilter}
              maxValue={maxBFilter}
              setMaxValue={setMaxBFilter}
              label='B'
            />
          </Grid>
          <Grid item>
            <NumberRangeFilter
              minValue={minCFilter}
              setMinValue={setMinCFilter}
              maxValue={maxCFilter}
              setMaxValue={setMaxCFilter}
              label='C'
            />
          </Grid>
          <Grid item>
            <NumberRangeFilter
              minValue={minDFilter}
              setMinValue={setMinDFilter}
              maxValue={maxDFilter}
              setMaxValue={setMaxDFilter}
              label='D'
            />
          </Grid>
          <Grid item>
            <NumberRangeFilter
              minValue={minEFilter}
              setMinValue={setMinEFilter}
              maxValue={maxEFilter}
              setMaxValue={setMaxEFilter}
              label='E'
            />
          </Grid>
          <Grid item>
            <NumberRangeFilter
              minValue={minFFilter}
              setMinValue={setMinFFilter}
              maxValue={maxFFilter}
              setMaxValue={setMaxFFilter}
              label='F'
            />
          </Grid>
        </Grid>
        <Grid item>
          <RecordTable
            records={filteredRecords}
            fetchRecords={fetchRecords}
            contractors={contractors}
            dimensionTypes={dimensionTypes}
            materials={materials}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
