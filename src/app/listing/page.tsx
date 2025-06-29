import { Suspense } from "react"
import ListingClient from "./components/ListingClient"

interface Size {
    id: number
    sizess: string
}

interface Product {
    id: number
    slug: string
    title: string
    price: number
    description: { type: string; children: { text: string }[] }[]
    category: { id: number; name: string }
    images: {
        url: string
        formats: {
            thumbnail?: { url: string }
            small?: { url: string }
            medium?: { url: string }
            large?: { url: string }
        }
    }[]
    size: Size[]
    color?: string
}

async function fetchCategoryName(categorySlug: string): Promise<string> {
    try {
        const categoryRes = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/categories?filters[slug][$eq]=${categorySlug}&fields[0]=name`,
        )
        if (categoryRes.ok) {
            const categoryData = await categoryRes.json()
            return categoryData?.data?.[0]?.name || ""
        }
        return ""
    } catch (error) {
        console.error("Error fetching category:", error)
        return ""
    }
}

async function fetchProducts(categorySlug?: string): Promise<Product[]> {
    try {
        let apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?fields[0]=id&fields[1]=slug&fields[2]=title&fields[3]=price&fields[4]=description&populate[0]=images&populate[1]=category&populate[2]=size`

        // Add category filter if categorySlug is provided
        if (categorySlug) {
            apiUrl += `&filters[category][slug][$eq]=${categorySlug}`
        }

        console.log("Fetching products with URL:", apiUrl) // Debug log

        const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        console.log("Fetched products data:", data) // Debug log

        // Process products to extract colors
        const processedProducts = data.data.map((product: Product) => {
            const colorMatch = product.title.split("-")[1]
            return {
                ...product,
                color: colorMatch ? colorMatch.trim() : undefined,
            }
        })

        console.log("Processed products:", processedProducts.length, "products for category:", categorySlug) // Debug log
        return processedProducts
    } catch (error) {
        console.error("Error fetching products:", error)
        return []
    }
}

// Generate static params for all possible category combinations
export async function generateStaticParams() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/categories?fields[0]=slug`)
        const data = await res.json()

        const params = [
            // Default listing page (no category)
            {},
        ]

        // Add category-specific pages
        if (data?.data) {
            data.data.forEach((category: { slug: string }) => {
                params.push({ category: category.slug })
            })
        }

        return params
    } catch (error) {
        console.error("Error generating static params:", error)
        return [{}]
    }
}

interface ListingPageProps {
    searchParams: Promise<{ category?: string }>
    params?: Promise<Record<string, string>>
}

export default async function ListingPage({ searchParams }: ListingPageProps) {
    // Await the searchParams Promise
    const resolvedSearchParams = await searchParams
    const categorySlug = resolvedSearchParams.category

    console.log("Category slug from URL:", categorySlug) // Debug log

    const [categoryName, products] = await Promise.all([
        categorySlug ? fetchCategoryName(categorySlug) : Promise.resolve(""),
        fetchProducts(categorySlug), // Make sure categorySlug is passed here
    ])

    console.log("Final products count:", products.length) // Debug log

    // Extract unique sizes and colors from all products
    const sizes = new Set<string>()
    const colors = new Set<string>()

    products.forEach((product) => {
        product.size.forEach((size) => {
            sizes.add(size.sizess)
        })
        if (product.color) {
            colors.add(product.color)
        }
    })

    const availableSizes = Array.from(sizes).sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
    const availableColors = Array.from(colors).sort()

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="text-center py-6 md:py-8 border-b border-gray-100">
                <h1 className="text-2xl md:text-3xl font-light text-gray-800 tracking-wide">
                    {categoryName ? categoryName.toUpperCase() : "ALL PRODUCTS"}
                </h1>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <ListingClient initialProducts={products} availableSizes={availableSizes} availableColors={availableColors} />
            </Suspense>
        </div>
    )
}
