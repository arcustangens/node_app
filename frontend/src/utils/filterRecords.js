export const filterRecords = (
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
  maxFFilter
) => {
  const filterRegex = new RegExp(`.*${String(searchFilter).toLowerCase()}.*`)

  return [
    ...records
      .filter(
        ({
          contractorId,
          number,
          dimensionTypeId,
          name,
          materialId,
          comments,
        }) =>
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
          ) ||
          filterRegex.test(comments.toLowerCase())
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
  ]
}
