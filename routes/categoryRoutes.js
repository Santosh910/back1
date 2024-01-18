import { Router } from "express";
import { addCategory, gellAllCategory } from "../controllers/categoryController.js";


const router= Router()

router.post('/add-category',addCategory)
router.get('/get-cat',gellAllCategory)

export default router