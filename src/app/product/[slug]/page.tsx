import { notFound } from "next/navigation"
import type { ProductDetail } from "../../../types/product"
import ProductDetailClient from "./ProductDetailClient"

async function fetchProduct(slug: string): Promise<ProductDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?filters[slug][$eq]=${slug}&fields[0]=id&fields[1]=slug&fields[2]=title&fields[3]=price&fields[4]=description&populate[0]=images&populate[1]=category&populate[2]=size`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    )
    if (!res.ok) throw new Error("Failed to fetch product")
    const data = await res.json()

    if (!data.data || data.data.length === 0) {
      return null
    }
    return data.data[0]
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params
  const product = await fetchProduct(resolvedParams.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}