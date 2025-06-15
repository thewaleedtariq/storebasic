"use client"
import { useEffect, useState } from "react"
import Slider from "react-slick"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface BannerImage {
  id: number
  url: string
  width: number
  height: number
  alternativeText?: string
}

interface ClientSliderProps {
  banners: BannerImage[]
}

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute z-10 right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer hover:bg-black hover:bg-opacity-10 transition-colors duration-200"
    onClick={onClick}
    role="button"
    aria-label="Next slide"
  >
    <FaChevronRight className="text-white text-sm sm:text-lg drop-shadow-lg" />
  </div>
)

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute z-10 left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer hover:bg-black hover:bg-opacity-10 transition-colors duration-200"
    onClick={onClick}
    role="button"
    aria-label="Previous slide"
  >
    <FaChevronLeft className="text-white text-sm sm:text-lg drop-shadow-lg" />
  </div>
)

export default function ClientSlider({ banners }: ClientSliderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const sliderSettings = {
    dots: true,
    infinite: banners.length > 1,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: banners.length > 1,
    autoplaySpeed: 4000,
    arrows: true,
    fade: true,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  }

  // Show first banner immediately while client loads
  if (!isClient) {
    return (
      <div className="relative w-full h-full">
        <img
          src={banners[0]?.url || "/placeholder.svg"}
          alt={banners[0]?.alternativeText || "Banner"}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <Slider {...sliderSettings}>
      {banners.map((banner, index) => (
        <div key={banner.id} className="relative w-full h-full">
          <img
            src={banner.url || "/placeholder.svg"}
            alt={banner.alternativeText || `Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Slider>
  )
}
