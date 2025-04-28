/* Color Scheme */
let isDark = false; 
import { PAYMENT_TYPE } from './Constants/PAYMENT_TYPES.js'
import { Product } from './Models/Product.js'
import { Order } from './Models/Order.js'
import { PRODUCTS } from './Constants/PRODUCTS.js'
import { Catalog } from './Catalog.js'
import { HIGHLIGHTS } from './Constants/highlights.js';
import Carousel from './carousel.js';
// import { ConfirmForm } from '../js/ConfirmForm'

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

    changeColorsButton.addEventListener('click', () => changeColorScheme());
    
    // Renderiza Catalog
    const list = new Catalog(document.querySelector('.products-list'));
    list.renderList();

    // Renderiza Carrousel
    const carousel = new Carousel(HIGHLIGHTS);
})