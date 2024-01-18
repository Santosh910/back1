import { Router } from "express";
import productRoute from './productRoutes.js'
import categoryRoutes from './categoryRoutes.js'
const router = Router()

router.use('/product',productRoute)
router.use('/category',categoryRoutes)

export default router