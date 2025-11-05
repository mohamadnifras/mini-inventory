import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
   name: {
        type: String,
        required: [true, 'product name required'],
    },
    price: {
        type: Number,
        required: [true, 'product price required']
    },
    image: {
        type: [String],
        required: [true, 'product image required']
    },
    category: {
        type: String,
        required: [true, 'product category required']
    },
  
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema)
export default Product