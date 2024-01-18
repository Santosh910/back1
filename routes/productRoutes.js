import { Router } from "express";
import { addProduct, deleteProduct, getAllData, getAllProduct, getSingleProduct, updateProduct } from "../controllers/productController.js";

const router= Router()

router.post('/add-product',addProduct)

router.get('/get-all',getAllProduct)
router.get('/get-single',getSingleProduct)
router.post('/update-product',updateProduct)
router.delete('/delete-product',deleteProduct)
router.get('/get-data',getAllData)

export default router