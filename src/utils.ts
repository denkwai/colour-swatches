/**
 * utils.ts
 * 
 * Utility functions related to this solution. Basically,
 * a toolchain file for functions which aren't dependent
 * on practical field of solition.
 */

import { BASE_IMG_HI_RES_URL, BASE_IMG_URL } from "./constants";

/**
 * Since API is returning the relative path of images,
 * we need to manually generate the full image URL
 * which is outside of localhost.
 */
export function createImageUrl(image: string = '', isHiRes: boolean = false): string {
    return `${isHiRes ? BASE_IMG_HI_RES_URL : BASE_IMG_URL}${image}`;
}

/**
 * For optimization improvement, we're also generating
 * a hi-res option of image to use on high pixel density screens.
 */
export function createImageSrcset(image: string): string {
    return `${createImageUrl(image)}, ${createImageUrl(image, true)} 2x`;
}

/**
 * In this function I'm trying to use internationalization API
 * for a proper render of price. I found it a better alternative
 * to render the price manually through a custom string operation
 * and better suited for internationalization purposes.
 */
export function formatPrice(price: number): string {
    const priceInEur = price / 100;
    const formatter = new Intl.NumberFormat(document.documentElement.lang, {
        style: 'currency',
        currency: 'EUR',
    });
    return formatter.format(priceInEur);
}