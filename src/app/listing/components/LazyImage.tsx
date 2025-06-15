import { useEffect, useState, useRef } from 'react';

interface LazyImageProps {
    src: string;
    alt: string;
    className: string;
    onError?: () => void;
}

// Intersection Observer hook for lazy loading
const useIntersectionObserver = (ref: React.RefObject<Element | null>, options?: IntersectionObserverInit) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return isVisible;
};

export const LazyImage = ({ src, alt, className, onError }: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(imgRef, { threshold: 0.1 });

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    return (
        <div ref={imgRef} className={className}>
            {!isVisible ? (
                // Placeholder
                <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
            ) : hasError ? (
                // Error placeholder
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-400 text-sm">Image not available</div>
                </div>
            ) : (
                <>
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                        </div>
                    )}
                    <img
                        src={src}
                        alt={alt}
                        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                        onLoad={handleLoad}
                        onError={handleError}
                    />
                </>
            )}
        </div>
    );
};
