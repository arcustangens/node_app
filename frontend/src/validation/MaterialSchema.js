import * as yup from 'yup'

export const MaterialSchema = yup.object().shape({
  material: yup.string().required('Wymagane'),
})
