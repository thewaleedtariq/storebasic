import Image from "next/image"
import Link from "next/link"
import ClientSlider from "./components/ClientSlider"

interface BannerImage {
  id: number
  url: string
  width: number
  height: number
  alternativeText?: string
}

interface CategoryImage {
  id: number
  url: string
  alternativeText?: string
}

interface CategoryApiResponse {
  id: number
  name: string
  slug: string
  image?: {
    id: number
    url: string
    alternativeText?: string
  }
}

interface Category {
  id: number
  name: string
  slug: string
  image?: CategoryImage
}

async function fetchBanners(): Promise<BannerImage[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/banners?populate[0]=bImage`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    if (!res.ok) throw new Error("Failed to fetch banners")

    const data = await res.json()
    return data?.data?.[0]?.bImage || []
  } catch (error) {
    console.error("Error fetching banners:", error)
    return []
  }
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/categories?fields[0]=id&fields[1]=name&fields[2]=slug&populate[0]=image`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    )
    if (!res.ok) throw new Error("Failed to fetch categories")

    const data = await res.json()
    if (data?.data) {
      return data.data.map((category: CategoryApiResponse) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        image: category.image
          ? {
            id: category.image.id,
            url: category.image.url,
            alternativeText: category.image.alternativeText,
          }
          : null,
      }))
    }
    return []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export default async function Home() {
  const [bannersData, categoriesData] = await Promise.all([fetchBanners(), fetchCategories()])

  return (
    <main className="w-full overflow-hidden">
      {/* Banner Section */}
      <section className="relative">
        {bannersData.length > 0 ? (
          <div className="w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[1900/600] xl:aspect-[1900/800]">
            <ClientSlider banners={bannersData} />
          </div>
        ) : (
          <div className="w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[1900/600] xl:aspect-[1900/800] bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500 text-sm sm:text-base">No banners available</p>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-6 lg:px-8 pb-8">
        {categoriesData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categoriesData.map((category) => (
              <article
                key={category.id}
                className="group relative overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <Link href={`/listing?category=${category.slug}`}>
                  {/* Category Name on top */}
                  <div className="bg-white p-3">
                    <h2 className="text-black text-lg sm:text-xl font-bold text-center">{category.name}</h2>
                  </div>

                  {/* Rectangular Image Container */}
                  <div className="aspect-[16/9] relative overflow-hidden">
                    {category.image?.url ? (
                      <Image
                        src={category.image.url || "/placeholder.svg"}
                        alt={category.image.alternativeText || category.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={category.id <= 3}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600"></div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg">No categories available</p>
          </div>
        )}
      </section>
    </main>
  )
}
