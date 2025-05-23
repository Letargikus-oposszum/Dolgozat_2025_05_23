import express from "express"
import * as Controllers from "../controllers/controllers.js"
const notes =express.Router()

notes.get('/', Controllers.getnote)
notes.get('/:id', Controllers.getnoteById)
notes.post('/', Controllers.createnote)
notes.delete('/:id', Controllers.deletenote)

export default notes