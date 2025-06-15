export interface Size {
    id: number;
    sizess: string;
}

export interface Product {
    id: number;
    slug: string;
    title: string;
    price: number;
    description: { type: string; children: { text: string }[] }[];
    category: { id: number; name: string };
    images: {
        url: string;
        formats: {
            thumbnail?: { url: string };
            small?: { url: string };
            medium?: { url: string };
            large?: { url: string };
        };
    }[];
    size: Size[];
    color?: string;
}
