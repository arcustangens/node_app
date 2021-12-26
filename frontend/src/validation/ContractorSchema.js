import * as yup from 'yup'

export const ContractorSchema = yup.object().shape({
  contractor: yup.string().required('Wymagane'),
  acronym: yup.string().required('Wymagane'),
})
