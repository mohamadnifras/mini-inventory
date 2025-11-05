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

const getProductController = asyncHandler(async () => {
    const { page = 1, limit = 10 } = req.query;
    const { products, total, totalManProduct, totalWomenProduct, totalKidsProduct } = await getProductsService({ page: parseInt(page), limit: parseInt(limit) })

    return res.status(200).json({
        count: products.length,
        total,
        page: Math.ceil(total / limit),
        currentPage: parseInt(page),
        totalManProduct,
        totalWomenProduct,
        totalKidsProduct,
        products,
    })
})




export { createProduct, getProductController }

