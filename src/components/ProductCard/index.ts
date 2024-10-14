/**
 * ProdutCard component
 * 
 * Attribute options:
 * - name: defines base name of the product
 * - product-data-url: incorporates link for product data
 */

import { fetchColourOptions } from "../../api/fetchColourOptions";
import { ProductOptionsList } from "../../types";
import { createImageSrcset, createImageUrl, formatPrice } from "../../utils";
import styles from "./styles.scss";

class ProductCard extends HTMLElement {
    colourOptions: ProductOptionsList;
    name: string;

    /**
     * For our custom element to be reactive, we need to set observed attributes,
     * updating which will trigger attributeChangedCallback method, which re-renders
     * the component with fresh data.
     * 
     * Here we observe two attributes:
     * - loading: signalizes that product data was successfully fetched
     * - current-option-id: stores an id of the colour option which is currently selected
     *   defaults to id of the first object in response
     */
    static get observedAttributes() {
        return ['loading', 'current-option-id'];
    }

    /**
     * loading: tracks if object details fetching is finished
     */
    get loading() {
        return JSON.parse(this.getAttribute('loading'));
    }
    set loading(value: boolean) {
        this.setAttribute('loading', JSON.stringify(value));
    }

    /**
     * currentOptionId: tracks a selected option
     */
    get currentOptionId() {
        return this.getAttribute('current-option-id');
    }
    set currentOptionId(value: string) {
        this.setAttribute('current-option-id', value);
    }

    constructor() {
        super();
        this.name = this.getAttribute('name');
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        await this.fetchColourOptions();

        // Event listener for product option change
        this.shadowRoot.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;

            if (target.classList.contains('colour-option')) {
                this.currentOptionId = target.dataset.id;
            }
        });
    }

    attributeChangedCallback() {
        this.render();
    }

    async fetchColourOptions() {
        this.loading = true;

        const options = await fetchColourOptions(this.getAttribute('product-data-url'));

        this.colourOptions = options;
        this.loading = false;
        this.currentOptionId = Object.keys(options)[0]; // Selecting first option as default
    }

    createColourSelect() {
        const buttons = Object.keys(this.colourOptions).map(key => {
            const option = this.colourOptions[key];
            const isSelected = key === this.currentOptionId;
            return `<button class="colour-option ${isSelected ? 'colour-option--selected' : ''}"
                style="background-color: ${option.productColour};"
                title="Select ${option.productVariant} option"
                data-id="${key}"
                tabindex="0"></button>`;
        })
        return `<div class="colours product-details__colours">
            ${buttons.join('')}
        </div>`
    }

    render() {
        if (this.loading) {
            this.shadowRoot.innerHTML = 'Loading...'
        }
        else {
            if (this.currentOptionId) {
                const currentProductOption = this.colourOptions[this.currentOptionId];

                const productNameFull = `${currentProductOption.productVariant} ${this.name}`;
                const elProductName = `<h1 class="product-details__name">${productNameFull}</h1>`;

                const imageSrc = createImageUrl(currentProductOption.imageUrl);
                const imageSrcset = createImageSrcset(currentProductOption.imageUrl);
                const imageAlt = productNameFull;
                const elImage = `<img class="product-details__image"
                    src="${imageSrc}"
                    srcset="${imageSrcset}"
                    alt="${imageAlt}" />`;

                const productPrice = formatPrice(currentProductOption.productPrice);
                const elProductPrice = `<span class="price product-details__price">${productPrice}</span>`;

                const elColourOptions = this.createColourSelect();
                const elBuyButton = `<button class="button button--buy" ${!currentProductOption.inStock ? 'disabled="disabled"' : ''}>Buy now</button>`

                this.shadowRoot.innerHTML = `
                    <style>${styles}</style>
                    <div class="product-details">
                        ${elImage}
                        ${elProductName}
                        ${elProductPrice}
                        ${elColourOptions}
                        ${elBuyButton}
                    </div>
                `;
            }
        }
    }
}

export function DefineProductCard() {
    customElements.define('product-card', ProductCard);
}