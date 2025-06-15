"use client"

import Link from "next/link"
import type { ProductDetail } from "../../../types/product"
import { getDescriptionText } from "../../../utils/productUtils"
import ProductImageCarousel from "../../../components/product/ProductImageCarousel"
import ProductActions from "../../../components/product/ProductActions"
import ProductInformation from "../../../components/product/ProductInformation"

interface ProductDetailClientProps {
    product: ProductDetail
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    return (
        <div className="flex-1 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-gray">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <nav className="text-sm text-gray-600">
                        <Link href="/" className="hover:text-gray-900 cursor-pointer">
                            HOME
                        </Link>
                        <span className="mx-2">›</span>
                        <Link href="/listing" className="hover:text-gray-900 cursor-pointer">
                            {product.category?.name}
                        </Link>
                        <span className="mx-2">›</span>
                        <span className="text-gray-900 font-medium">{product.title}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left - Image Carousel */}
                    <div className="animate-fadeIn">
                        <ProductImageCarousel images={product.images} />
                    </div>

                    {/* Right - Product Details */}
                    <div className="bg-white p-6 space-y-6 animate-fadeIn">
                        <div>
                            <h1 className="text-3xl text-gray-900 mb-4">{product.title}</h1>

                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-2xl text-gray-900">Rs. {product.price.toLocaleString()}</span>
                                {product.originalPrice && (
                                    <span className="text-lg text-gray-500 line-through">
                                        Rs. {product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Badmay Payment Option */}
                            <div className="bg-purple-600 text-white px-4 py-2 inline-flex items-center gap-2 text-sm mb-6 rounded-lg">
                                <span className="font-bold bg-white text-purple-600 px-2 py-1 text-xs rounded-md">badmay</span>
                                <span>Pay in 3 installments of Rs. {Math.round(product.price / 3).toLocaleString()}</span>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-6">{getDescriptionText(product.description)}</p>
                        </div>

                        <ProductActions product={product} />
                        <ProductInformation />
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
        </div>
    )
} 