"use client"

import Link from "next/link"
import { LazyImage } from "./LazyImage"
import { useRouter } from "next/navigation"

interface Size {
  id: number
  sizess: string
}

interface Product {
  id: number
  slug: string
  title: string
  price: number
  description: { type: string; children: { text: string }[] }[]
  category: { id: number; name: string }
  images: {
    url: string
    formats: {
      thumbnail?: { url: string }
      small?: { url: string }
      medium?: { url: string }
      large?: { url: string }
    }
  }[]
  size: Size[]
  color?: string
}

interface CartItem {
  id: number
  name: string
  size: string
  actualPrice: number
  discountPrice: number
  quantity: number
  image: string
}

interface QuickViewModalProps {
  product: Product | null
  closeQuickView: () => void
  selectedSize: string
  setSelectedSize: (size: string) => void
  getBestImageUrl: (image: Product["images"][0]) => string
}

export const QuickViewModal = ({
  product,
  closeQuickView,
  selectedSize,
  setSelectedSize,
  getBestImageUrl,
}: QuickViewModalProps) => {
  const router = useRouter()

  if (!product) return null

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first")
      return
    }

    try {
      const cartItem: CartItem = {
        id: product.id,
        name: product.title,
        size: selectedSize,
        actualPrice: product.price,
        discountPrice: product.price,
        quantity: 1,
        image: getBestImageUrl(product.images[0]) || "/placeholder.svg",
      }

      // Get existing cart from sessionStorage
      const existingCart = JSON.parse(sessionStorage.getItem("cart") || "[]") as CartItem[]

      // Check if item with same id and size already exists
      const existingItemIndex = existingCart.findIndex(
        (item) => item.id === cartItem.id && item.size === cartItem.size
      )

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        existingCart[existingItemIndex].quantity += 1
      } else {
        // Add new item to cart
        existingCart.push(cartItem)
      }

      // Save to sessionStorage and localStorage
      sessionStorage.setItem("cart", JSON.stringify(existingCart))
      localStorage.setItem("cart", JSON.stringify(existingCart))

      // Close modal and navigate to cart
      closeQuickView()
      router.push("/cart")
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add item to cart. Please try again.")
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-3 md:p-4">
      <div className="bg-white max-w-xs sm:max-w-sm md:max-w-md w-full shadow-2xl relative rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-3 md:top-4 right-3 md:right-4 text-gray-500 hover:text-gray-700 z-10 w-6 h-6 flex items-center justify-center text-lg md:text-xl"
        >
          ×
        </button>

        <div className="p-3 md:p-4">
          {/* Product Title */}
          <h2 className="text-center text-sm md:text-base font-medium text-gray-900 mb-3 md:mb-4 pr-8">
            {product.title}
          </h2>

          {/* Product Image */}
          <div className="aspect-square overflow-hidden mb-3 md:mb-4 bg-gray-50 relative">
            <LazyImage
              src={getBestImageUrl(product.images[0])}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Size Selection */}
          <div className="mb-3 md:mb-4">
            <h3 className="text-xs font-medium text-gray-900 mb-2">SIZES:</h3>
            <div className="flex gap-1 flex-wrap">
              {product.size.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.sizess)}
                  className={`w-7 h-7 md:w-8 md:h-8 border text-xs font-medium transition-colors ${selectedSize === size.sizess
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                    }`}
                >
                  {size.sizess.replace("s", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="text-center mb-3 md:mb-4">
            <span className="text-sm font-medium text-gray-900">Price: {product.price.toLocaleString()}PKR</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={addToCart}
              className={`w-full py-2 md:py-3 text-xs md:text-sm font-medium transition-colors ${!selectedSize
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-400 text-white hover:bg-orange-500"
                }`}
              disabled={!selectedSize}
            >
              {!selectedSize ? "SELECT SIZE FIRST" : "ADD TO CART"}
            </button>
            <Link href={`/product/${product.slug}`} className="w-full block">
              <button className="w-full bg-orange-400 text-white py-2 md:py-3 text-xs md:text-sm font-medium hover:bg-orange-500 transition-colors opacity-50">
                VIEW FULL DETAILS
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
