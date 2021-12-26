import * as yup from 'yup'
import { testPositiveFloat } from './testPositiveFloat'

export const UpdateRecordSchema = yup.object().shape({
  contractor: yup.string().required('Wymagane'),
  number: yup.string().required('Wymagane'),
  dimensionType: yup.string().required('Wymagane'),
  a: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  b: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  c: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  d: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  e: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  f: yup.string().test('isFloat', 'Podaj liczbę dodatnią', testPositiveFloat),
  name: yup.string().required('Wymagane'),
  material: yup.string().required('Wymagane'),
  mainFile: yup.mixed(),
  thumbnailFile: yup.mixed(),
})
