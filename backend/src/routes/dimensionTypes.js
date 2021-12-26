import express from 'express'
import { createDimensionType } from '../controllers/dimensionTypeController/createDimensionType.js'
import { getDimensionTypes } from '../controllers/dimensionTypeController/getDimensionTypes.js'

const router = express.Router()

router.post('/', createDimensionType)
router.get('/', getDimensionTypes)

export default router
