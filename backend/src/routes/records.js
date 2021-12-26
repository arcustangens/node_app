import express from 'express'
import multer from 'multer'
import { createRecord } from '../controllers/recordController/createRecord.js'
import { deleteRecord } from '../controllers/recordController/deleteRecord.js'
import { getRecords } from '../controllers/recordController/getRecords.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, { fieldname, originalname }, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = originalname.split('.').at(-1)
    cb(null, `${fieldname}-${uniqueSuffix}.${extension}`)
  },
})
const upload = multer({ storage })

router.post(
  '/',
  upload.fields([
    { name: 'plik', maxCount: 1 },
    { name: 'plikThumbnail', maxCount: 1 },
  ]),
  createRecord
)
router.get('/', getRecords)
// # TODO
// router.put(
//   '/:id',
//   upload.fields([
//     { name: 'plik', maxCount: 1 },
//     { name: 'plikThumbnail', maxCount: 1 },
//   ]),
//   updateRecord
// )
router.delete('/:id', deleteRecord)

export default router
