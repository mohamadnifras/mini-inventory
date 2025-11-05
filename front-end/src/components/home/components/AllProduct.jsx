import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {allProduct} from "../../../redux/productSlice"


function AllProduct() {
    const dispatch = useDispatch()
    const {products, loading, } = useSelector((state)=> state.product);
    console.log("products",products)
    useEffect(()=>{
        dispatch(allProduct({page: 1, limit: 10,}))
    },[dispatch,])
if (loading) return <div>Loading...</div>;
    
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded-2xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image?.[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-600 capitalize">Category: {product.category}</p>
              <p className="text-green-600 font-semibold mt-1">₹{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  )
}

export default AllProduct