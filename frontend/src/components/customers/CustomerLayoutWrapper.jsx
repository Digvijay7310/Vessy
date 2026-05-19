import React from 'react'
import { CartProvider } from '../../context/CartContext'

export default function CustomerLayoutWrapper({children}) {
  return <CartProvider>{children}</CartProvider>
}
