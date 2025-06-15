"use client"

import Link from "next/link"
import { LazyImage } from "./components/LazyImage"

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
    if (!product) return null

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
                            className="w-full bg-gray-300 text-gray-500 py-2 md:py-3 text-xs md:text-sm font-medium cursor-not-allowed"
                            disabled
                        >
                            COMING SOON
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
