import asyncHandler from "../utils/asyncHandler.js";
import { addProductService, getProductsService } from "../services/productServices.js"


const createProduct = asyncHandler(async (req, res) => {
    const { name, price, image,category } = req.body;


    const product = await addProductService({
        name, price, image,category
    });

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
    });
});

const getProductController = asyncHandler(async (req,res) => {
   const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
    console.log("controllers" ,page,limit)
    const { products, total,} = await getProductsService( page, limit)

    return res.status(200).json({
         success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      count: products.length,
      products,
    })
})




export { createProduct, getProductController }

