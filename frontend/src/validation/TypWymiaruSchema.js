import * as yup from 'yup'

export const TypWymiaruSchema = yup.object().shape({
  typWymiaru: yup.string().required('Wymagane'),
})
