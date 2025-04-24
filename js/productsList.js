function createProductsItems(list) {
    products.forEach((product, index) => {
        const item = document.createElement('li');

        item.className = 'product-item';

        item.innerHTML = `
            <figure>
                <img
                    class="select-item-picture" 
                    src="https://placehold.co/240x240"/>
            </figure>
            <h3>${product.name}</h3>
            <input 
                class="select-item-check"
                type="checkbox" />
            `
        
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