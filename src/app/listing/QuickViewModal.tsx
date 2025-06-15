'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from './types';
import { useState } from 'react';

interface QuickViewModalProps {
    product: Product;
    selectedSize: string;
    setSelectedSize: (size: string) => void;
    onClose: () => void;
    getBestImageUrl: (image: Product['images'][0]) => string;
}

const OptimizedImage = ({
    src,
    alt,
    className,
    onError,
    priority = false,
    sizes = "(max-width: 768px) 100vw, 50vw"
}: {
    src: string;
    alt: string;
    className: string;
    onError?: () => void;
    priority?: boolean;
    sizes?: string;
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    if (hasError) {
        return (
            <div className={`${className} bg-gray-100 flex items-center justify-center`}>
                <div className="text-gray-400 text-sm">Image not available</div>
            </div>
        );
    }

    return (
        <div className={`${className} relative overflow-hidden`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className={`object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                onLoad={handleLoad}
                onError={handleError}
                quality={85}
            />
        </div>
    );
};

export default function QuickViewModal({
    product,
    selectedSize,
    setSelectedSize,
    onClose,
    getBestImageUrl
}: QuickViewModalProps) {
    return (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-3 md:p-4">
            <div className="bg-white max-w-xs sm:max-w-sm md:max-w-md w-full shadow-2xl relative rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 md:top-4 right-3 md:right-4 text-gray-500 hover:text-gray-700 z-10 w-6 h-6 flex items-center justify-center text-lg md:text-xl"
                >
                    ×
                </button>

                <div className="p-3 md:p-4">
                    {/* Product Title */}
                    <h2 className="text-center text-sm md:text-base font-medium text-gray-900 mb-3 md:mb-4 pr-8">{product.title}</h2>

                    {/* Product Image */}
                    <div className="aspect-square overflow-hidden mb-3 md:mb-4 bg-gray-50 relative">
                        <OptimizedImage
                            src={getBestImageUrl(product.images[0])}
                            alt={product.title}
                            className="w-full h-full"
                            priority={true}
                            sizes="(max-width: 768px) 100vw, 50vw"
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
                                        ? 'border-black bg-black text-white'
                                        : 'border-gray-300 hover:border-black'
                                        }`}
                                >
                                    {size.sizess.replace('s', '')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-3 md:mb-4">
                        <span className="text-sm font-medium text-gray-900">
                            Price: {product.price.toLocaleString()}PKR
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                        <button
                            className="w-full bg-orange-400 text-white py-2 md:py-3 text-xs md:text-sm font-medium hover:bg-orange-500 transition-colors opacity-50"
                            disabled={!selectedSize}
                        >
                            ADD TO CART
                        </button>
                        <Link
                            href={`/product/${product.slug}`}
                            className="w-full block"
                        >
                            <button
                                className="w-full bg-orange-400 text-white py-2 md:py-3 text-xs md:text-sm font-medium hover:bg-orange-500 transition-colors opacity-50"
                            >
                                VIEW FULL DETAILS
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
