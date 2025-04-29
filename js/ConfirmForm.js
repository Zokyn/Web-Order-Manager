import { Product } from './Models/Product.js';
import { OrderItem } from "./Models/OrderItem.js";

export class ConfirmForm { 
    constructor() {
        this._render();
    }
    _render() {
        // Recupera os dados do pedido
        const orderJSON = localStorage.getItem('lastOrder');
                    
        if (orderJSON) {
            let order = JSON.parse(orderJSON);
            
            // Exibe os itens na página de formulário
            const orderListContainer = document.querySelector('.product-order-list');
            if(orderListContainer) {                
                order.forEach((orderItem) => {
                    const li = document.createElement('li');
                    li.className = 'product-card'
                    li.innerHTML = 
                    `
                        <span>${orderItem.product.name}</span>
                        <span>x${parseInt(orderItem.quantity)}</span>
                        <span>: R$ ${parseFloat(orderItem.product.price) * parseInt(orderItem.quantity)}</span>
                    `
                    orderListContainer.append(li)
                })
                
                // Calcula o total
                const total = order.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
                order.forEach((item) => {
                    console.log(item)
                })
                document.getElementById('total-pedido').textContent = `R$ ${total}`;
            }
        }
    }
}

/* document.addEventListener('DOMContentLoaded', function() { 

    const resetButton = document.querySelector('button[type="reset"]');
    resetButton.disabled = true;

    const form = document.querySelector('form');

    const inputsElements = document.querySelectorAll('[name*="-input"');
    const errorsElements = document.querySelectorAll('[name*="-error"');

    errorsElements.forEach((error) => {
        error.classList.add('hidden');
    })

    
    form.addEventListener('submit', (e) => {
        e.preventDefault;
    })

    form.addEventListener('input', () => {
        resetButton.disabled = false;
    })

    inputsElements.forEach((input, index) => {
        input.addEventListener('invalid', (e) => {
            errorsElements[index].classList.remove('hidden')
        })
    })

}); */