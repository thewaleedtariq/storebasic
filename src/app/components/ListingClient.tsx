"use client"

import { useState, useRef, useCallback } from "react"
import { FilterSidebar } from "../listing/components/FilterSidebar"
import { ProductCard } from "../listing/components/ProductCard"
import { QuickViewModal } from "../listing/components/QuickViewModal"
import { ActiveFilters } from "../listing/components/ActiveFilters"
import { SortOptions } from "../listing/components/SortOptions"
import { useVirtualizer } from "@tanstack/react-virtual"
import type { VirtualItem } from "@tanstack/react-virtual"

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

interface ListingClientProps {
    initialProducts: Product[]
    availableSizes: string[]
    availableColors: string[]
}

export default function ListingClient({ initialProducts, availableSizes, availableColors }: ListingClientProps) {
    const [showFilters, setShowFilters] = useState(false)
    const [sortOption, setSortOption] = useState<string>("default")
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
    const [selectedSize, setSelectedSize] = useState<string>("")
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [imageLoadErrors, setImageLoadErrors] = useState<{ [key: string]: boolean }>({})
    const [openFilters, setOpenFilters] = useState<{ price: boolean; size: boolean; color: boolean }>({
        price: false,
        size: false,
        color: false,
    })

    // Virtualization setup
    const parentRef = useRef<HTMLDivElement>(null)

    // Price ranges for filtering
    const priceRanges = [
        { label: "3000-5000", min: 3000, max: 5000 },
        { label: "5001-8000", min: 5001, max: 8000 },
        { label: "8001-12000", min: 8001, max: 12000 },
        { label: "Above 12001", min: 12001, max: Number.POSITIVE_INFINITY },
    ]

    const getBestImageUrl = useCallback((image: Product["images"][0]) => {
        const { formats, url } = image
        return formats?.large?.url || formats?.medium?.url || formats?.small?.url || formats?.thumbnail?.url || url
    }, [])

    const toggleSize = (size: string) => {
        setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
    }

    const togglePriceRange = (range: string) => {
        setSelectedPriceRanges((prev) => (prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]))
    }

    const toggleFilter = (filterType: "price" | "size" | "color") => {
        setOpenFilters((prev) => ({
            ...prev,
            [filterType]: !prev[filterType],
        }))
    }

    const toggleColor = (color: string) => {
        setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
    }

    const handleImageError = (productId: number, imageIndex: number) => {
        const key = `${productId}-${imageIndex}`
        setImageLoadErrors((prev) => ({ ...prev, [key]: true }))
    }

    const filteredProducts = initialProducts.filter((product) => {
        // Price filter
        let priceMatch = true
        if (selectedPriceRanges.length > 0) {
            priceMatch = selectedPriceRanges.some((rangeLabel) => {
                const range = priceRanges.find((r) => r.label === rangeLabel)
                if (!range) return false
                return product.price >= range.min && product.price <= range.max
            })
        }

        // Size filter
        let sizeMatch = true
        if (selectedSizes.length > 0) {
            sizeMatch = product.size.some((size) => selectedSizes.includes(size.sizess))
        }

        // Color filter
        let colorMatch = true
        if (selectedColors.length > 0) {
            colorMatch = product.color ? selectedColors.includes(product.color) : false
        }

        return priceMatch && sizeMatch && colorMatch
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "price-asc":
                return a.price - b.price
            case "price-desc":
                return b.price - a.price
            case "title-asc":
                return a.title.localeCompare(b.title)
            case "title-desc":
                return b.title.localeCompare(a.title)
            default:
                return 0
        }
    })

    const rowVirtualizer = useVirtualizer({
        count: Math.ceil(sortedProducts.length / 4), // 4 items per row
        getScrollElement: () => parentRef.current,
        estimateSize: () => 400, // Estimated height of each row
        overscan: 2, // Number of items to render outside of the visible area
    })

    const openQuickView = (product: Product) => {
        setQuickViewProduct(product)
        setSelectedSize("")
    }

    const closeQuickView = () => {
        setQuickViewProduct(null)
        setSelectedSize("")
    }

    const clearAllFilters = () => {
        setSelectedPriceRanges([])
        setSelectedSizes([])
        setSelectedColors([])
    }

    return (
        <div className="mx-auto px-3 md:px-4 py-4 md:py-8">
            <div className="flex gap-4 md:gap-8">
                {/* Filter Sidebar */}
                <FilterSidebar
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    openFilters={openFilters}
                    toggleFilter={toggleFilter}
                    priceRanges={priceRanges}
                    selectedPriceRanges={selectedPriceRanges}
                    togglePriceRange={togglePriceRange}
                    availableSizes={availableSizes}
                    selectedSizes={selectedSizes}
                    toggleSize={toggleSize}
                    availableColors={availableColors}
                    selectedColors={selectedColors}
                    toggleColor={toggleColor}
                />

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Active Filters */}
                    <ActiveFilters
                        selectedPriceRanges={selectedPriceRanges}
                        selectedSizes={selectedSizes}
                        selectedColors={selectedColors}
                        togglePriceRange={togglePriceRange}
                        toggleSize={toggleSize}
                        toggleColor={toggleColor}
                        clearAllFilters={clearAllFilters}
                    />

                    {/* Sort Options */}
                    <SortOptions sortOption={sortOption} setSortOption={setSortOption} totalProducts={sortedProducts.length} />

                    {/* Products Grid */}
                    {sortedProducts.length === 0 ? (
                        <div className="min-h-[400px] text-center py-12 flex flex-col justify-center">
                            <p className="text-neutral-600 text-base md:text-lg">No products found matching your criteria.</p>
                            <button
                                onClick={clearAllFilters}
                                className="mt-4 px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors mx-auto"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <div
                            ref={parentRef}
                            className="overflow-auto"
                            style={{
                                height: "calc(100vh - 200px)", // Adjust based on your header and filter heights
                                width: "100%",
                            }}
                        >
                            <div
                                style={{
                                    height: `${rowVirtualizer.getTotalSize()}px`,
                                    width: "100%",
                                    position: "relative",
                                }}
                            >
                                {rowVirtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
                                    const startIndex = virtualRow.index * 4
                                    const rowProducts = sortedProducts.slice(startIndex, startIndex + 4)

                                    return (
                                        <div
                                            key={virtualRow.index}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: `${virtualRow.size}px`,
                                                transform: `translateY(${virtualRow.start}px)`,
                                            }}
                                        >
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-0 h-full">
                                                {rowProducts.map((product, index) => (
                                                    <div key={product.id} className="h-full">
                                                        <ProductCard
                                                            product={product}
                                                            index={startIndex + index}
                                                            hoveredProduct={hoveredProduct}
                                                            setHoveredProduct={setHoveredProduct}
                                                            openQuickView={openQuickView}
                                                            imageLoadErrors={imageLoadErrors}
                                                            handleImageError={handleImageError}
                                                            getBestImageUrl={getBestImageUrl}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick View Modal */}
            <QuickViewModal
                product={quickViewProduct}
                closeQuickView={closeQuickView}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                getBestImageUrl={getBestImageUrl}
            />
        </div>
    )
}
