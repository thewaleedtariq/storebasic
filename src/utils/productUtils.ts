import { ProductDetail } from '@/types/product';

export function getDescriptionText(description: ProductDetail['description']) {
    if (!description || description.length === 0) return '';
    return description
        .filter(block => block.type === 'paragraph')
        .map(block => block.children.map(child => child.text).join(''))
        .join('\n');
}

export function getBestImageUrl(image: ProductDetail['images'][0]) {
    if (!image) return '';
    const { formats, url } = image;
    return (
        formats?.large?.url ||
        formats?.medium?.url ||
        formats?.small?.url ||
        formats?.thumbnail?.url ||
        url
    );
}
