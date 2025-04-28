//@ts-check
/* Color Scheme */
let isDark = false; 
import { PAYMENT_TYPE } from './Constants/PAYMENT_TYPES.js'
import { Product } from './Models/Product.js'
import { Order } from './Models/Order.js'
import { PRODUCTS } from './Constants/PRODUCTS.js'
import { HIGHLIGHTS } from './Constants/highlights.js';
import Catalog from './Catalog.js'
import Carousel from './Carousel.js';

/* Lista de destaques (fake database) */
// import { highlights } from "./highlights";

function changeColorScheme() {
    document.body.classList.toggle('dark');
    isDark = !isDark;

    localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* Button Change Colors Schema */
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('theme') === 'dark')
        changeColorScheme();

    const changeColorsButton = document.querySelector('#change-color-button');
    const carouselContainer = document.querySelector('.carousel-container');
    const productsListContainer = document.querySelector('.products-list');

    changeColorsButton?.addEventListener('click', () => changeColorScheme());
    
    if (carouselContainer)
        new Carousel(carouselContainer, HIGHLIGHTS)
    else if (productsListContainer)
        new Catalog(productsListContainer, PRODUCTS);

    const order = new Order({ customer: "Cliente Anonimo"})

    
})