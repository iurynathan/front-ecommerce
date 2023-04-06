import { useState } from 'react'
import './App.css'
import Header from './modules/components/Header'
import { toast } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import ShoppingCart from './modules/pages/shopping-cart/shopping-cart'
import ProductList from './modules/pages/product-list/product-list'
import ProductDetails from './modules/pages/product-details/product-details'

export interface iProduct {
  _id: string
  name: string
  brand: string
  category: string
  description: string
  stock: number
  price: number
}

export interface ICartItem {
  id: string
  name: string
  price: number
  quantity: number
  stock: number
}

function App() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([])

  const addToCart = (product: any) => {
    setCartItems(prevItems => {
      const existingProductIndex = prevItems.findIndex(item => item.id === product.id)
      const currentQuantity = existingProductIndex >= 0 ? prevItems[existingProductIndex].quantity : 0
      const totalQuantity = currentQuantity + product.quantity

      if (totalQuantity > product.stock) {
        toast.error('Quantidade no carrinho não pode exceder o estoque')
        return prevItems
      }

      if (existingProductIndex >= 0) {
        const updatedItems = [...prevItems]
        updatedItems[existingProductIndex].quantity = totalQuantity
        return updatedItems
      }

      return [...prevItems, product]
    })
  }

  return (
    <div className="App">
      <Header cartItems={cartItems.length} />
      <main className="main-root">
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} />} />
          <Route path="/carrinho" element={<ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/product/:productId" element={<ProductDetails addToCart={addToCart} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
