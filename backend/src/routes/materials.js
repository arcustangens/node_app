import express from 'express'
import { createMaterial } from '../controllers/materialController/createMaterial.js'
import { getMaterials } from '../controllers/materialController/getMaterials.js'

const router = express.Router()

router.post('/', createMaterial)
router.get('/', getMaterials)

export default router
