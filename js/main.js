//@ts-check
/* Color Scheme */
let isDark = false; 
import { PAYMENT_TYPE } from './Constants/PAYMENT_TYPES.js'
import { Product } from './Models/Product.js'
import { OrderItem } from './Models/OrderItem.js';
import { Order } from './Models/Order.js'
import { PRODUCTS } from './Constants/PRODUCTS.js'
import { HIGHLIGHTS } from './Constants/HIGHLIGHTS.js';
import Catalog from './Catalog.js'
import Carousel from './Carousel.js';
import { ConfirmForm } from './ConfirmForm.js';

const FORM_PATH = '../form.html'

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
    const cartForm  = document.querySelector('form.cart-form');

    changeColorsButton?.addEventListener('click', () => changeColorScheme());
    
    const order = new Order({ customer: "Cliente Anonimo"})

    if (carouselContainer)
        new Carousel(carouselContainer, HIGHLIGHTS)
    else if (productsListContainer)
        new Catalog(productsListContainer, PRODUCTS, order);

    cartForm?.addEventListener('submit', (e) => {
        e.preventDefault()
        // Serializa o pedido para JSON
        const orderJSON = JSON.stringify(order.items);
        
        // Armazena no localStorage
        localStorage.setItem('lastOrder', orderJSON);
        
        // Redireciona para a página de formulário
        window.location.href = FORM_PATH;
    })
    
    new ConfirmForm();
})