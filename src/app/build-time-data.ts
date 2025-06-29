// This file helps with build-time data fetching for SSG
export interface BuildTimeData {
  categories: Array<{ id: number; name: string; slug: string }>
  products: Array<{ id: number; slug: string; title: string }>
}

export async function getBuildTimeData(): Promise<BuildTimeData> {
  try {
    const [categoriesRes, productsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/categories?fields[0]=id&fields[1]=name&fields[2]=slug`),
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?fields[0]=id&fields[1]=slug&fields[2]=title`),
    ])

    const [categoriesData, productsData] = await Promise.all([categoriesRes.json(), productsRes.json()])

    return {
      categories: categoriesData.data || [],
      products: productsData.data || [],
    }
  } catch (error) {
    console.error("Error fetching build-time data:", error)
    return {
      categories: [],
      products: [],
    }
  }
}
