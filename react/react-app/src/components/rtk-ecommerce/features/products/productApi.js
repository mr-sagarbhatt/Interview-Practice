import axios from 'axios'

export const fetchProducts = () => {
  return axios.get(`http://localhost:3008/products`)
}

export const addProduct = (item) => {
  return axios.post(`http://localhost:3008/products`, item)
}

export const deleteProduct = (id) => {
  return axios.delete(`http://localhost:3008/products/${id}`)
}

export const updateProduct = ({ id, changes }) => {
  return axios.patch(`http://localhost:3008/products/${id}`, changes)
}
