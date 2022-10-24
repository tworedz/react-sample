import React, {useRef, useState} from 'react';
import {ErrorMessage} from "./ErrorMessage";

type InputValueType = string | number | undefined

interface IProps<T extends InputValueType> {
  name: string,
  type: string,
  placeholder: string,
  defaultValue?: T,
  required?: boolean,
  error_message?: string,
}

export function InputField<T extends InputValueType>({name, type, placeholder, required = true, error_message}: IProps<T>) {
  const inputElementRef = useRef(null)
  const [touched, setTouched] = useState(false)

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.trim().length === 0 ?
      setTouched(true):
      setTouched(false)
  }
  return (
    <>
      <label htmlFor={name}>{name as string}</label>
      <input
        id={name}
        type={type}
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder={placeholder}
        ref={inputElementRef}
        onBlur={onBlur}
      />
      {required && touched && <ErrorMessage error={error_message as string}/>}
    </>
  )
}
