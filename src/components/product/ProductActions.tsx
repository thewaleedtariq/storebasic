"use client"

import { useState } from "react"
import type { ProductDetail } from "../../types/product"
import { getBestImageUrl } from "../../utils/productUtils"

interface ProductActionsProps {
  product: ProductDetail
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="space-y-6">
      {/* Size Chart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">SIZE CHART</h3>
        </div>

        {/* Size Image Preview */}
        <div className="w-16 h-16 bg-gray-100 border border-orange-400 p-2">
          <img
            src={getBestImageUrl(product.images[0]) || "/placeholder.svg"}
            alt="Size preview"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Category */}
        <div className="text-sm font-medium text-gray-900 uppercase">
          {product.title.includes("-") ? product.title.split("-")[1] : product.title}
        </div>

        {/* Size Selection */}
        {product.size && product.size.length > 0 && (
          <div className="grid grid-cols-7 gap-1">
            {product.size.map((sizeItem) => (
              <button
                key={sizeItem.id}
                onClick={() => setSelectedSize(sizeItem.sizess)}
                className={`w-9 h-9 border text-xs font-medium transition-all hover:border-gray-400 rounded-md
                                    ${selectedSize === sizeItem.sizess
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }
                                `}
              >
                {sizeItem.sizess.replace("s", "")}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quantity */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">QUANTITY</h3>
        <div className="flex items-center border border-gray-300 w-fit">
          <button onClick={decrementQuantity} className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            −
          </button>
          <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
          <button onClick={incrementQuantity} className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 pt-4">
        <button
          disabled
          className="w-full py-4 bg-gray-300 text-gray-500 font-medium text-sm uppercase tracking-wide cursor-not-allowed"
        >
          COMING SOON
        </button>

        <button
          disabled
          className="w-full py-4 bg-gray-300 text-gray-500 font-medium text-sm uppercase tracking-wide cursor-not-allowed"
        >
          COMING SOON
        </button>
      </div>
    </div>
  )
}
