import { memo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface Size {
    id: number;
    sizess: string;
}

interface Product {
    id: number;
    slug: string;
    title: string;
    price: number;
    description: { type: string; children: { text: string }[] }[];
    category: { id: number; name: string };
    images: {
        url: string;
        formats: {
            thumbnail?: { url: string };
            small?: { url: string };
            medium?: { url: string };
            large?: { url: string };
        };
    }[];
    size: Size[];
    color?: string;
}

interface ProductCardProps {
    product: Product;
    index: number;
    hoveredProduct: number | null;
    setHoveredProduct: (id: number | null) => void;
    openQuickView: (product: Product) => void;
    imageLoadErrors: { [key: string]: boolean };
    handleImageError: (productId: number, imageIndex: number) => void;
    getBestImageUrl: (image: Product['images'][0]) => string;
}

const ProductCard = memo(({
    product,
    index,
    hoveredProduct,
    setHoveredProduct,
    openQuickView,
    imageLoadErrors,
    handleImageError,
    getBestImageUrl,
}: ProductCardProps) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldAnimate = !prefersReducedMotion;

    const handleMouseEnter = useCallback(() => {
        setHoveredProduct(product.id);
    }, [product.id, setHoveredProduct]);

    const handleMouseLeave = useCallback(() => {
        setHoveredProduct(null);
    }, [setHoveredProduct]);

    const handleQuickView = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        openQuickView(product);
    }, [product, openQuickView]);

    return (
        <motion.div
            key={product.id}
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
            transition={{ delay: shouldAnimate ? index * 0.05 : 0 }}
            className="group relative border-r border-b border-gray-100 overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={`/product/${product.slug}`}>
                {/* Product Image Container */}
                <div className="relative aspect-square overflow-hidden cursor-pointer bg-gray-100">
                    {/* First Image */}
                    <div className="relative w-full h-full">
                        <Image
                            src={getBestImageUrl(product.images[0])}
                            alt={product.title}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            className={`object-cover transition-opacity duration-300 ${hoveredProduct === product.id && product.images[1] && !imageLoadErrors[`${product.id}-1`]
                                    ? 'opacity-0'
                                    : 'opacity-100'
                                }`}
                            onError={() => handleImageError(product.id, 0)}
                            priority={index < 4}
                            quality={75}
                        />
                    </div>

                    {/* Second Image */}
                    {product.images[1] && !imageLoadErrors[`${product.id}-1`] && (
                        <div className="absolute inset-0">
                            <Image
                                src={getBestImageUrl(product.images[1])}
                                alt={product.title}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                className={`object-cover transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                                    }`}
                                onError={() => handleImageError(product.id, 1)}
                                quality={75}
                            />
                        </div>
                    )}
                </div>
            </Link>

            {/* Size Options and Quick View (on hover) - Hidden on mobile */}
            <div
                className={`hidden md:block absolute bottom-0 left-0 right-0 bg-white transition-transform duration-300 ease-in-out ${hoveredProduct === product.id ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                {/* Size Options */}
                <div className="flex justify-center gap-1 py-2 border-b">
                    {product.size.map((size) => (
                        <button
                            key={size.id}
                            className="w-6 h-6 lg:w-8 lg:h-8 text-xs border border-gray-300 hover:border-black transition-colors"
                        >
                            {size.sizess.replace('s', '')}
                        </button>
                    ))}
                </div>

                {/* Quick View Button */}
                <button
                    onClick={handleQuickView}
                    className="w-full py-2 lg:py-3 bg-black text-white text-xs lg:text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                    Quick View
                </button>
            </div>

            {/* Product Info */}
            <div className="p-2 sm:p-3 md:p-4 text-center">
                <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 md:mb-2 line-clamp-2">
                    {product.title}
                </h3>
                <div className="flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-medium text-gray-900">
                        Rs. {product.price.toLocaleString()}
                    </span>
                </div>

                {/* Mobile Quick View Button */}
                <button
                    onClick={handleQuickView}
                    className="md:hidden w-full mt-2 py-2 bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors"
                >
                    Quick View
                </button>
            </div>
        </motion.div>
    );
});

ProductCard.displayName = 'ProductCard';

export { ProductCard };
