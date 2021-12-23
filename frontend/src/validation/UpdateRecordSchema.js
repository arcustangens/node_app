import * as yup from 'yup'

export const UpdateRecordSchema = yup.object().shape({
  kontrahent: yup.string().required('Wymagane'),
  numer: yup.string().required('Wymagane'),
  typWymiaru: yup.string().required('Wymagane'),
  a: yup.number().positive('Podaj liczbę dodatnią'),
  b: yup.number().positive('Podaj liczbę dodatnią'),
  c: yup.number().positive('Podaj liczbę dodatnią'),
  d: yup.number().positive('Podaj liczbę dodatnią'),
  e: yup.number().positive('Podaj liczbę dodatnią'),
  f: yup.number().positive('Podaj liczbę dodatnią'),
  nazwa: yup.string().required('Wymagane'),
  material: yup.string().required('Wymagane'),
  plik: yup.mixed().test('fileType', 'Błędne rozszerzenie pliku', (value) => {
    if (value.length === 0) return true
    return /^image\/.+$/.test(value[0].type)
  }),
  plikThumbnail: yup
    .mixed()
    .test('fileType', 'Błędne rozszerzenie pliku', (value) => {
      if (value.length === 0) return true
      return /^image\/.+$/.test(value[0].type)
    }),
})
