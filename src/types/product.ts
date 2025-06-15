export interface Size {
    id: number;
    sizess: string;
}

export interface ProductDetail {
    id: number;
    slug: string;
    title: string;
    price: number;
    originalPrice?: number;
    description: { type: string; children: { text: string }[] }[];
    images: {
        url: string;
        formats: {
            thumbnail?: { url: string };
            small?: { url: string };
            medium?: { url: string };
            large?: { url: string };
        };
    }[];
    category: {
        id: number;
        name: string;
    };
    size: Size[];
}
