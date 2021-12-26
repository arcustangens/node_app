import * as yup from 'yup'

export const TypWymiaruSchema = yup.object().shape({
  dimensionType: yup.string().required('Wymagane'),
})
