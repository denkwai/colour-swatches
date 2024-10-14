# Colour Swatches

A small colour swatches application to display colour options of a product.

## How to run

Software requirements:
* [Node.js](https://nodejs.org/) (I was using v20.18.0 LTS)
* (optional) [pnpm](https://pnpm.io/) package manager

1. Install dependencies:
   ```
   npm install
   ```
   or (if using pnpm)
   ```
   pnpm install
   ```
1. Run the project:
   ```
   npm run dev
   ```
   This will start a dev server with code watch, live reload and will automatically open the page in your default browser. You can access the page at http://localhost:8080/
1. To have a deployable version of the project:
   ```
   npm run build
   ```
   This will create static deployable assets in /dist folder

## Notes

Solution is implemented in a shape of a web component.

I used custom `<product-card>` tag with incapsulated styles and dynamic updates of it's state. Declaration in HTML requires 2 parameters:
* `name`: base name of the product
* `product-data-url`: url of the api call where information about product is located

