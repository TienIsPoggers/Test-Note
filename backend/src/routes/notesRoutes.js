import express from 'express'
import { GetAllNotes,GetNodeById,CreateNotes,UpdateNotes,RemoveNotes } from '../controller/notesController.js';
const router = express.Router();
router.get('/',GetAllNotes)
router.get('/:id',GetNodeById)
router.post('/',CreateNotes)
router.put('/:id',UpdateNotes)
router.delete('/:id',RemoveNotes)

export default router