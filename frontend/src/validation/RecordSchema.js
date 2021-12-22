import * as yup from 'yup'

export const RecordSchema = yup.object().shape({
  kontrahent: yup.string().required('Wymagane'),
  numer: yup.string().required('Wymagane'),
  typWymiaru: yup.string().required('Wymagane'),
  a: yup.number(),
  b: yup.number(),
  c: yup.number(),
  d: yup.number(),
  e: yup.number(),
  nazwa: yup.string().required('Wymagane'),
  material: yup.string().required('Wymagane'),
  // plik: yup
  //   .mixed()
  //   .test('fileRequired', 'Wymagane', (value) => {
  //     return value.length > 0
  //   })
  //   .test('fileType', 'Błędne rozszerzenie pliku', (value) => {
  //     if (!value.length) return true
  //     return /^image\/.+$/.test(value[0].type)
  //   }),
})
