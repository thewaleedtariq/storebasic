"use client"

import { useState } from "react"
import Image from "next/image"
import { useKeenSlider, type KeenSliderPlugin } from "keen-slider/react"
import type { ProductDetail } from "@/types/product"
import { getBestImageUrl } from "@/utils/productUtils"

interface ProductImageCarouselProps {
  images: ProductDetail["images"]
}

/* Auto-play plugin */
const AutoSlide: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout>
  let mouseOver = false
  function clearNextTimeout() {
    clearTimeout(timeout)
  }
  function nextTimeout() {
    clearTimeout(timeout)
    if (mouseOver) return
    timeout = setTimeout(() => {
      slider.next()
    }, 3000)
  }
  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true
      clearNextTimeout()
    })
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false
      nextTimeout()
    })
    nextTimeout()
  })
  slider.on("dragStarted", clearNextTimeout)
  slider.on("animationEnded", nextTimeout)
  slider.on("updated", nextTimeout)
}

export default function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged(s) {
        setCurrent(s.track.details.rel)
      },
      loop: true,
      mode: "snap",
    },
    [AutoSlide],
  )

  return (
    <div className="relative">
      {/* MAIN SLIDER */}
      <div ref={sliderRef} className="keen-slider aspect-square overflow-hidden">
        {images.map((img, idx) => (
          <div key={idx} className="keen-slider__slide flex items-center justify-center bg-white">
            <div className="relative w-full h-full">
              <Image
                src={getBestImageUrl(img) || "/placeholder.svg"}
                alt={`Product image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority={idx === 0}
                quality={85}
              />
            </div>
          </div>
        ))}
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-16 h-16 relative border-2 ${current === idx ? "border-black" : "border-transparent"}`}
              aria-label={`thumbnail ${idx + 1}`}
            >
              <Image
                src={getBestImageUrl(img) || "/placeholder.svg"}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
