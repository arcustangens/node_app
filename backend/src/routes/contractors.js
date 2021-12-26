import express from 'express'
import { createContractor } from '../controllers/contractorController/createContractor.js'
import { getContractors } from '../controllers/contractorController/getContractors.js'
import { getNextNumberSuggestion } from '../controllers/contractorController/getNextNumberSuggestion.js'

const router = express.Router()

router.post('/', createContractor)
router.get('/', getContractors)
router.get('/next', getNextNumberSuggestion)

export default router
