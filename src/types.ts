/**
 * types.ts
 * 
 * Declarations of types for product option objects from API response.
 * Might need to be altered considering the internationalization
 * extention mentioned in the task description.
 */

export interface ProductOption {
    productVariant: string;
    productColour: string;
    productPrice: number;
    inStock: boolean;
    imageUrl: string;
}

export interface ProductOptionsList {
    [key: string]: ProductOption
}