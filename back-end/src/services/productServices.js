import Product from "../models/productModal.js";
import CustomError from "../utils/customError.js";


const addProductService = async ({name, price, image, category}) => {
    const existingProduct = await Product.findOne({ name:name })
    if (existingProduct) {
        throw new CustomError('already Product exists', 400)
    }

    const product = await Product.create({
        name,
        price,
        image,
        category

    });
    return product
};

const getProductsService = async(page, limit)=>{
   const skip = (page - 1) * limit


    

    

    return { products, total, totalManProduct, totalWomenProduct, totalKidsProduct};
}

export {addProductService, getProductsService}