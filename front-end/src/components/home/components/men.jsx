import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProduct } from "../../../redux/productSlice";

function Men() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(allProduct({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  // ✅ Filter only "men" category products
  const menProducts = products?.filter(
    (product) => product.category?.toLowerCase() === "men"
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Men's Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menProducts && menProducts.length > 0 ? (
          menProducts.map((product) => (
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
              <p className="text-gray-600 capitalize">
                Category: {product.category}
              </p>
              <p className="text-green-600 font-semibold mt-1">
                ₹{product.price}
              </p>
            </div>
          ))
        ) : (
          <p>No men's products found.</p>
        )}
      </div>
    </div>
  );
}

export default Men;
