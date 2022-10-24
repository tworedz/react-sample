import React, {useState} from 'react'
import {IProduct} from "../../models/product";
import axios from "axios";
import {ErrorMessage} from "../ErrorMessage";
import {InputField} from "../InputField";

const productData: IProduct = {
    title: '',
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120
    }
}

interface CreateProductProps {
  onCreate: (product: IProduct) => void
}

function useField<T>(defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue)

  return {
    setValue: (v: T) => setValue(v),
    value: value,
    clear: () => setValue(defaultValue),
    isEmpty: () => value === defaultValue
  }
}

export function CreateProduct({onCreate}: CreateProductProps) {
  const titleElement = useField<string>('')
  const priceElement = useField<number>(0)

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    titleElement.clear()
    priceElement.clear()

    productData.title = titleElement.value
    productData.price = priceElement.value
    const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
    onCreate(response.data)
  }

  return (
    <form onSubmit={submitHandler}>
      <InputField<string> name="title" type="text" placeholder="Title..." error_message="Input title"/>
      <InputField<number> name="price" type="number" placeholder="Price..." error_message="Input price"/>
      <button
        type="submit"
        className="py-2 px-4 border bg-yellow-400 hover:text-white"
      >Create</button>
    </form>
  )
}
