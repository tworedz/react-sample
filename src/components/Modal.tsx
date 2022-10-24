import React, {useState} from 'react'

interface ModelProps {
  title: string
  children: React.ReactNode
  onClose: () => void
}

export function Modal({title, children, onClose}: ModelProps) {
  return (
    <>
      <div
        className="fixed bg-black/50 top-0 right-0 left-0 bottom-0 mx-auto" onClick={onClose}
      />

      <div
        className="w-[500px] p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2"
      >
        <h1 className="text-2xl text-center mb-2">{title}</h1>
        {children}
      </div>
    </>
  )
}
