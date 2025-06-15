"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Carousel } from "react-responsive-carousel"
import type { ProductDetail } from "../../types/product"
import { getBestImageUrl } from "../../utils/productUtils"
import "react-responsive-carousel/lib/styles/carousel.min.css"

interface ProductImageCarouselProps {
  images: ProductDetail["images"]
}

export default function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({})
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }))
  }

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % images.length
    if (!loadedImages[nextIndex]) {
      const img = new window.Image()
      img.src = getBestImageUrl(images[nextIndex])
    }
  }, [currentSlide, images, loadedImages])

  return (
    <div className="bg-white p-6">
      <div className="w-full" style={{ height: "500px" }}>
        <Carousel
          showThumbs={true}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          emulateTouch
          showArrows={true}
          className="h-full"
          thumbWidth={80}
          onChange={(index: number) => setCurrentSlide(index)}
          renderThumbs={() =>
            images.map((img, index) => (
              <div key={index} className="relative w-20 h-20">
                <Image
                  src={getBestImageUrl(img) || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  onLoad={() => handleImageLoad(index)}
                  priority={index === 0}
                  quality={75}
                />
              </div>
            ))
          }
        >
          {images.map((img, index) => (
            <div key={index} className="h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                {!loadedImages[index] && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                <Image
                  src={getBestImageUrl(img) || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-contain transition-opacity duration-300 ${loadedImages[index] ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => handleImageLoad(index)}
                  priority={index === 0}
                  quality={85}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <style jsx global>{`
                .carousel {
                    height: 100%;
                }
                .carousel .slider-wrapper {
                    height: 100%;
                }
                .carousel .slider {
                    height: 100%;
                }
                .carousel .slide {
                    height: 100%;
                    background: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .carousel .slide > div {
                    height: 100%;
                    width: 100%;
                }
                .carousel .thumbs-wrapper {
                    margin: 10px 0 0;
                }
                .carousel .thumb {
                    border: 2px solid transparent;
                    padding: 0;
                    margin: 0 4px;
                    cursor: pointer;
                }
                .carousel .thumb.selected {
                    border-color: #000;
                }
                .carousel .thumb:hover {
                    border-color: #666;
                }
            `}</style>
    </div>
  )
}
