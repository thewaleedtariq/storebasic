export default function ProductDetailSkeleton() {
    return (
        <div className="flex-1 min-h-screen">
            {/* Breadcrumb Skeleton */}
            <div className="bg-white border-gray">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left - Image Carousel Skeleton */}
                    <div className="bg-white p-6">
                        <div className="w-full" style={{ height: '500px' }}>
                            <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
                        </div>
                        {/* Thumbnails Skeleton */}
                        <div className="flex gap-2 mt-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-20 h-20 bg-gray-200 animate-pulse rounded"></div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Product Details Skeleton */}
                    <div className="bg-white p-6 space-y-6">
                        {/* Title Skeleton */}
                        <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded mb-4"></div>

                        {/* Price Skeleton */}
                        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-4"></div>

                        {/* Badmay Payment Option Skeleton */}
                        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mb-6"></div>

                        {/* Description Skeleton */}
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-4 w-4/6 bg-gray-200 animate-pulse rounded"></div>
                        </div>

                        {/* Size Selection Skeleton */}
                        <div className="mt-6">
                            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-3"></div>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Button Skeleton */}
                        <div className="h-12 w-full bg-gray-200 animate-pulse rounded mt-6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
