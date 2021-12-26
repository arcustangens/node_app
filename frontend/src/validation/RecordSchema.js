import * as yup from 'yup'
import { testPositiveFloat } from './testPositiveFloat'

export const RecordSchema = yup.object().shape({
  kontrahent: yup.string().required('Wymagane'),
  numer: yup.string().required('Wymagane'),
  typWymiaru: yup.string().required('Wymagane'),
  a: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  b: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  c: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  d: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  e: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  f: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  nazwa: yup.string().required('Wymagane'),
  material: yup.string().required('Wymagane'),
  plik: yup.mixed().test('fileRequired', 'Wymagane', (value) => {
    return value.length > 0
  }),
  plikThumbnail: yup.mixed().test('fileRequired', 'Wymagane', (value) => {
    return value.length > 0
  }),
})
