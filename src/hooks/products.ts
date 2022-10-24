import {useEffect, useState} from "react";
import {IProduct} from "../models/product";
import axios, {AxiosError} from "axios";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function addProduct(product: IProduct) {
    setProducts(prev => [product, ...prev])
  }

  async function fetchProducts() {
    setLoading(true)
    try {
      const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=5')
      setProducts(response.data)
    }
    catch (e: unknown){
      const error = e as AxiosError
      setError(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {loading, error, products, addProduct}
}
