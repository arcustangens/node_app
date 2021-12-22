import * as yup from 'yup'

export const RecordSchema = yup.object().shape({
  kontrahent: yup.string().required(),
  numer: yup.string().required(),
  typWymiaru: yup.string().required(),
  a: yup.number(),
  b: yup.number(),
  c: yup.number(),
  d: yup.number(),
  e: yup.number(),
  nazwa: yup.string().required(),
  material: yup.string().required(),
})
