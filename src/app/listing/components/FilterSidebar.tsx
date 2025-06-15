import { useRef } from 'react';

interface FilterSidebarProps {
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    openFilters: {
        price: boolean;
        size: boolean;
        color: boolean;
    };
    toggleFilter: (filterType: 'price' | 'size' | 'color') => void;
    priceRanges: { label: string; min: number; max: number }[];
    selectedPriceRanges: string[];
    togglePriceRange: (range: string) => void;
    availableSizes: string[];
    selectedSizes: string[];
    toggleSize: (size: string) => void;
    availableColors: string[];
    selectedColors: string[];
    toggleColor: (color: string) => void;
}

export const FilterSidebar = ({
    showFilters,
    setShowFilters,
    openFilters,
    toggleFilter,
    priceRanges,
    selectedPriceRanges,
    togglePriceRange,
    availableSizes,
    selectedSizes,
    toggleSize,
    availableColors,
    selectedColors,
    toggleColor,
}: FilterSidebarProps) => {
    const filterRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-4 left-4 z-40">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-black text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    FILTER
                </button>
            </div>

            {/* Left Sidebar - Filters */}
            <div
                className={`${showFilters ? 'fixed inset-0 z-30 bg-white overflow-y-auto' : 'hidden'
                    } lg:block lg:static lg:w-48 xl:w-64 lg:flex-shrink-0`}
            >
                {/* Mobile Filter Header */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium">Filters</h2>
                    <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div ref={filterRef} className="p-4 lg:p-0 space-y-4">
                    {/* Price Filter */}
                    <div className="border-b border-gray-200 pb-3">
                        <button
                            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                            onClick={() => toggleFilter('price')}
                        >
                            <span>Price</span>
                            <span className="text-xl">{openFilters.price ? '−' : '+'}</span>
                        </button>
                        {openFilters.price && (
                            <div className="space-y-2">
                                {priceRanges.map((range) => (
                                    <label key={range.label} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedPriceRanges.includes(range.label)}
                                            onChange={() => togglePriceRange(range.label)}
                                        />
                                        <span className="text-sm text-gray-700">{range.label}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Size Filter */}
                    <div className="border-b border-gray-200 pb-3">
                        <button
                            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                            onClick={() => toggleFilter('size')}
                        >
                            <span>Size</span>
                            <span className="text-xl">{openFilters.size ? '−' : '+'}</span>
                        </button>
                        {openFilters.size && (
                            <div className="space-y-2">
                                {availableSizes.map((size) => (
                                    <label key={size} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedSizes.includes(size)}
                                            onChange={() => toggleSize(size)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">{size.replace('s', '')}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Color Filter */}
                    <div className="border-b border-gray-200 pb-3">
                        <button
                            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                            onClick={() => toggleFilter('color')}
                        >
                            <span>Color</span>
                            <span className="text-xl">{openFilters.color ? '−' : '+'}</span>
                        </button>
                        {openFilters.color && (
                            <div className="space-y-2">
                                {availableColors.map((color) => (
                                    <label key={color} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedColors.includes(color)}
                                            onChange={() => toggleColor(color)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700 capitalize">{color.toLowerCase()}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            {showFilters && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-20"
                    onClick={() => setShowFilters(false)}
                />
            )}
        </>
    );
};
