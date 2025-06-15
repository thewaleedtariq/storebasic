interface ActiveFiltersProps {
    selectedPriceRanges: string[];
    selectedSizes: string[];
    selectedColors: string[];
    togglePriceRange: (range: string) => void;
    toggleSize: (size: string) => void;
    toggleColor: (color: string) => void;
    clearAllFilters: () => void;
}

export const ActiveFilters = ({
    selectedPriceRanges,
    selectedSizes,
    selectedColors,
    togglePriceRange,
    toggleSize,
    toggleColor,
    clearAllFilters,
}: ActiveFiltersProps) => {
    if (selectedPriceRanges.length === 0 && selectedSizes.length === 0 && selectedColors.length === 0) {
        return null;
    }

    return (
        <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs md:text-sm font-medium text-gray-900">Active Filters:</h3>
                <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-600 hover:text-red-700 underline"
                >
                    Clear All
                </button>
            </div>
            <div className="flex flex-wrap gap-1 md:gap-2">
                {selectedPriceRanges.map((range) => (
                    <span key={range} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Rs. {range}
                        <button
                            onClick={() => togglePriceRange(range)}
                            className="ml-1 text-green-600 hover:text-green-800"
                        >
                            ×
                        </button>
                    </span>
                ))}
                {selectedSizes.map((size) => (
                    <span key={size} className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Size {size.replace('s', '')}
                        <button
                            onClick={() => toggleSize(size)}
                            className="ml-1 text-purple-600 hover:text-purple-800"
                        >
                            ×
                        </button>
                    </span>
                ))}
                {selectedColors.map((color) => (
                    <span key={color} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {color.toLowerCase()}
                        <button
                            onClick={() => toggleColor(color)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};
