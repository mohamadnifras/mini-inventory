import express from 'express'
import authenticate from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';
import {createProduct, getProductController} from '../controllers/productControllers.js'


const router = express.Router();
//Admin handle
router.post("/addProduct",authenticate,isAdmin,createProduct)

//user handle
router.get("/getProduct", getProductController)




export default router