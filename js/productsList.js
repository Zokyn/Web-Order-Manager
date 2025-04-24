function createProductsItems(list) {
    products.forEach((product, index) => {
        const item = product.createHTMLElement();
        
        item.dataset.id = index;
        item.dataset.name = product.name;
        item.dataset.price = product.basePrice; 

        list.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const listContainer = document.querySelector('.products-list');

    createProductsItems(listContainer);
})