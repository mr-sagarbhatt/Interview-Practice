import React, { useEffect } from 'react'
import './products.css'
import {
  fetchAsync,
  addAsync,
  updateAsync,
  deleteAsync,
  test,
  sagaFetchApiPending,
  sagaAddApiPending,
} from './productSlice'
import { useDispatch, useSelector } from 'react-redux'

const Products = () => {
  const dispatch = useDispatch()
  const fetchProducts = () => {
    // * Using Thunk API
    // dispatch(fetchAsync())

    // * Using Saga API
    dispatch(sagaFetchApiPending())
  }
  const { status, products } = useSelector((state) => state.products)
  console.log({ products })

  const data = {
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/1/1.jpg',
      'https://i.dummyjson.com/data/products/1/2.jpg',
      'https://i.dummyjson.com/data/products/1/3.jpg',
      'https://i.dummyjson.com/data/products/1/4.jpg',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    ],
  }
  const addProduct = (data) => () => {
    const productData = { ...data, id: String(products?.length + 1 || 1) }
    // * Using Thunk API
    // dispatch(addAsync(productData))

    // * Using Saga API
    dispatch(sagaAddApiPending(productData))
  }

  const updateProduct = ({ id, changes }) => {
    dispatch(updateAsync({ id, changes }))
  }

  const deleteProduct = (id) => {
    dispatch(deleteAsync(id))
  }

  useEffect(() => {
    fetchProducts()
    dispatch(test())
  }, [])

  return (
    <div>
      <div>Products</div>
      {status === 'loading' ? <p>Loading...</p> : null}
      {status === 'error' ? <p>{error}</p> : null}
      {status === 'idle' ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={addProduct(data)}>Add Product</button>

          {products &&
            products.map((product) => (
              <div className="card" style={{ width: '50%' }}>
                <img src={product?.thumbnail} alt={product?.title} style={{ width: '100%' }} />
                <h1>{product?.title}</h1>
                <p className="price">${product?.price}</p>
                <p>{product?.description}</p>
                <p>Quantity: {product?.quantity}</p>
                <p>
                  <button>Add to Cart</button>
                </p>
                <p>
                  <button onClick={() => updateProduct({ id: product?.id, changes: { quantity: 1 } })}>
                    Update quantity to 1
                  </button>
                  <button onClick={() => updateProduct({ id: product?.id, changes: { quantity: 100 } })}>
                    Update quantity to 100
                  </button>
                </p>
                <p>
                  <button onClick={() => deleteProduct(product.id)}>Delete product</button>
                </p>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  )
}

export default Products
