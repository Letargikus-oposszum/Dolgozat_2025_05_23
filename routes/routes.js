import express from "express"
import * as Controllers from "../controllers/controllers.js"
const router =express.Router()

router.get('/', Controllers.getnote)
router.get('/:id', Controllers.getnoteById)
router.post('/', Controllers.createnote)
router.put('/:id',Controllers.updatenote)
router.delete('/:id', Controllers.deletenote)

export default router