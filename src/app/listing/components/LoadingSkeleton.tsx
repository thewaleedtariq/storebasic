// Define consistent height for grid
const GRID_SKELETON_HEIGHT = 'min-h-[400px]';

export const LoadingSkeleton = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Skeleton */}
            <div className="text-center py-6 md:py-8 border-b border-gray-100">
                <div className="h-6 md:h-8 w-16 md:w-24 bg-gray-200 animate-pulse mx-auto rounded"></div>
            </div>

            <div className="mx-auto px-3 md:px-4 py-4 md:py-8">
                <div className="flex gap-4 md:gap-8">
                    {/* Sidebar Skeleton - Hidden on mobile */}
                    <div className="hidden lg:block w-48 xl:w-64 flex-shrink-0">
                        <div className="space-y-4">
                            <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                    </div>

                    {/* Products Grid Skeleton with consistent height */}
                    <div className="flex-1">
                        {/* Reserve space for filters and sort bar */}
                        <div className="mb-4 md:mb-6">
                            <div className="h-8 bg-gray-100 rounded mb-4"></div>
                            <div className="flex justify-between items-center">
                                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        </div>

                        <div className={`${GRID_SKELETON_HEIGHT} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-0`}>
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="border-r border-b border-gray-100">
                                    <div className="aspect-square bg-gray-200 animate-pulse"></div>
                                    <div className="p-2 sm:p-3 md:p-4 space-y-2">
                                        <div className="h-3 md:h-4 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-3 md:h-4 bg-gray-200 animate-pulse rounded w-1/2 mx-auto"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
