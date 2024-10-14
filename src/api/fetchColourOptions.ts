/**
 * api/fetchColourOptions.ts
 * 
 * Fetching of dynamic data from API endpoint.
 */

import { ProductOptionsList } from "../types";

export async function fetchColourOptions(url: string): Promise<ProductOptionsList> {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network request failed with status: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    }
    catch (error) {
        console.error('There\'s been a problem fetching data: ', error);
    }
}
