"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface CartItem {
  id: number
  name: string
  size: string
  actualPrice: number
  discountPrice: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [tempQuantities, setTempQuantities] = useState<{ [key: string]: number }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Load cart data from sessionStorage and localStorage
  useEffect(() => {
    const loadCartData = () => {
      // First try sessionStorage, then fallback to localStorage
      let savedCart = sessionStorage.getItem("cart")
      if (!savedCart) {
        savedCart = localStorage.getItem("cart")
        // If found in localStorage, also save to sessionStorage
        if (savedCart) {
          sessionStorage.setItem("cart", savedCart)
        }
      }

      if (savedCart) {
        const cartData = JSON.parse(savedCart)
        setCartItems(cartData)
        // Initialize temp quantities with current quantities
        const tempQty: { [key: string]: number } = {}
        cartData.forEach((item: CartItem) => {
          tempQty[`${item.id}-${item.size}`] = item.quantity
        })
        setTempQuantities(tempQty)
      }
      setIsLoading(false)
    }

    loadCartData()
  }, [])

  const [selectedCity, setSelectedCity] = useState("")

  // Save cart to both sessionStorage and localStorage
  const saveCart = (items: CartItem[]) => {
    const cartData = JSON.stringify(items)
    sessionStorage.setItem("cart", cartData)
    localStorage.setItem("cart", cartData)
  }

  // Update the removeItem function
  const removeItem = (id: number, size: string) => {
    const updatedItems = cartItems.filter((item) => !(item.id === id && item.size === size))
    setCartItems(updatedItems)
    saveCart(updatedItems)

    // Also remove from temp quantities
    const newTempQuantities = { ...tempQuantities }
    delete newTempQuantities[`${id}-${size}`]
    setTempQuantities(newTempQuantities)
  }

  const updateCart = () => {
    const updatedItems = cartItems.map((item) => {
      const key = `${item.id}-${item.size}`
      return {
        ...item,
        quantity: tempQuantities[key] || item.quantity,
      }
    })
    setCartItems(updatedItems)
    saveCart(updatedItems)
  }

  const clearCart = () => {
    setCartItems([])
    setTempQuantities({})
    sessionStorage.removeItem("cart")
    localStorage.removeItem("cart")
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0)
  const installmentAmount = Math.round(subtotal / 3)

  const handleCheckout = () => {
    if (!selectedCity) {
      alert("Please select your city before proceeding to checkout")
      return
    }

    setIsCheckingOut(true)

    // Save cart and city data for checkout
    const checkoutData = {
      items: cartItems,
      selectedCity: selectedCity,
      subtotal: subtotal,
    }

    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData))

    // Navigate to checkout page
    window.location.href = "/checkout"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-gray-900">
              HOME
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">YOUR CART</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started</p>
            <Link href="/" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            {/* Cart Title and Item Count */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl text-gray-900">YOUR CART</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </span>
                <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-800 underline">
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Table */}
            <div className="bg-white">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 py-4 border-b border-gray-200 text-sm font-medium text-gray-700">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-gray-200 items-center"
                >
                  {/* Product Column */}
                  <div className="col-span-6 flex items-start space-x-4">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>
                      <div className="text-sm text-gray-900 mb-1">
                        Actual Price: Rs. {item.actualPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-red-600 mb-3">
                        Discount price: Rs. {item.discountPrice.toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="border border-gray-300 px-4 py-1 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>

                  {/* Price Column */}
                  <div className="col-span-2 text-center">
                    <span className="text-sm text-gray-900">Rs. {item.discountPrice.toLocaleString()}</span>
                  </div>

                  {/* Quantity Column */}
                  <div className="col-span-2 text-center">
                    <input
                      type="number"
                      min="1"
                      value={tempQuantities[`${item.id}-${item.size}`] || item.quantity}
                      onChange={(e) => {
                        const key = `${item.id}-${item.size}`
                        setTempQuantities((prev) => ({
                          ...prev,
                          [key]: Number.parseInt(e.target.value) || 1,
                        }))
                      }}
                      className="w-16 px-2 py-1 border border-gray-300 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Total Column */}
                  <div className="col-span-2 text-center">
                    <span className="text-sm font-medium text-gray-900">
                      Rs. {(item.discountPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* City Selection and Subtotal */}
            <div className="mt-8 flex justify-between items-center">
              <div className="w-64">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Your City *</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className={`w-full px-3 py-2 border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${!selectedCity ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  required
                >
                  <option value="">Select Your City</option>
                  <option value="karachi">Karachi</option>
                  <option value="lahore">Lahore</option>
                  <option value="islamabad">Islamabad</option>
                  <option value="rawalpindi">Rawalpindi</option>
                </select>
                {!selectedCity && <p className="text-red-500 text-xs mt-1">City selection is required for checkout</p>}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">SUBTOTAL</div>
                <div className="text-xl font-medium text-gray-900">Rs. {subtotal.toLocaleString()}</div>
              </div>
            </div>

            {/* Badmay Payment Option */}
            <div className="mt-6 flex justify-end">
              <div className="bg-purple-600 text-white px-4 py-2 rounded-md">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold bg-white text-purple-600 px-2 py-1 text-xs rounded">baadmay</span>
                </div>
                <div className="text-sm">Pay in 3 Installments of Rs. {installmentAmount.toLocaleString()}</div>
              </div>
            </div>

            {/* Shipping Note */}
            <div className="mt-4 text-right">
              <p className="text-sm text-blue-600 italic">Shipping & taxes calculated at checkout</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={updateCart}
                className="bg-orange-300 text-white px-6 py-2 text-sm font-medium hover:bg-orange-400 transition-colors"
              >
                UPDATE CART
              </button>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="bg-orange-300 text-white px-6 py-2 text-sm font-medium hover:bg-orange-400 transition-colors disabled:opacity-50"
              >
                {isCheckingOut ? "PROCESSING..." : "CHECK OUT"}
              </button>
              <Link href="/">
                <button className="bg-orange-300 text-white px-6 py-2 text-sm font-medium hover:bg-orange-400 transition-colors">
                  CONTINUE SHOPPING
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
