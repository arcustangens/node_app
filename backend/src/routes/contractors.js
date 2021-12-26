import express from 'express'
import { createContractor } from '../controllers/contractorController/createContractor.js'
import { getContractors } from '../controllers/contractorController/getContractors.js'

const router = express.Router()

router.post('/', createContractor)
router.get('/', getContractors)

export default router
