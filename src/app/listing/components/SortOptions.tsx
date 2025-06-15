interface SortOptionsProps {
    sortOption: string;
    setSortOption: (option: string) => void;
    totalProducts: number;
}

export const SortOptions = ({ sortOption, setSortOption, totalProducts }: SortOptionsProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
            <div className="text-xs md:text-sm text-gray-600 order-2 sm:order-1">
                {totalProducts} {totalProducts === 1 ? 'product' : 'products'} found
            </div>
            <div className="flex items-center gap-2 order-1 sm:order-2">
                <span className="text-xs md:text-sm text-gray-600">SORT:</span>
                <div className="relative">
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border border-gray-300 bg-white px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-gray-900 focus:outline-none uppercase appearance-none pr-6 md:pr-8"
                    >
                        <option value="default">FEATURED</option>
                        <option value="price-asc">PRICE: LOW → HIGH</option>
                        <option value="price-desc">PRICE: HIGH → LOW</option>
                        <option value="title-asc">TITLE: A–Z</option>
                        <option value="title-desc">TITLE: Z–A</option>
                    </select>
                    <div className="absolute inset-y-0 right-1 md:right-2 flex items-center pointer-events-none">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
