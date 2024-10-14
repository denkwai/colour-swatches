/**
 * index.ts
 * 
 * Entry point of the solution.
 * 
 * Some notes:
 * - I decided to go with frameworkless solution. The task description
 *   said nothing about frameworks and libraries, and I found only
 *   jQuery being utilized on Teufel webshop, so I thought that vanilla TS
 *   solution is the optimal way to go.
 * - Implemented solution is a web component with incapsulated styling
 *   and dynamic updates. In this file I define the custom tag <product-card>
 *   which renders in static/template.html file with properties passing
 *   the default data necessary to display the component (like base name
 *   of the product and link, over which component can fetch necessary data)
 */

import { DefineProductCard } from './components/ProductCard';
import "./css/styles.scss";

DefineProductCard();