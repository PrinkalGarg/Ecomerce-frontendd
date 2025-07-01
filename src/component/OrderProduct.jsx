import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

function OrderProduct({ productId, size, quantity }) {
  const { backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/product/listsingle`, // ✅ Fixed URL
          { _id: productId }
        );
        setProductData(response.data);
      } catch (error) {
        console.error(
          "Error fetching product:",
          error.response?.data || error.message
        );
      }
    };

    fetchProduct();
  }, [productId, backendUrl]);

  if (!productData) {
    return <div className="p-2">Loading product...</div>;
  }

  return (
    <div className="border p-4 rounded-md mb-3 shadow bg-white">
      <h2 className="text-lg font-semibold">{productData.name}</h2>
      <p><strong>Size:</strong> {size}</p>
      <p><strong>Quantity:</strong> {quantity}</p>
      <p><strong>Price:</strong> ₹{productData.product.price}</p>
      <img src={productData.product.images[0]} alt={productData.name} className="w-28 h-28 object-cover mt-2" />
    </div>
  );
}

export default OrderProduct;
