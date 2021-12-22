import * as yup from 'yup'

export const KontrahentSchema = yup.object().shape({
  kontrahent: yup.string().required('Wymagane'),
})
